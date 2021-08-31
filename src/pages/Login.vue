<template>
	<q-page padding>
		<h5>{{ acceder ? 'Login' : 'Registro' }}</h5>
		<q-form class="q-gutter-md" @submit.prevent="registro">
			<q-input v-model="email" label="Email" />
			<q-input v-model="password" label="Password" />
			<q-btn color="primary" type="submit">{{
				acceder ? 'Login' : 'Registro'
			}}</q-btn>
			<q-btn
				v-if="!acceder"
				color="primary"
				outline
				@click="acceder = true"
			>
				¿Ya tienes cuenta?
			</q-btn>
			<q-btn v-else color="negative" outline @click="acceder = false">
				¿No tienes cuenta?
			</q-btn>
			<q-btn icon="fab fa-google" @click="googleLogin">
				¿No tienes cuenta?
			</q-btn>
			<q-btn icon="fab fa-battle-net" @click="battleNetLogin">
				¿No tienes cuenta? Registrate con BattleNet
			</q-btn>
		</q-form>
	</q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { auth, db, googleAuthProvider } from 'boot/firebase';

export default defineComponent({
	name: 'LoginPage',
	setup() {
		const email = ref('');
		const password = ref('');
		const acceder = ref(true);
		const provider = googleAuthProvider;

    	const googleLogin = async () => {
			console.info('googleLogin INI');

			auth
			.signInWithPopup(provider)
			.then((result) => {
				console.info(result);
				// /** @type {firebase.auth.OAuthCredential} */
				// var credential = result.credential;
				// console.info("credential", credential);
				// // This gives you a Google Access Token. You can use it to access the Google API.
				// var token = credential.accessToken;
				// console.info("token", token);
				// // The signed-in user info.
				// var user = result.user;
				// console.info("user", user);
				// ...
			}).catch((error) => {
				console.error(error);
				// // Handle Errors here.
				// var errorCode = error.code;
				// var errorMessage = error.message;
				// // The email of the user's account used.
				// var email = error.email;
				// // The firebase.auth.AuthCredential type that was used.
				// var credential = error.credential;
				// // ...
			});
      
			console.info("googleLogin END");
		};

		const AuthCredentials = ref({
				clientid: process.env.BNET_CLIENT_ID.replace(/['"]+/g, ''),
				redirect: process.env.BNET_CLIENT_REDIRECT_URI.replace(/['"]+/g, ''),
				region: process.env.BNET_CLIENT_REGION.replace(/['"]+/g, ''),
			});

		//https://eu.battle.net/oauth/authorize?scope=wow.profile&response_type=code&redirect_uri=https%3A%2F%2Fwww.wowhead.com%2Faccount%3Dbattlenet&state=yRn12MdWki1QTLk7ActjFNtu&client_id=c9b67224c7ab42768f5727fa05b427b4
		//https://eu.battle.net/oauth/authorize?scope=wow.profile&response_type=code&redirect_uri=https://gdn-bot.web.app/login&state=yRn12MdWki1QTLk7ActjFNtu&client_id=b355ae655a474459aa6264c30aca4e86
		//https://eu.battle.net/oauth/authorize?scope=wow.profile&response_type=code&redirect_uri=https://gdn-bot.web.app/login&state=49d8b2ac46441e03ad9b47e28c386d94bbf03184client_id=b355ae655a474459aa6264c30aca4e86
		const battleNetLogin = async () => {
			console.info('battleNetLogin INI');
			// console.info('process.env', process.env);

			const codeUri =
			`https://eu.battle.net/oauth/authorize?` +
			`scope=wow.profile&` +
			`response_type=code&` +
			`redirect_uri=https://gdn-bot.web.app/login&` +
			`state=yRn12MdWki1QTLk7ActjFNtu&` +
			`client_id=b355ae655a474459aa6264c30aca4e86`;

			console.info(codeUri);
      
			console.info('battleNetLogin END');
		};

		const registro = async () => {
			if (!email.value.trim() || !password.value.trim()) {
				console.info('campos vacios');
				return;
			}
			try {
				if (acceder.value) {
					const userCredential =
						await auth.signInWithEmailAndPassword(
							email.value,
							password.value
						);
					const userDB = userCredential.user;
					await db.collection('users').doc(userDB.uid).update({
						estado: true,
					});
				} else {
					const userCredential =
						await auth.createUserWithEmailAndPassword(
							email.value,
							password.value
						);
					const userDB = userCredential.user;
					await db.collection('users').doc(userDB.uid).set({
						correo: userDB.email,
						uid: userDB.uid,
						estado: true,
					});
				}
				email.value = '';
				password.value = '';
			} catch (error) {
				console.info(error);
			}
		};
		return { email, password, registro, acceder, googleLogin,battleNetLogin, AuthCredentials };
	},
});
</script>
