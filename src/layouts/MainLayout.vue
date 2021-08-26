<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated class="background-primary text-white">
			<q-toolbar>
                <div class="navbar-minimize" v-if="$q.platform.is.mobile">
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
						@click="$q.dark.toggle()"
						aria-label="Cambiar modo oscuro"
					/>

					<q-btn
						dense
						flat
						size="16px"
						icon="mdi-youtube"
						class="gt-xs"
						type="a"
						href="https://www.youtube.com/user/kachicho100"
						target="__blank"
					>
						<q-tooltip>Síguenos en Youtube</q-tooltip>
					</q-btn>

					<q-btn
						dense
						flat
						size="16px"
						icon="mdi-twitter"
						class="gt-xs"
						type="a"
						href="https://twitter.com/gremionord"
						target="__blank"
					>
						<q-tooltip>Síguenos en Twitter</q-tooltip>
					</q-btn>

					<q-btn
						dense
						flat
						size="16px"
						icon="mdi-facebook"
						class="gt-xs"
						type="a"
						href="https://www.facebook.com/gremionord"
						target="__blank"
					>
						<q-tooltip>Síguenos en Facebook</q-tooltip>
					</q-btn>
				</div>
			</q-toolbar>
		</q-header>

		<q-drawer
			v-model="drawer"
			show-if-above

			:mini="pinned ? false : miniState"
			@mouseover="miniState = false"
			@mouseout="miniState = true"
			:mini-to-overlay="!pinned"

			:width="300"
			:breakpoint="1040"
			:elevated="pinned ? false : !miniState"
			class="bg-dark text-white"
			:class="miniState ? 'sidebar-mini' : ''"
		>
			<q-toolbar class="bg-primary text-white">
				<q-avatar>
					<q-img
						src="~assets/logo.png"
						spinner-color="white"
						:ratio="1"
					/>
				</q-avatar>
				<q-toolbar-title>Gremio de Nordrassil</q-toolbar-title>
				<div class="navbar-minimize" v-if="$q.platform.is.desktop">
					<q-btn
						flat
						dense
						round
						:icon="pinned ? 'chevron_left' : 'chevron_right'"
						aria-label="Menu"
						class="visible-on-sidebar-regular"
						@click="pinned = !pinned"
					/>
				</div>
			</q-toolbar>

			<q-separator />

			<q-list>
					<EssentialLink
						v-for="link in essentialLinks"
						:key="link.title"
						v-bind="link"
					/>
				</q-list>
		</q-drawer>

		<q-page-container>
			<q-page class="main-wrapper row no-wrap">
				<div class="col">
					<div class="full-height">
						<router-view />
					</div>
				</div>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

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
]

import { defineComponent, ref, watch } from 'vue'
import { useQuasar } from "quasar"

export default defineComponent({
	name: 'MainLayout',

	components: {
		EssentialLink,
	},
	setup() {
		const $q = useQuasar()
		const essentialLinks = linksList
		const drawer = ref(false)
		const pinned = ref(true)
		const miniState = ref(false)

		watch(
			() => $q.dark.isActive,
			(val) => {
				$q.localStorage.set('darkMode', val)
			}
		)

		const drawerClick = (e) => {
			console.log("drawerClick");
			// if in "mini" state and user
			// click on drawer, we switch it to "normal" mode
				console.log(miniState.value);
			if (miniState.value) {
				console.log(miniState.value);
				miniState.value = false

				// notice we have registered an event with capture flag;
				// we need to stop further propagation as this click is
				// intended for switching drawer to "normal" mode only
				e.stopPropagation()
			}
		}

		return {
			essentialLinks,
			drawer,
			pinned,
			miniState: ref(false),
			drawerClick,
		}
	},
})
</script>

<style lang="scss">
#avatar {
	padding: 20px;
}
#profile {
	height: 130px;
	padding: 20px;
	background-color: #009688;
}
</style>
