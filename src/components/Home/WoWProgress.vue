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

                        <div class="container with-header with-footer">
                            <div class="container_header">
                                <div class="title">
                                    <div class="text">
                                        <div class="header_text_text">
                                            Avance
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container_body">
                                <div class="container_content container-maximized">
                                    <table class="container_table">
                                        <tbody>
                                            <tr class="container_table_row">
                                                <td class="container_column leftmost rightmost">
                                                    <div class="module module_last">
                                                        <div class="module_content">
                                                            <div class="module_content_wrap">
                                                                <div class=" m_wowprogress m_wowprogress_5546 ">
                                                                    <div class="wowprogress_wrap">
                                                                        <div class=" wowprogress_world wowprogress_box ">
                                                                            <span class=" rank_title ">
                                                                                Rango global
                                                                                <span class=" rank_value ">
                                                                                    {{ guildInfo.world_rank }}
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                        <div class=" wowprogress_region wowprogress_box ">
                                                                            <span class=" rank_title ">
                                                                                Rango regional
                                                                                <span class=" rank_value ">
                                                                                    {{ guildInfo.area_rank }}
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                        <div class=" wowprogress_realm wowprogress_box ">
                                                                            <span class=" rank_title ">
                                                                                Rango reino
                                                                                <span class=" rank_value ">
                                                                                    {{ guildInfo.realm_rank }}
                                                                                </span>
                                                                            </span>
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
                <q-btn class="reload" dense flat size="12px" icon="autorenew" @click="getWowProgressData">
                    <q-tooltip>Recargar</q-tooltip>
                </q-btn>
            </q-card>
        </div>
    </div>
</template>

<script>
import { useQuasar } from "quasar";
import { db } from "boot/firebase";

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
            this.getWowProgressData();
        } else {
            const date = new Date();
            const Difference_In_Days =
                (date.getTime() - savedGuildProgress.date_fetched) /
                (1000 * 3600 * 24);

            if (Difference_In_Days >= 2.0) {
                this.getWowProgressData();
            }

            this.guildInfo = savedGuildProgress;
        }
    },
    methods: {
        getWowProgressData() {
            db.collection("wowprogress").doc("data").get().then((doc) => {
                if (doc.exists) {
                    let guild_info = doc.data()
                    guild_info['date_fetched'] = new Date().getTime();
                    console.log(guild_info);
                    
                    this.$q.localStorage.set("savedGuildProgress", guild_info);
                    this.guildInfo = guild_info;
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            })
        }
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
