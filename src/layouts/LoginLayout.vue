<template>
	<div></div>
</template>

<script>
import { defineComponent } from 'vue';
import { axios } from 'boot/axios';
import { auth } from 'boot/firebase';

export default defineComponent({
	name: 'LoginLayout',

	components: {},
	setup() {
		/**
		 * Returns the value of the given URL query parameter.
		 */
		function getURLParameter(name) {
			return (
				decodeURIComponent(
					(new RegExp(
						'[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)'
					).exec(location.search) || [null, ''])[1].replace(
						/\+/g,
						'%20'
					)
				) || null
			);
		}

		/**
		 * This callback is called by the JSONP callback of the 'token' Firebase Function with the Firebase auth token.
		 */
		function tokenReceived(data) {
			console.info(data);
			if (data.token) {
				auth.signInWithCustomToken(data.token).then(function () {
					window.close();
				});
			} else {
				console.error(data);
				document.body.innerText =
					'Error in the token Function: ' + data.error;
			}
		}

		var code = getURLParameter('code');
		var state = getURLParameter('state');
		var error = getURLParameter('error');

		if (error) {
			document.body.innerText =
				'Error back from the BattleNet auth page: ' + error;
		} else if (!code) {
			// Start the auth flow.
			window.location.href =
				'https://europe-west1-gdn-bot.cloudfunctions.net/auth-battlenetRedirect';
		} else {
			// Use JSONP to load the 'token' Firebase Function to exchange the auth code against a Firebase custom token.
			const tokenFunctionURL = 'https://europe-west1-gdn-bot.cloudfunctions.net/auth-battlenetToken';

			axios
				.get(tokenFunctionURL, {
					params: {
						code: code,
						state: state,
					},
				})
				.then((response) => {
					// handle success
					tokenReceived(response.data);
				})
				.catch((error) => {
					// handle error
					console.error(error);
				});
		}

		return {};
	},
});
</script>
