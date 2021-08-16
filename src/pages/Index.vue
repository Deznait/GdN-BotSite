<template>
    <q-page class="q-pt-xs">
        <div class="q-ma-md">
            <div class="row q-col-gutter-md">
                <div class="col-12 col-md-4">
                    <RaiderIO></RaiderIO>
                </div>
                <div class="col-12 col-md-4">
                    <WoWProgress></WoWProgress>
                </div>
                <div class="col-12 col-md-4">
                    <span>Block3</span>
                </div>
            </div>
            <div class="row q-col-gutter-md q-pt-md" style="height:100%">
                <div class="col flex flex-center">
                    <img
                        alt="Gremio de Nordrassil logo"
                        src="~assets/logo.png"
                        style="width: 200px; height: 200px"
                    />
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import RaiderIO from "src/components/Home/RaiderIO.vue";
import WoWProgress from "src/components/Home/WoWProgress.vue";

import { defineComponent } from "vue";

export default defineComponent({
    name: "PageIndex",
    components: {
        RaiderIO,
        WoWProgress,
    },
});
</script>
