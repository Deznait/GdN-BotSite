<template>
    <div class="WowProgress">
        <div
            class="container with-header with-footer"
            data-container-id="4971420"
            data-start-collapsed="0"
        >
            <div class="container_header">
                <div class="left"></div>
                <div class="right"></div>
                <div class="title">
                    <span class="mask">
                        <div class="text">
                            <div class="header_text_text">Avance</div>
                        </div>
                    </span>
                </div>
            </div>
            <div class="container_body">
                <div class="container_left"></div>
                <div class="container_right"></div>
                <div class="container_left_top"></div>
                <div class="container_right_top"></div>
                <div class="container_left_bottom"></div>
                <div class="container_right_bottom"></div>
                <div
                    class="container_content container-minimized"
                    style="display: none"
                >
                    Contenedor minimizado. <a href="javascript:;">Expandir</a>
                </div>
                <div class="container_content container-maximized">
                    <div class="container_inner_l"></div>
                    <div class="container_inner_r"></div>
                    <div class="container_inner_tl"></div>
                    <div class="container_inner_tr"></div>
                    <div class="container_inner_bl"></div>
                    <div class="container_inner_br"></div>
                    <table class="container_table">
                        <tbody>
                            <tr class="container_table_row">
                                <td
                                    class="container_column leftmost rightmost"
                                    style="width: 100%"
                                >
                                    <div class="module module_first">
                                        <div class="module_content">
                                            <div class="module_content_wrap">
                                                <div
                                                    class="
                                                        m_progression_7662269
                                                        m_progression
                                                    "
                                                >
                                                    <div
                                                        class="raids-container"
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="module module_last">
                                        <div class="module_content">
                                            <div class="module_content_wrap">
                                                <div
                                                    class="
                                                        m_wowprogress
                                                        m_wowprogress_5546
                                                    "
                                                >
                                                    <div
                                                        class="wowprogress_wrap"
                                                    >
                                                        <div
                                                            class="
                                                                wowprogress_realm
                                                                wowprogress_box
                                                            "
                                                        >
                                                            <span
                                                                class="
                                                                    rank_title
                                                                "
                                                                >Rango en
                                                                Realm</span
                                                            >
                                                            <span
                                                                class="
                                                                    rank_value
                                                                "
                                                                >24</span
                                                            >
                                                        </div>
                                                        <div
                                                            class="
                                                                wowprogress_region
                                                                wowprogress_box
                                                            "
                                                        >
                                                            <span
                                                                class="
                                                                    rank_title
                                                                "
                                                                >Rango
                                                                regional</span
                                                            >
                                                            <span
                                                                class="
                                                                    rank_value
                                                                "
                                                                >2767</span
                                                            >
                                                        </div>
                                                        <div
                                                            class="
                                                                wowprogress_world
                                                                wowprogress_box
                                                            "
                                                        >
                                                            <span
                                                                class="
                                                                    rank_title
                                                                "
                                                                >Rango
                                                                global</span
                                                            >
                                                            <span
                                                                class="
                                                                    rank_value
                                                                "
                                                                >4721</span
                                                            >
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="wowprogress_link"
                                                    >
                                                        Rank data from
                                                        <a
                                                            href="https://wowprogress.com/"
                                                            >wowprogress.com</a
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="container_footer">
                <div class="left"></div>
                <div class="right"></div>
            </div>
        </div>

        <div class="q-gutter-y-md">
            <q-card>
                <q-tabs
                    v-model="progressTab"
                    dense
                    class="text-grey"
                    active-color="primary"
                    indicator-color="primary"
                    align="justify"
                    narrow-indicator
                >
                    <q-tab
                        key="avance"
                        name="avance"
                        label="Avance"
                    />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="progressTab" animated>
                    <q-tab-panel
                        key="avance"
                        name="avance"
                    >
                        
                    </q-tab-panel>
                </q-tab-panels>

                <div class="q-pb-md q-px-md text-subtitle2 text-center">
                    <a :href="guild_url" target="_blank">
                        <q-btn
                            size="sm"
                            flat
                            color="primary"
                            label="Más info en WowProgress"
                        />
                    </a>
                    <q-btn
                        dense
                        flat
                        color="grey"
                        size="12px"
                        icon="autorenew"
                        @click="callAPI"
                        v-if="1 == 0"
                    >
                        <q-tooltip>Recargar</q-tooltip>
                    </q-btn>
                </div>
            </q-card>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { useQuasar } from "quasar";

const raidNames = {
    "castle-nathria": "Castillo de Nathria",
    "sanctum-of-domination": "Sagrario de Dominación",
};

export default {
    name: "WoWProgress",
    props: {},
    data() {
        return {
            guildInfo: "",
            guild_url: "https://www.wowprogress.com/guild/eu/sanguino/Gremio+de+Nordrassil",
            progressTab: "avance",
        };
    },
    setup() {},
    mounted() {
        const $q = useQuasar();
        const savedGuildProgress = $q.localStorage.getItem("savedGuildProgress");

        if (savedGuildProgress === null) {
            this.callAPI();
        } else {
            const date = new Date();
            const Difference_In_Days =
                (date.getTime() - savedGuildProgress.date_fetched) /
                (1000 * 3600 * 24);

            if (Difference_In_Days >= 2.0) {
                this.callAPI();
            }

            this.guildInfo = savedGuildProgress;
        }
    },
    methods: {
        async callAPI() {
            const $q = useQuasar();

            // Send a POST request
            axios({
                method: "get",
                url: this.guild_url + "/json_rank",
            }).then(
                (response) => {
                    let guild_info = this.processInfo(response);
                    $q.localStorage.set("savedGuildProgress", guild_info);
                    this.guildInfo = guild_info;
                    console.log("this.guildInfo");
                    console.log(this.guildInfo);
                },
                (error) => {
                    console.log("error");
                    console.log(error);
                }
            );
        },
        processInfo(response) {
            let guild_info = {
                score: response.data.name,
                world_rank: response.data.realm,
                area_rank: response.data.realm,
                realm_rank: response.data.realm,
                url: response.data.profile_url,
                date_fetched: new Date().getTime(),
            };

            return guild_info;
        },
    },
};
</script>

<style lang="scss">
.WowProgress {
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
}
</style>
