<template>
	<div
		id="battlenetLoginPopup"
		class="fullscreen text-white text-center q-pa-md flex flex-center"
	>
		<div>
			<q-icon
				size="10rem"
				name="fab fa-battle-net"
			/>

			<div class="text-h4 q-mt-xl">
				Conectando con BattleNet...
			</div>

			<q-btn
				v-if="hasError"
				class="q-mt-xl"
				text-color="white"
				to="/"
				label="Volver"
				no-caps
				unelevated
			/>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { axios } from 'boot/axios';
import { auth } from 'boot/firebase';

export default defineComponent({
	name: 'LoginPopup',

	components: {},
	setup() {
		const hasError = ref(false);
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
			hasError.value = true;
		} else if (!code) {
			// Start the auth flow.
			window.location.href = 'https://europe-west1-gdn-bot.cloudfunctions.net/auth-battlenetRedirect';
		} else {
			// Use JSONP to load the 'token' Firebase Function to exchange the auth code against a Firebase custom token.
			const tokenFunctionURL =
				'https://europe-west1-gdn-bot.cloudfunctions.net/auth-battlenetToken';

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

		return { hasError };
	},
});
</script>

<style lang="scss" scoped>
#battlenetLoginPopup {
	background: $bg_battlenet;

	.q-icon {
		color: $text-battlenet;
		-webkit-animation: breathing 5s ease-in-out infinite normal;
    	animation: breathing 5s ease-in-out infinite normal;
	}

	.q-btn {
		background: #0074e0;
		border: 2px solid transparent;

		&:hover {
			border-color: #47a6ff;

			> .q-focus-helper {
				opacity: 1;
			}
		}
	}
}

@-webkit-keyframes breathing {
  0% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }

  25% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  60% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }

  100% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }
}

@keyframes breathing {
  0% {
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    transform: scale(0.9);
  }

  25% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }

  60% {
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    transform: scale(0.9);
  }

  100% {
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    transform: scale(0.9);
  }
}
</style>
