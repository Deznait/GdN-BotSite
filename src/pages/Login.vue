<template>
	<q-page class="q-pt-xs">
		<div class="q-ma-md">
			<h5>Login</h5>
			<q-form class="q-gutter-md">
				<q-btn icon="fab fa-google" @click="googleLogin">
					Entra con Google
				</q-btn>
				<q-btn icon="fab fa-battle-net" @click="battleNetLogin">
					Entra con BattleNet
				</q-btn>
			</q-form>
		</div>
	</q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { auth, googleAuthProvider, BattleNetAuthProvider } from 'boot/firebase';

export default defineComponent({
	name: 'LoginPage',
	setup() {
		const googleLogin = async () => {
			console.info('googleLogin INI');

			auth.signInWithPopup(googleAuthProvider)
				.then((result) => {
					console.info(result);
				})
				.catch((error) => {
					console.error(error);
				});

			console.info('googleLogin END');
		};

		const battleNetLogin = async () => {
			console.info('battleNetLogin INI');

			auth.signInWithPopup(BattleNetAuthProvider)
				.then((result) => {
					console.info(result);
				})
				.catch((error) => {
					console.error(error);
				});

			console.info('battleNetLogin END');
		};

		return { googleLogin, battleNetLogin };
	},
});
</script>
