<template>
    <q-page padding>
        <div class="row">
            <div class="col q-pa-md">
                <q-table
                    title="Treats"
                    :rows="members"
                    :columns="columns"
                    row-key="name"
                    :pagination="initialPagination"
                >
                    <template v-slot:body-cell-class="props">
                        <q-td class="vertical-middle" :props="props">
                            <ClassIcon :classid="props.row.character.playable_class.id"/>
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

export default defineComponent({
    name: "PageMembers",
    components: {
        ClassIcon,
    },
    data() {
        return {
            members: dataext.members,
            initialPagination: {
                sortBy: 'name',
                descending: false,
                page: 1,
                rowsPerPage: 50
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
                { name: "realm", label: "Reino", field: (row) => row.character.realm.slug },
                { name: "points", label: "Puntos", field: "fat", sortable: true },
                {
                    name: "calcium",
                    label: "Calcium (%)",
                    field: "calcium",
                    sortable: true,
                    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
                },
            ],
        };
    },
    computed: {},
});
</script>
