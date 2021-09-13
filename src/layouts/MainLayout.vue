<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated class="background-primary text-white">
			<q-toolbar>
				<div v-if="$q.platform.is.mobile" class="navbar-minimize">
					<q-btn
						flat
						dense
						round
						icon="menu"
						aria-label="Menu"
						@click="drawer = !drawer"
					/>
				</div>

				<q-toolbar-title>
					{{ $route.name }}
				</q-toolbar-title>

				<q-space class="gt-sm" />

				<div class="q-gutter-sm row items-center no-wrap">
					<q-btn
						dense
						flat
						size="16px"
						:icon="$q.dark.isActive ? 'wb_sunny' : 'nights_stay'"
						aria-label="Cambiar modo oscuro"
						@click="$q.dark.toggle()"
					/>
				</div>
			</q-toolbar>
		</q-header>

		<q-drawer
			v-model="drawer"
			show-if-above
			:mini="pinned ? false : miniState"
			:mini-to-overlay="!pinned"
			:width="300"
			:mini-width="70"
			:breakpoint="1040"
			:elevated="pinned ? true : !miniState"
			class="bg-dark text-white"
			@mouseover="miniState = false"
			@mouseout="miniState = true"
		>
			<div class="drawer_normal full-height">
				<q-toolbar class="drawer-header bg-primary">
					<q-avatar>
						<q-img
							src="~assets/logo.png"
							spinner-color="white"
							:ratio="1"
						/>
					</q-avatar>
					<q-toolbar-title>Gremio de Nordrassil</q-toolbar-title>
					<div v-if="$q.platform.is.desktop" class="navbar-minimize">
						<q-btn
							flat
							dense
							:icon="pinned ? 'chevron_left' : 'chevron_right'"
							aria-label="Menu"
							@click="pinned = !pinned"
						/>
					</div>
				</q-toolbar>

				<q-separator inset color="grey-3" />

				<login-menu></login-menu>

				<q-separator inset color="grey-3" />

				<q-list>
					<EssentialLink
						v-for="link in essentialLinks"
						:key="link.title"
						v-bind="link"
					/>
				</q-list>

				<q-separator inset color="grey-3" />

				<q-toolbar
					class="social-drawer row no-wrap"
					:class="!pinned && miniState ? '' : 'justify-around'"
				>
					<q-btn
						v-for="link in socialLinks"
						:key="link.title"
						dense
						flat
						size="16px"
						:icon="link.icon"
						type="a"
						:href="link.link"
						target="__blank"
					>
						<q-tooltip anchor="top middle" self="bottom middle"
							>Síguenos en {{ link.title }}</q-tooltip
						>
					</q-btn>
				</q-toolbar>
			</div>
		</q-drawer>

		<q-page-container>
			<q-page class="main-wrapper row no-wrap">
				<div class="col">
					<div class="full-height">
						<router-view v-slot="{ Component }">
							<transition name="fade" mode="out-in">
								<component :is="Component" />
							</transition>
						</router-view>
					</div>
				</div>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue';
import LoginMenu from 'components/LoginMenu.vue';
import { defineComponent, ref, watch } from 'vue';
import { useQuasar } from 'quasar';

const linksList = [
	{
		title: 'Home',
		icon: 'home',
		link: '/',
	},
	{
		title: 'Miembros',
		icon: 'groups',
		link: '/miembros',
	},
	{
		title: 'Puntos',
		icon: 'format_list_numbered',
		link: '/puntos',
	},
];

const socialLinksList = [
	{
		title: 'Youtube',
		icon: 'fab fa-youtube',
		link: 'https://www.youtube.com/user/kachicho100',
	},
	{
		title: 'Twitter',
		icon: 'fab fa-twitter',
		link: 'https://twitter.com/gremionord',
	},
	{
		title: 'Facebook',
		icon: 'fab fa-facebook',
		link: 'https://www.facebook.com/gremionord',
	},
];

export default defineComponent({
	name: 'MainLayout',

	components: {
		EssentialLink,
		LoginMenu,
	},
	setup() {
		const $q = useQuasar();
		const essentialLinks = linksList;
		const socialLinks = socialLinksList;
		const drawer = ref(false);
		const pinned = ref(true);
		const miniState = ref(false);

		watch(
			() => $q.dark.isActive,
			(val) => {
				$q.localStorage.set('darkMode', val);
			}
		);

		return {
			essentialLinks,
			socialLinks,
			drawer,
			pinned,
			miniState,
		};
	},
});
</script>

<style lang="scss">
.q-drawer {
	.drawer_normal {
		display: flex;
		flex-direction: column;

		.q-scrollarea {
			flex-grow: 1;
		}

		.social-drawer {
			bottom: 0;
			position: absolute;
		}
	}

	.q-toolbar {
		.q-avatar {
			font-size: 42px;
			margin: 0 2px;
		}

		.q-toolbar__title {
			font-size: 1.12rem;
			line-height: 1.75rem;
		}
	}

	.q-item {
		transition: all 0.3s ease 0s;
		opacity: 0.7;

		&:hover {
			opacity: 1;
		}

		&.q-router-link--active {
			opacity: 1;
			color: #ffffff;
			background-color: $primary;
		}
	}

	&.q-drawer--mini {
		.q-item {
			&.q-router-link--active {
				&::before,
				&::after {
					border-right-width: 10px;
				}
			}
		}

		.social-drawer {
			display: none;
		}
	}
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
