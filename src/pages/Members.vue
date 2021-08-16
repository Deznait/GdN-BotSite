<template>
    <q-page class="q-pt-xs">
        <div class="q-ma-md">
            <div class="row q-my-md">
                <div class="col">
                    <q-table
                        id="members-table"
                        title="Miembros"
                        :rows="members"
                        :columns="columns"
                        row-key="name"
                        :pagination="initialPagination"
                        rows-per-page-label="Por página"
                        :rows-per-page-options="[10, 20, 40, 100]"
                        :loading="loadingTable"
                    >
                        <template v-slot:header="props">
                            <q-tr :props="props">
                                <q-th auto-width />
                                <q-th
                                    v-for="col in props.cols"
                                    :key="col.name"
                                    :props="props"
                                >
                                    {{ col.label }}
                                </q-th> 
                            </q-tr>
                        </template>

                        <template v-slot:top-right>
                            <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                            </q-input>
                        </template>
                        
                        <template v-slot:body="props">
                            <q-tr
                                :props="props"
                                @click="props.expand = !props.expand"
                            >
                                <q-td auto-width>
                                    <q-btn
                                        size="md"
                                        text-color="grey"
                                        unelevated
                                        flat
                                        dense
                                        :icon="
                                            props.expand
                                                ? 'expand_less'
                                                : 'expand_more'
                                        "
                                    />
                                </q-td>
                                <q-td
                                    v-for="col in props.cols"
                                    :key="col.name"
                                    :props="props"
                                >
                                    <ClassIcon
                                        v-if="col.name === 'class'"
                                        :classid="props.row.class"
                                    />
                                    <span v-else>{{ col.value }}</span>
                                </q-td>
                            </q-tr>
                            <q-tr v-show="props.expand" :props="props">
                                <q-td auto-width></q-td>
                                <q-td colspan="100%">
                                    <div class="text-left">
                                        Más info para este pj: {{ props.row.name }}.
                                        <q-list
                                            v-if="props.row.alts.length"
                                            bordered
                                        >
                                            <q-item
                                                v-for="alt in props.row.alts"
                                                :key="alt.id"
                                                class="q-my-sm"
                                                clickable
                                                v-ripple
                                            >
                                                <q-item-section avatar>
                                                    <ClassIcon
                                                        :classid="alt.class"
                                                    />
                                                </q-item-section>

                                                <q-item-section>
                                                    <q-item-label>{{
                                                        alt.name
                                                    }}</q-item-label>
                                                    <q-item-label
                                                        caption
                                                        lines="1"
                                                        >{{
                                                            alt.email
                                                        }}</q-item-label
                                                    >
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                    </div>
                                </q-td>
                            </q-tr>
                        </template>

                        <template v-slot:body-cell-class="props">
                            <q-td class="vertical-middle" :props="props">
                                <ClassIcon :classid="props.row.class" />
                            </q-td>
                        </template>

                        <template v-slot:loading>
                            <q-inner-loading showing color="primary" />
                        </template>
                    </q-table>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import ClassIcon from "components/ClassIcon";

import { defineComponent } from "vue";
import dataext from "src/members.json";

const rankNames = {
    0: "Fundador",
    1: "Oficial",
    2: "Alter Oficial",
    3: "Líder de banda",
    4: "Raider",
    5: "Cantera",
    6: "Alter",
    7: "Amigos",
    8: "Alter amigos",
    9: "Inactivo",
};
const realmNames = {
    zuljin: "Zul'Jin",
    uldum: "Uldum",
    sanguino: "Sanguino",
    shendralar: "Shen'dralar",
};

export default defineComponent({
    name: "PageMembers",
    components: {
        ClassIcon,
    },
    data() {
        return {
            loadingTable: false,
            filter: "",
            members: dataext.members,
            memberSQL: "",
            initialPagination: {
                sortBy: "name",
                descending: false,
                page: 1,
                rowsPerPage: 20,
            },
            columns: [
                {
                    name: "name",
                    required: true,
                    label: "Nombre",
                    align: "left",
                    field: (row) => row.name,
                    format: (val) => `${val}`,
                    sortable: true,
                },
                {
                    name: "class",
                    required: true,
                    label: "Clase",
                    align: "center",
                    field: (row) => row.class,
                    sortable: true,
                },
                {
                    name: "rank",
                    label: "Rango",
                    field: (row) => row.rank,
                    format: (val) => this.rankName(val),
                    sortable: true,
                },
                {
                    name: "realm",
                    label: "Reino",
                    field: (row) => row.realm,
                    format: (val) => this.realmName(val),
                },
            ],
        };
    },
    mounted() {
        let attributes = ["id", "name", "class", "realm", "rank", "points"];
        this.members.forEach((member) => {
            let sql =
                "(" +
                member.id +
                ", " +
                "'" +
                member.name +
                "', " +
                member.class +
                ", " +
                "'" +
                member.realm +
                "', " +
                member.rank +
                ", " +
                member.points +
                "),";

            this.memberSQL += sql;
        });
    },
    methods: {
        rankName: function (value) {
            return rankNames[value];
        },
        realmName: function (value) {
            return realmNames[value];
        },
    },
});
</script>

<style lang="scss" scoped>
    #members-table {
        .q-table__middle { 
            .q-tr {
                cursor: pointer;
            }
        }
    }
</style>
