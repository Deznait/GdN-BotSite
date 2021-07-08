<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <q-btn
                    flat
                    dense
                    round
                    icon="menu"
                    aria-label="Menu"
                    @click="toggleLeftDrawer"
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
                        v-if="$route.path !== '/help'"
                        round
                        dense
                        flat
                        color="yellow"
                        size="16px"
                        icon="help"
                    >
                        <q-tooltip>Ayuda</q-tooltip>
                    </q-btn>
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
            side="left"
            class="bg-grey-3"
        >
            <div id="profile" class="row">
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
                    <q-item-label header class="text-grey-8">
                        Navegación
                    </q-item-label>

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

        <q-footer elevated class="bg-grey-6 text-white">
            <q-toolbar>
                <q-toolbar-title>Footer</q-toolbar-title>
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
    {
        title: "Dashboard",
        icon: "home",
        link: "/",
    },
    {
        title: "Miembros",
        icon: "groups",
        link: "/miembros",
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
        const leftDrawerOpen = ref(false);

        return {
            essentialLinks: linksList,
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            },
        };
    },
    methods: {
        logOut() {
            console.log("logOut TEST");
        }
    }
});
</script>

<style lang="scss" scoped>
#avatar {
    padding: 20px;
}

#profile {
    height: 130px;
    padding: 20px;
    background-color: #009688;
}
</style>
