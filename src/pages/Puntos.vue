<template>
    <q-page class="q-pt-xs">
        <div class="q-ma-md">
            <div class="row q-my-md">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <q-card flat bordered class="shadow">
                        <q-table
                            id="points-table"
                            title="Puntos"
                            :rows="members"
                            :columns="columns"
                            row-key="name"
                            :pagination="initialPagination"
                            rows-per-page-label="Por página"
                            :rows-per-page-options="[10, 20, 40, 100]"
                            :loading="loadingTable"
                            :filter="filter"
                        >
                            <template v-slot:body-cell-name="props">
                                <q-td :props="props" style="max-width: 100px">
                                    <q-item>
                                        <!-- <q-item-section avatar>
                                            <q-avatar>
                                                <img :src="props.row.avatar" />
                                            </q-avatar>
                                        </q-item-section> -->

                                        <q-item-section>
                                            <q-item-label>
                                                {{ props.row.name }}
                                            </q-item-label>
                                            <q-item-label caption class="">
                                                {{ rankName(props.row.rank) }}
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-td>
                            </template>

                            <template v-slot:body-cell-points_total="props">
                                <q-td :props="props">
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label>
                                                <q-chip
                                                    class=" float-right text-white text-capitalize"
                                                    :label="props.row.points_total"
                                                    color="positive"
                                                ></q-chip>
                                            </q-item-label>
                                            <q-item-label caption class="">
                                                <q-linear-progress
                                                    dark
                                                    :color="getColor(props.row.points_total)"
                                                    :value="props.row.points_total / 100"
                                                />
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
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
export default {
    name: 'PagePuntos',
    data() {
        return {
            loadingTable: true,
            filter: '',
            members: [],
            initialPagination: {
                sortBy: 'points_total',
                descending: true,
                page: 1,
                rowsPerPage: 20,
            },
            columns: [
                {
                    name: 'name',
                    label: 'Name',
                    field: 'name',
                    sortable: true,
                    align: 'left',
                },
                {
                    name: 'points_total',
                    label: 'Puntos',
                    field: 'points_total',
                    sortable: true,
                    align: 'left',
                },
            ],
            data3: [
                {
                    name: 'Yaaaeeeeeeee',
                    rank: 0,
                    points_total: 70,
                    type: 'info',
                    issue: '#125',
                    avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',
                },
                {
                    name: 'Yooooo',
                    rank: 0,
                    points_total: 60,
                    type: 'success',
                    issue: '#1425',
                    avatar: 'https://avatars2.githubusercontent.com/u/27857088?s=400&u=a898efbc753d93cf4c2070a7cf3b05544b50deea&v=4',
                },
                {
                    name: 'Wololoooo',
                    rank: 0,
                    points_total: 30,
                    type: 'warning',
                    issue: '#1475',
                    avatar: 'https://avatars0.githubusercontent.com/u/55240045?s=400&u=cf9bffc2bd2d8e42ca6e5abf40ddd6c1a03ce2860&v=4',
                },
                {
                    name: 'Pikaaaachu',
                    rank: 0,
                    points_total: 100,
                    type: 'success',
                    issue: '#134',
                    avatar: 'https://avatars1.githubusercontent.com/u/10262924?s=400&u=9f601b344d597ed76581e3a6a10f3c149cb5f6dc&v=4',
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
        getColor(val) {
            if (val > 70 && val <= 100) {
                return 'green'
            } else if (val > 50 && val <= 70) {
                return 'blue'
            }
            return 'red'
        },
        rankName: function (value) {
            return rankNames[value]
        },
        realmName: function (value) {
            return realmNames[value]
        },
    },
}
</script>
