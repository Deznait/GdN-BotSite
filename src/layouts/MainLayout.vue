<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="text-white" :class="$q.dark.isActive ? 'header_dark' : 'header_normal'">
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

                <q-space />

                <div class="q-gutter-sm row items-center no-wrap">
                     <q-btn
                        class="q-mr-xs"
                        dense
                        flat
                        @click="$q.dark.toggle()"
                        :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
                    />
                    
                    <a href="https://www.youtube.com/user/kachicho100" target="_blank">
                        <q-btn
                            dense
                            flat
                            color="white"
                            size="16px"
                            icon="mdi-youtube"
                        >
                            <q-tooltip>Síguenos en Youtube</q-tooltip>
                        </q-btn>
                    </a>

                    <a href="https://twitter.com/gremionord" target="_blank">
                        <q-btn
                            dense
                            flat
                            color="white"
                            size="16px"
                            icon="mdi-twitter"
                        >
                            <q-tooltip>Síguenos en Twitter</q-tooltip>
                        </q-btn>
                    </a>

                    <a href="https://www.facebook.com/gremionord" target="_blank">
                        <q-btn
                            dense
                            flat
                            color="white"
                            size="16px"
                            icon="mdi-facebook"
                        >
                            <q-tooltip>Síguenos en Facebook</q-tooltip>
                        </q-btn>
                    </a>
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="drawer"
            show-if-above
            bordered
            side="left"
            class="left-navigation text-white"
            :class="$q.dark.isActive ? 'drawer_dark' : 'drawer_normal'"
        >
            <div id="profile" class="row" v-if="true == false">
                <div class="col-4">
                    <q-img
                        src="https://cdn.quasar.dev/img/boy-avatar.png"
                        spinner-color="white"
                        class="inline-block"
                        fit="contain"
                        ratio="1"
                        height="40px"
                    />
                </div>
                <div class="col-8">
                    <div id="user-name">
                        <span class="text-white"> TESTNAME </span>
                        <hr />
                    </div>
                    <div id="user-actions">
                        <q-btn class="bordered blue small" icon="person" />
                        <q-btn class="bordered blue small" icon="lock" />
                        <q-btn
                            class="bordered blue small"
                            icon="exit_to_app"
                            @click="logOut"
                        />
                    </div>
                </div>
            </div>

            <q-list>
                <EssentialLink
                    v-for="link in essentialLinks"
                    :key="link.title"
                    v-bind="link"
                />
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
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
            console.log("logOut TEST");
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

.q-header {
  background: linear-gradient(145deg, rgb(32, 106, 80) 15%, rgb(21, 57, 102) 70%);
}
.q-drawer {
  background: url("~assets/images/drawer_bg_light.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.q-drawer__content {
  background-color: rgba(1, 1, 1, 0.75);
}

.body--dark {
    .q-header {
        background: linear-gradient(145deg, rgb(61, 14, 42) 15%, rgb(14, 43, 78) 70%);
    }
    .q-drawer {
        background-image: url("~assets/images/drawer_bg_dark.jpg");
    }
}
</style>
