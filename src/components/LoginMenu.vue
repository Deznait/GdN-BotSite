<template>
	<q-expansion-item
		v-if="isAuthenticated"
		icon="map"
		label="Maps"
		class="q-ma-sm"
	>
		<template #header>
			<q-item-section avatar>
				<q-avatar>
					<img :src="user.photoURL" />
				</q-avatar>
			</q-item-section>

			<q-item-section> {{ user.displayName }} </q-item-section>
		</template>

		<q-list class="q-pl-lg">
			<q-item
				v-ripple
				to="/MapMarker"
				active-class="q-item-no-link-highlighting"
				clickable
			>
				<q-item-section avatar>
					<q-icon name="manage_accounts" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Mi perfil</q-item-label>
				</q-item-section>
			</q-item>
			<q-item v-ripple clickable @click="logOut">
				<q-item-section avatar>
					<q-icon name="logout" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Salir</q-item-label>
				</q-item-section>
			</q-item>
		</q-list>
	</q-expansion-item>
	<q-item
		v-else
		v-ripple
		to="/login"
		active-class="q-item-no-link-highlighting"
		class="q-ma-sm login"
		clickable
	>
		<q-item-section avatar>
			<q-icon name="fab fa-battle-net" />
		</q-item-section>
		<q-item-section>
			<q-item-label>Conecta con BattleNet</q-item-label>
		</q-item-section>
	</q-item>
</template>

<script>
import { defineComponent } from 'vue';
import { auth } from 'boot/firebase';
import { useAuth } from '@vueuse/firebase/useAuth';
import { useQuasar } from 'quasar';
import { routerInstance } from 'boot/router';

export default defineComponent({
	setup() {
		const { user, isAuthenticated } = useAuth(auth);
		const $q = useQuasar();

		const logOut = async () => {
			try {
				await auth.signOut();
				$q.notify({
					message: 'Te has desconectado correctamente',
					color: 'primary',
				});

				routerInstance.push('/');
			} catch (error) {
				console.log(error);
			}
		};
		return {
			user,
			isAuthenticated,
			logOut,
		};
	},
});
</script>

<style lang="scss" scoped>
.login {
	.q-item__section--avatar {
		transition: all 0.3s;
	}

	&:hover {
		.q-item__section--avatar {
			color: #148eff;
		}
	}
}
</style>
