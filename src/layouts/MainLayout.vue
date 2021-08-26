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
			:mini-width="70"
			:breakpoint="1040"
			:elevated="pinned ? true : !miniState"
			class="bg-dark text-white"
		>
			<div class="drawer_normal full-height">
				<q-toolbar class="bg-primary">
					<q-avatar
					>
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
							:icon="pinned ? 'chevron_left' : 'chevron_right'"
							aria-label="Menu"
							@click="pinned = !pinned"
						/>
					</div>
				</q-toolbar>

				<q-separator inset color="grey-3" />

				<q-toolbar>
					<q-avatar>
					<img src="https://cdn.quasar.dev/img/boy-avatar.png" />
					</q-avatar>

					<q-toolbar-title>NOMBRE USUARIO</q-toolbar-title>
				</q-toolbar>

				<q-separator inset color="grey-3" />

				<q-scroll-area >
					<q-list>
						<EssentialLink
							v-for="link in essentialLinks"
							:key="link.title"
							v-bind="link"
						/>
					</q-list>
				</q-scroll-area>

				<q-separator inset color="grey-3" />

				<q-toolbar
					class="social-drawer q-gutter-sm row no-wrap"
					:class="(!pinned && miniState) ? '' : 'justify-around'"
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


	{
		title: 'Home',
		icon: 'home',
		link: '/s',
	},
	{
		title: 'Miembros',
		icon: 'groups',
		link: '/miembross',
	},
	{
		title: 'Puntos',
		icon: 'format_list_numbered',
		link: '/puntoss',
	},
	{
		title: 'Home',
		icon: 'home',
		link: '/s',
	},
	{
		title: 'Miembros',
		icon: 'groups',
		link: '/miembross',
	},
	{
		title: 'Puntos',
		icon: 'format_list_numbered',
		link: '/puntoss',
	},
	{
		title: 'Home',
		icon: 'home',
		link: '/s',
	},
	{
		title: 'Miembros',
		icon: 'groups',
		link: '/miembross',
	},
	{
		title: 'Puntos',
		icon: 'format_list_numbered',
		link: '/puntoss',
	},
	{
		title: 'Home',
		icon: 'home',
		link: '/s',
	},
	{
		title: 'Miembros',
		icon: 'groups',
		link: '/miembross',
	},
	{
		title: 'Puntos',
		icon: 'format_list_numbered',
		link: '/puntoss',
	},
	{
		title: 'Home',
		icon: 'home',
		link: '/s',
	},
	{
		title: 'Miembros',
		icon: 'groups',
		link: '/miembross',
	},
	{
		title: 'Puntos',
		icon: 'format_list_numbered',
		link: '/puntoss',
	},
]

const socialLinksList = [
	{
		title: 'Youtube',
		icon: 'mdi-youtube',
		link: 'https://www.youtube.com/user/kachicho100',
	},
	{
		title: 'Twitter',
		icon: 'mdi-twitter',
		link: 'https://twitter.com/gremionord',
	},
	{
		title: 'Facebook',
		icon: 'mdi-facebook',
		link: 'https://www.facebook.com/gremionord',
	},
]

import { defineComponent, ref, watch } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
	name: 'MainLayout',

	components: {
		EssentialLink,
	},
	setup() {
		const $q = useQuasar()
		const essentialLinks = linksList
		const socialLinks = socialLinksList
		const drawer = ref(false)
		const pinned = ref(true)
		const miniState = ref(false)

		watch(
			() => $q.dark.isActive,
			(val) => {
				$q.localStorage.set('darkMode', val)
			}
		)

		return {
			essentialLinks,
			socialLinks,
			drawer,
			pinned,
			miniState: ref(false),
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
