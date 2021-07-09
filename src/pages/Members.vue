<template>
    <q-page padding>
        <div class="row">
            <div class="col q-pa-md">
                <q-table
                    title="Miembros"
                    :rows="members"
                    :columns="columns"
                    row-key="name"
                    :pagination="initialPagination"
                    rows-per-page-label="Por página"
                    :rows-per-page-options="[10, 25, 50]"
                >
                    <template v-slot:body-cell-class="props">
                        <q-td class="vertical-middle" :props="props">
                            <ClassIcon
                                :classid="props.row.character.playable_class.id"
                            />
                        </q-td>
                    </template>
                </q-table>
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
    "shendralar	": "Shen'dralar",
};

export default defineComponent({
    name: "PageMembers",
    components: {
        ClassIcon,
    },
    data() {
        return {
            members: dataext.members,
            initialPagination: {
                sortBy: "name",
                descending: false,
                page: 1,
                rowsPerPage: 50,
            },
            columns: [
                {
                    name: "name",
                    required: true,
                    label: "Nombre",
                    align: "left",
                    field: (row) => row.character.name,
                    format: (val) => `${val}`,
                    sortable: true,
                },
                {
                    name: "class",
                    required: true,
                    label: "Clase",
                    align: "center",
                    field: (row) => row.character.playable_class.id,
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
                    field: (row) => row.character.realm.slug,
                    format: (val) => this.realmName(val),
                },
                {
                    name: "points",
                    label: "Puntos",
                    field: "fat",
                    sortable: true,
                },
            ],
        };
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
