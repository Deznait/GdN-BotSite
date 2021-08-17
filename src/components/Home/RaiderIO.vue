<template>
    <div class="RaiderIO">
        <div class="q-gutter-y-md">
            <q-card>
                <q-tabs
                    v-model="raidTab"
                    dense
                    align="justify"
                >
                    <q-tab
                        v-for="raid in guildInfo.raids"
                        :key="raid.slug"
                        :name="raid.slug"
                        :label="raid.name"
                    />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="raidTab" animated>
                    <q-tab-panel
                        v-for="raid in guildInfo.raids"
                        :key="raid.slug"
                        :name="raid.slug"
                    >
                        <div class="text-h6">{{ raid.name }}</div>
                        <div
                            v-for="difficulty in raid.prog.difficulty"
                            :key="difficulty.name"
                            class="
                                RaidProgress-difficulties
                                flex flex-center
                                q-my-md
                            "
                        >
                            <div class="RaidProgress-difficulty-name">
                                {{ difficulty.name }}
                            </div>
                            <q-linear-progress
                                class="Progressbar"
                                :class="
                                    'progresslevel_' + difficulty.progress_level
                                "
                                size="30px"
                                :value="
                                    difficulty.bosses_killed /
                                    raid.prog.total_bosses
                                "
                                track-color="red"
                            >
                                <q-badge
                                    class="
                                        Progressbar-fraction
                                        absolute-full
                                        flex
                                    "
                                    color="transparent"
                                    text-color="white"
                                    :label="
                                        difficulty.bosses_killed +
                                        '/' +
                                        raid.prog.total_bosses
                                    "
                                />
                            </q-linear-progress>
                        </div>
                    </q-tab-panel>
                </q-tab-panels>

                <div class="q-pb-md q-px-md text-subtitle2 text-center">
                    <q-btn 
                        flat
                        size="sm"
                        type="a"
                        :href="guildInfo.url"
                        target="__blank"
                        label="Más info en RaiderIO"
                    />
                </div>
                <q-btn class="reload" dense flat size="12px" icon="autorenew" @click="callAPI">
                    <q-tooltip>Recargar</q-tooltip>
                </q-btn>
            </q-card>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { useQuasar } from "quasar";

const realmNames = {
    "castle-nathria": "Castillo de Nathria",
    "sanctum-of-domination": "Sagrario de Dominación",
};

export default {
    name: "RaiderIo",
    props: {},
    data() {
        return {
            guildInfo: "",
            raidTab: "sanctum-of-domination",
            $q: useQuasar()
        };
    },
    mounted() {
        const savedGuildInfo = this.$q.localStorage.getItem("savedGuildInfo");

        if (savedGuildInfo === null) {
            this.callAPI();
        } else {
            const date = new Date();
            const Difference_In_Days = (date.getTime() - savedGuildInfo.date_fetched) / (1000 * 3600 * 24);

            if (Difference_In_Days >= 2.0) {
                this.callAPI();
            }

            this.guildInfo = savedGuildInfo;
        }
    },
    methods: {
        async callAPI() {
            // Send a POST request
            axios({
                method: "get",
                url: "https://raider.io/api/v1/guilds/profile",
                params: {
                    region: "eu",
                    realm: "sanguino",
                    name: "gremio de nordrassil",
                    fields: "raid_progression,raid_rankings",
                },
            }).then(
                (response) => {
                    let guild_info = this.processInfo(response);
                    this.$q.localStorage.set("savedGuildInfo", guild_info);
                    this.guildInfo = guild_info;
                },
                (error) => {
                    console.error(error);
                }
            );
        },
        processInfo(response) {
            let guild_info = {
                name: response.data.name,
                url: response.data.profile_url,
                realm: response.data.realm,
                region: response.data.region,
                raids: {},
                date_fetched: new Date().getTime(),
            };

            // Add the raid to the object, and add the guild progression
            for (var [key, raid_prog] of Object.entries(
                response.data.raid_progression
            )) {
                let prog = {
                    total_bosses: raid_prog.total_bosses,
                    difficulty: {
                        normal: {
                            name: "Normal",
                            bosses_killed: raid_prog.normal_bosses_killed,
                            progress_level: this.progressionLevel(
                                raid_prog.normal_bosses_killed,
                                raid_prog.total_bosses
                            ),
                        },
                        heroic: {
                            name: "Heroico",
                            bosses_killed: raid_prog.heroic_bosses_killed,
                            progress_level: this.progressionLevel(
                                raid_prog.heroic_bosses_killed,
                                raid_prog.total_bosses
                            ),
                        },
                        mythic: {
                            name: "Mítico",
                            bosses_killed: raid_prog.mythic_bosses_killed,
                            progress_level: this.progressionLevel(
                                raid_prog.mythic_bosses_killed,
                                raid_prog.total_bosses
                            ),
                        },
                    },
                };
                Object.assign(guild_info.raids, { [key]: { prog: prog } });
            }

            // Add the guild rank
            for (var [key, raid_rank] of Object.entries(
                response.data.raid_rankings
            )) {
                Object.assign(guild_info.raids[key], { rank: raid_rank });
            }

            // Assing nmaes to the raids, based on a array
            for (var [key, raid] of Object.entries(guild_info.raids)) {
                Object.assign(guild_info.raids[key], {
                    name: realmNames[key],
                    slug: key,
                });
            }

            return guild_info;
        },
        progressionLevel(bosses_killed, total_bosses) {
            let progress_level;
            let progressRatio = bosses_killed / total_bosses;

            if (progressRatio >= 0.66) {
                progress_level = "high";
            } else if (progressRatio >= 0.33) {
                progress_level = "medium";
            } else {
                progress_level = "low";
            }

            return progress_level;
        },
    },
};
</script>

<style lang="scss">
.RaiderIO {
    .q-tab-panel {
        padding: 16px 16px 0 16px;
    }

    .RaidProgress-difficulties {
        line-height: 1.5;
        text-transform: uppercase;

        .RaidProgress-difficulty-name {
            width: 80px;
        }

        .Progressbar {
            width: calc(100% - 80px);
            border: 1px solid hsla(0, 0%, 100%, 0.2);
            position: relative;

            .q-linear-progress__track {
                background: #181818 !important;
            }
            .q-linear-progress__model {
                color: transparent;
            }

            .Progressbar-fraction {
                text-shadow: 0 0 1px transparent, 0 1px 2px rgba(0, 0, 0, 0.8);
            }

            &.progresslevel_low {
                .q-linear-progress__model {
                    background: #99755c;
                    background: -webkit-gradient(
                        linear,
                        left top,
                        right top,
                        from(#69503f),
                        to(#99755c)
                    );
                    background: linear-gradient(90deg, #69503f 0, #99755c);
                }
            }

            &.progresslevel_medium {
                .q-linear-progress__model {
                    background: #c76700;
                    background: -webkit-gradient(
                        linear,
                        left top,
                        right top,
                        from(#7b3f00),
                        to(#c76700)
                    );
                    background: linear-gradient(90deg, #7b3f00 0, #c76700);
                }
            }

            &.progresslevel_high {
                .q-linear-progress__model {
                    background: #1b9601;
                    background: -webkit-gradient(
                        linear,
                        left top,
                        right top,
                        from(#0d4a00),
                        to(#1b9601)
                    );
                    background: linear-gradient(90deg, #0d4a00 0, #1b9601);
                }
            }
        }
    }

    .reload {
        position: absolute;
        bottom: 16px;
        right: 16px;
    }
}
</style>
