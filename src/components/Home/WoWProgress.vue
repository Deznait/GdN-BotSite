<template>
    <div class="WowProgress full-height">
        <div class="q-gutter-y-md full-height">
            <q-card class="full-height">
                <q-tabs
                    v-model="progressTab"
                    dense
                    align="justify"
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
                    </q-tab-panel>
                </q-tab-panels>

<q-space />

                <div class="q-pb-md q-px-md text-subtitle2 text-center">
                    <q-btn 
                        flat
                        size="sm"
                        type="a"
                        :href="guild_url"
                        target="__blank"
                        label="Más info en WowProgress"
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
            $q: useQuasar()
        };
    },
    setup() {},
    mounted() {
        const savedGuildProgress = this.$q.localStorage.getItem("savedGuildProgress");

        if (savedGuildProgress === null) {
            //this.callAPI();
        } else {
            const date = new Date();
            const Difference_In_Days =
                (date.getTime() - savedGuildProgress.date_fetched) /
                (1000 * 3600 * 24);

            if (Difference_In_Days >= 2.0) {
                //this.callAPI();
            }

            this.guildInfo = savedGuildProgress;
        }
    },
    methods: {
        async callAPI() {
            // Send a POST request
            axios({
                method: "get",
                url: this.guild_url + "/json_rank",
            }).then(
                (response) => {
                    let guild_info = this.processInfo(response);
                    this.$q.localStorage.set("savedGuildProgress", guild_info);
                    this.guildInfo = guild_info;
                },
                (error) => {
                    console.error(error);
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

    .q-card {
        display: flex;
        flex-direction: column;
    }

    .reload {
        position: absolute;
        bottom: 16px;
        right: 16px;
    }
}
</style>
