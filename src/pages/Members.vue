<template>
    <q-page class="q-pt-xs">
        <div class="q-ma-md">
            <div class="row q-my-md">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <q-card flat bordered class="shadow">
                        <q-table
                            id="members-table"
                            title="Miembros"
                            :grid="mode=='grid'"
                            :rows="members"
                            :columns="columns"
                            row-key="name"
                            :pagination="initialPagination"
                            rows-per-page-label="Por página"
                            :rows-per-page-options="[10, 20, 40, 100]"
                            :loading="loadingTable"
                            :filter="filter"
                            @row-click="onRowClick"
                        >
                            <template v-slot:top-right>
                                <q-input
                                    outlined 
                                    dense
                                    debounce="300"
                                    v-model="filter"
                                    placeholder="Buscar"
                                >
                                    <template v-slot:append>
                                        <q-icon name="search" />
                                    </template>
                                </q-input>
                                
                                <q-btn
                                    flat
                                    round
                                    dense
                                    :icon="mode === 'grid' ? 'list' : 'grid_on'"
                                    class="gt-xs"
                                    @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
                                >
                                    <q-tooltip
                                        :disable="$q.platform.is.mobile"
                                        v-close-popup
                                        >{{mode==='grid' ? 'List' : 'Grid'}}
                                    </q-tooltip>
                                </q-btn>
                            </template>

                            <template v-slot:body-cell-class="props">
                                <q-td class="vertical-middle" :props="props">
                                    <ClassIcon :classid="props.row.class" />
                                </q-td>
                            </template>
                        </q-table>
                    </q-card>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import ClassIcon from 'components/ClassIcon'
import { defineComponent } from 'vue'
import { db } from 'boot/firebase'

const rankNames = {
    0: 'Fundador',
    1: 'Oficial',
    2: 'Alter Oficial',
    3: 'Líder de banda',
    4: 'Raider',
    5: 'Cantera',
    6: 'Alter',
    7: 'Amigos',
    8: 'Alter amigos',
    9: 'Inactivo',
}
const realmNames = {
    zuljin: "Zul'Jin",
    uldum: 'Uldum',
    sanguino: 'Sanguino',
    shendralar: "Shen'dralar",
}

export default defineComponent({
    name: 'PageMembers',
    components: {
        ClassIcon,
    },
    data() {
        return {
            loadingTable: true,
            mode: "list",
            filter: '',
            members: [],
            initialPagination: {
                sortBy: 'rank',
                descending: false,
                page: 1,
                rowsPerPage: 20,
            },
            columns: [
                {
                    name: 'name',
                    required: true,
                    label: 'Nombre',
                    align: 'left',
                    field: (row) => row.name,
                    format: (val) => `${val}`,
                    sortable: true,
                },
                {
                    name: 'class',
                    required: true,
                    label: 'Clase',
                    align: 'center',
                    field: (row) => row.class,
                    sortable: true,
                },
                {
                    name: 'rank',
                    label: 'Rango',
                    field: (row) => row.rank,
                    format: (val) => this.rankName(val),
                    sortable: true,
                },
                {
                    name: 'realm',
                    label: 'Reino',
                    field: (row) => row.realm,
                    format: (val) => this.realmName(val),
                },
            ],
        }
    },
    created() {
        db.collection('characters')
            .get()
            .then((query) => {
                this.members = []

                query.forEach((doc) => {
                    this.members.push(doc.data())
                })
                this.loadingTable = false
            })
    },
    methods: {
        onRowClick(evt, row) {
            console.info('clicked on')
            console.info('row', row)
            console.info('rowName', row.name)
        },
        rankName: function (value) {
            return rankNames[value]
        },
        realmName: function (value) {
            return realmNames[value]
        },
    },
})
</script>

<style lang="scss">
#members-table {
    .q-table__middle {
        .q-table {
            tr,
            .q-tr {
                cursor: pointer;
            }
        }
    }
}
</style>
