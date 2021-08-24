<template>
    <q-layout view="hHh Lpr lFf">
        <q-header elevated class="background-primary text-white">
            <q-toolbar>
                <q-btn
                    flat
                    dense
                    round
                    icon="menu"
                    aria-label="Menu"
                    class="lt-md"
                    @click="drawer = !drawer"
                />
                <q-btn
                    flat
                    dense
                    round
                    icon="menu"
                    aria-label="Menu"
                    class="gt-sm"
                    @click="miniState = !miniState"
                />

                <q-toolbar-title>
                    <q-avatar>
                        <q-img
                            src="~assets/logo.png"
                            spinner-color="white"
                            :ratio="1"
                        />
                    </q-avatar>
                    Gremio de Nordrassil
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

            :mini="miniState"
            @mouseover="miniState = false"
            @mouseout="miniState = true"
            mini-to-overlay

            :width="260"
            :breakpoint="1040"
            elevated
            class="bg-dark text-white"
        >
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
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
    {
        title: "Home",
        icon: "home",
        link: "/",
    },
    {
        title: "Miembros",
        icon: "groups",
        link: "/miembros",
    },
    {
        title: "Puntos",
        icon: "format_list_numbered",
        link: "/puntos",
    },
];

import { defineComponent, ref, watch  } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
    name: "MainLayout",

    components: {
        EssentialLink,
    },
    setup() {
        const $q = useQuasar();

        watch(() => $q.dark.isActive, val => {
            $q.localStorage.set("darkMode", val);
        })

        return {
            essentialLinks: linksList,
            drawer: ref(false),
            bigDrawer: ref(false),
            miniState: ref(true),
        };
    }
});
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
