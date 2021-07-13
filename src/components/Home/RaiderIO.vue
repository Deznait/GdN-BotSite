<template>
    <div class="q-py-md">
        <div class="q-gutter-y-md">
            <q-card>
                <q-tabs
                    v-model="raidTab"
                    dense
                    class="text-grey"
                    active-color="primary"
                    indicator-color="primary"
                    align="justify"
                    narrow-indicator
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
                                q-ma-md
                            "
                        >
                            <div class="RaidProgress-difficulty-name">
                                {{ difficulty.name }}
                            </div>
                            <q-linear-progress
                                class="Progressbar"
                                size="30px"
                                :value="difficulty.bosses_killed / raid.prog.total_bosses"
                                track-color="dark"
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
                    <a :href="guildInfo.url" target="_blank">
                        <q-btn size="sm" flat color="primary" label="Más info en RaiderIO" />
                    </a>
                </div>
            </q-card>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

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
        };
    },
    setup() {
        return {
            raidTab: ref("sanctum-of-domination"),
        };
    },
    mounted() {
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
                this.processInfo(response);
            },
            (error) => {
                console.log("error");
                console.log(error);
            }
        );
    },
    methods: {
        processInfo(response) {
            let guild_info = {
                name: response.data.name,
                url: response.data.profile_url,
                realm: response.data.realm,
                region: response.data.region,
                raids: {},
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
                        },
                        heroic: {
                            name: "Heroico",
                            bosses_killed: raid_prog.heroic_bosses_killed,
                        },
                        mythic: {
                            name: "Mítico",
                            bosses_killed: raid_prog.mythic_bosses_killed,
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

            this.guildInfo = guild_info;
        },
    },
};
</script>

<style lang="scss" scoped>
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

        .Progressbar-fraction {
            text-shadow: 0 0 1px transparent, 0 1px 2px rgba(0, 0, 0, 0.8);
        }
    }
}
</style>
