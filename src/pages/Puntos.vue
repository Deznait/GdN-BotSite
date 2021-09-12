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
							:loading="loading"
							:filter="filter"
						>
							<template #body-cell-name="props">
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

							<template #body-cell-points_total="props">
								<q-td :props="props">
									<q-item>
										<q-item-section>
											<q-item-label>
												<q-chip
													class="
														float-right
														text-white
														text-capitalize
													"
													:label="
														props.row.points_total
													"
													color="positive"
												></q-chip>
											</q-item-label>
											<q-item-label caption class="">
												<q-linear-progress
													dark
													:color="
														getColor(
															props.row
																.points_total
														)
													"
													:value="
														props.row.points_total /
														100
													"
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
import { defineComponent, ref, computed } from 'vue';
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
const columns = [
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
];
export default defineComponent({
	name: 'PagePuntos',
	setup() {
		const $store = useStore();

		const mode = ref('list');
		const filter = ref('');
		const loading = computed({
			get: () => $store.state.guildRoster.isLoading,
			set: (val) => {
				$store.commit('showcase/updateDrawerState', val);
			},
		});

		$store.dispatch('guildRoster/getAll');
		const members = computed(() => $store.getters['guildRoster/roster']);

		const getColor = (val) => {
			if (val > 70 && val <= 100) {
				return 'green';
			} else if (val > 50 && val <= 70) {
				return 'blue';
			}
			return 'red';
		};
		const rankName = (value) => {
			return rankNames[value];
		};

		return {
			initialPagination: {
				sortBy: 'points_total',
                descending: true,
                page: 1,
                rowsPerPage: 20,
			},
			columns,
			mode,
			filter,
			loading,
			members,
			getColor,
			rankName,
		};
	},
});
</script>
