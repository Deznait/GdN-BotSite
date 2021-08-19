<template>
    <q-page class="q-pt-xs">
        <div class="q-ma-md">
            <div class="row q-my-md">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <q-card flat bordered class="shadow">
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
                            :filter="filter"
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
                        </q-table>
                    </q-card>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import ClassIcon from "components/ClassIcon";
import { defineComponent } from "vue";
import dataextraw from "src/members-copy-copy.json";
import { db } from "boot/firebase";

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
            loadingTable: true,
            filter: "",
            members: [],
            initialPagination: {
                sortBy: "rank",
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

            columnsssss: [
            {
                name: 'name',
                required: true,
                label: 'Dessert (100g serving)',
                align: 'left',
                field: row => row.name,
                format: val => `${val}`,
                sortable: true
            },
            { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
            { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
            { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
            { name: 'protein', label: 'Protein (g)', field: 'protein' },
            { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
            { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
            { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
            ],
            rows: [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    sodium: 87,
                    calcium: '14%',
                    iron: '1%'
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    sodium: 129,
                    calcium: '8%',
                    iron: '1%'
                },
                {
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    sodium: 337,
                    calcium: '6%',
                    iron: '7%'
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    sodium: 413,
                    calcium: '3%',
                    iron: '8%'
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    sodium: 327,
                    calcium: '7%',
                    iron: '16%'
                },
                {
                    name: 'Jelly bean',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    sodium: 50,
                    calcium: '0%',
                    iron: '0%'
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    sodium: 38,
                    calcium: '0%',
                    iron: '2%'
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    sodium: 562,
                    calcium: '0%',
                    iron: '45%'
                },
                {
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    sodium: 326,
                    calcium: '2%',
                    iron: '22%'
                },
                {
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    sodium: 54,
                    calcium: '12%',
                    iron: '6%'
                }
                ]
        };
    },
    created() {
        //this.addMembersToDB();

        db.collection("characters").get().then((querySnapshot) => {
            this.members = [];
            
            querySnapshot.forEach((doc) => {
                this.members.push(doc.data());
            })
            this.loadingTable = false;
        })
    },
    methods: {
        rankName: function (value) {
            return rankNames[value];
        },
        realmName: function (value) {
            return realmNames[value];
        },

        addMembersToDB() {
            let characterRef = db.collection("characters");

            dataextraw.members.forEach(member => {
                let memberObj = {
                    "name": member.character.name,
                    "class": member.character.playable_class.id,
                    "rank": member.rank,
                    "realm": member.character.realm.slug,
                    "points": 0,
                    "alts": {}
                }
                characterRef.doc("_" + member.character.id).set(memberObj).then(() => {
                    console.info("Document successfully written! => ", doc.data());
                    console.info(memberObj);
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                })
            });
        }
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
