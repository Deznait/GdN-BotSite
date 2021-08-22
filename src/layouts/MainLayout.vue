<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated class="background-primary text-white">
            <q-toolbar>
                <q-btn
                    flat
                    dense
                    round
                    icon="menu"
                    aria-label="Menu"
                    @click="drawer = !drawer"
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
                        :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
                        @click="$q.dark.toggle()"
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
                        color="white"
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
                        color="white"
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
            elevated
            side="left"
            class="text-white"
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
            <q-page class="row no-wrap">
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

import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
    name: "MainLayout",

    components: {
        EssentialLink,
    },
    setup() {
        const $q = useQuasar();

        return {
            essentialLinks: linksList,
            drawer: ref(false),
            miniState: ref(true),
        };
    },
    methods: {
        logOut() {
            console.warn("logOut TEST");
        }
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

// .q-header {
//   background: linear-gradient(145deg, rgb(32, 106, 80) 15%, rgb(21, 57, 102) 70%);
// }
.q-drawer {
  background: url("~assets/images/drawer_bg_light.jpg") no-repeat fixed;
  background-position: center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.q-drawer__content {
  background-color: rgba(1, 1, 1, 0.75);
}

.body--dark {
    // .q-header {
    //     background: linear-gradient(145deg, rgb(61, 14, 42) 15%, rgb(14, 43, 78) 70%);
    // }
    .q-drawer {
        background-image: url("~assets/images/drawer_bg_dark.jpg");
    }
}
</style>
