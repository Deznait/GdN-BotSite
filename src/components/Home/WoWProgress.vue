<template>
	<q-card flat bordered class="WowProgress shadow full-width">
		<q-tabs v-model="progressTab" dense align="justify">
			<q-tab key="avance" name="avance" label="Avance" />
		</q-tabs>

		<q-tab-panels v-model="progressTab" animated>
			<q-tab-panel key="avance" name="avance" class="row q-col-gutter-sm">
				<div v-for="rank in guildInfo" :key="rank.label" class="col-6">
					<q-card flat bordered class="text-center">
						<q-card-section class="q-pa-none">
							<q-btn
								flat
								padding="none"
								type="a"
								:href="rank.url"
								target="__blank"
								:label="rank.label"
								class="text-h6"
							/>
						</q-card-section>

						<q-separator inset />

						<q-card-section  class="q-pa-sm">
							<div
								class="text-h6"
								:class="progressRankColor(rank.progress)"
							>
								{{ rank.progress }}
							</div>
							<div v-if="!hideIlvl" class="text-subtitle2">
								ilvl:
								<span :class="progressRankColor(rank.ilvl)">{{
									rank.ilvl
								}}</span>
							</div>
						</q-card-section>
					</q-card>
				</div>
			</q-tab-panel>
		</q-tab-panels>

		<div class="q-pa-md text-subtitle2 text-center">
			<q-btn
				flat
				size="sm"
				type="a"
				:href="guild_url"
				target="__blank"
				label="Más info en WowProgress"
			/>
		</div>
		<q-btn
			class="reload"
			dense
			flat
			size="12px"
			icon="autorenew"
			aria-label="Recargar"
			@click="getWowProgressData"
		>
			<q-tooltip>Recargar</q-tooltip>
		</q-btn>
	</q-card>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import { db } from 'boot/firebase';

export default defineComponent({
	name: 'WoWProgress',
	props: {
		hideIlvl: {
			type: Boolean,
			default: false,
		},
	},
	setup() {
		const $q = useQuasar();

		let guildInfo = ref({
			0: {
				progress: '',
				ilvl: '',
			},
			1: {
				progress: '',
				ilvl: '',
			},
			2: {
				progress: '',
				ilvl: '',
			},
			3: {
				progress: '',
				ilvl: '',
			},
		});
		const guild_url = ref(
			'https://www.wowprogress.com/guild/eu/sanguino/Gremio+de+Nordrassil'
		);
		const progressTab = ref('avance');

		const getWowProgressData = async () => {
			let guild_info = {};

			const guild_info_remote = await db
				.collection('wowprogress')
				.doc('data')
				.get();
			if (guild_info_remote.exists) {
				guild_info = guild_info_remote.data();
				guild_info['date_fetched'] = new Date().getTime();

				$q.localStorage.set('savedGuildProgress', guild_info);
			}

			return guild_info;
		};

		const loadWowProgressData = async () => {
			let guildInfoData = {};
			const savedGuildProgress =
				$q.localStorage.getItem('savedGuildProgress');

			if (savedGuildProgress === null) {
				guildInfoData = await getWowProgressData();
			} else {
				const date = new Date();
				const Difference_In_Days =
					(date.getTime() - savedGuildProgress.date_fetched) /
					(1000 * 3600 * 24);

				if (Difference_In_Days >= 1.0) {
					guildInfoData = await getWowProgressData();
				} else {
					guildInfoData = savedGuildProgress;
				}
			}

			guildInfo.value[3] = guildInfoData.realm_rank;
			guildInfo.value[2] = guildInfoData.region_rank;
			guildInfo.value[1] = guildInfoData.area_rank;
			guildInfo.value[0] = guildInfoData.world_rank;
		};

		const progressRankColor = (value) => {
			let rankColor = 'rank rank';

			if (value <= 10) {
				rankColor += '_legendary';
			} else if (value > 10 && value <= 100) {
				rankColor += '_epic';
			} else if (value > 100 && value <= 2500) {
				rankColor += '_rare';
			} else {
				rankColor += '_uncommon';
			}

			return rankColor;
		};

		loadWowProgressData();
		return {
			guildInfo,
			guild_url,
			progressTab,
			getWowProgressData,
			progressRankColor,
		};
	},
});
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

	.rank {
		font-weight: bold;

		&_legendary {
			color: #ff8000;
		}

		&_epic {
			color: #a335ee;
		}

		&_rare {
			color: #0070dd;
		}

		&_uncommon {
			color: #16bb00;
		}
	}
}
</style>
