<template>
	<q-page class="q-pt-xs">
		<div class="q-ma-md">
			<div class="row q-my-md">
				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<q-card flat bordered class="shadow">
						<q-table
							id="members-table"
							title="Miembros"
							dense
							:grid="mode == 'grid'"
							:rows="members"
							:columns="columns"
							row-key="name"
							:pagination="initialPagination"
							rows-per-page-label="Por página"
							:rows-per-page-options="[10, 20, 40, 100]"
							:loading="loading"
							:filter="filter"
							@row-click="onRowClick"
						>
                            <template #loading>
                                <q-inner-loading showing color="primary" />
                            </template>

							<template #top-right>
								<q-input
									v-model="filter"
									outlined
									dense
									debounce="300"
									placeholder="Buscar"
								>
									<template #append>
										<q-icon name="search" />
									</template>
								</q-input>

								<q-btn
									flat
									round
									dense
									:icon="
										mode === 'grid' ? 'list' : 'grid_view'
									"
									class="gt-xs"
									@click="
										mode = mode === 'grid' ? 'list' : 'grid'
									"
								>
									<q-tooltip
										v-close-popup
										:disable="$q.platform.is.mobile"
										>{{ mode === 'grid' ? 'List' : 'Grid' }}
									</q-tooltip>
								</q-btn>
							</template>

							<template #body-cell-class="props">
								<q-td class="vertical-middle" :props="props">
									<ClassIcon :classid="props.row.class" />
								</q-td>
							</template>

                            <template #body-cell-rank="props">
								<q-td :props="props">
                                    {{ rankName(props.row.rank) }}
								</q-td>
							</template>

                            <template #body-cell-realm="props">
								<q-td :props="props">
                                    {{ realmName(props.row.realm) }}
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
import { defineComponent, ref, computed } from 'vue';
import ClassIcon from 'components/ClassIcon';
import { useStore } from 'vuex';

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
};
const realmNames = {
	zuljin: "Zul'Jin",
	uldum: 'Uldum',
	sanguino: 'Sanguino',
	shendralar: "Shen'dralar",
};
const columns = [
	{
		name: 'name',
		required: true,
		label: 'Nombre',
		align: 'left',
		field: (row) => row.name,
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
		sortable: true,
	},
	{
		name: 'realm',
		label: 'Reino',
		field: (row) => row.realm,
	},
];

export default defineComponent({
	name: 'PageMembers',
	components: {
		ClassIcon,
	},
	setup() {
        const $store = useStore();

        const mode = ref('list');
        const filter = ref('');
        const loading = computed({
            get: () => $store.state.guildRoster.isLoading,
            set: val => {
                $store.commit('showcase/updateDrawerState', val);
            },
        });

        $store.dispatch("guildRoster/getAll");
        const members = computed(() => $store.getters['guildRoster/roster']);


        const onRowClick = (evt, row) => {
            console.info('clicked on');
			console.info('row', row);
			console.info('rowName', row.name);
        };
        const rankName = (value) => {
            return rankNames[value];
        };
        const realmName = (value) => {
            return realmNames[value];
        };

        return {
            initialPagination: {
                sortBy: 'rank',
                descending: false,
                page: 1,
                rowsPerPage: 20
            },
            columns,
			mode,
            filter,
            loading,
            members,
            onRowClick,
            rankName,
            realmName
        };
    },
	// created() {
	// 	db.collection('characters')
	// 		.get()
	// 		.then((query) => {
	// 			this.members = [];

	// 			query.forEach((doc) => {
	// 				this.members.push(doc.data());
	// 			});
	// 			this.loadingTable = false;
	// 		});
	// },
});
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
