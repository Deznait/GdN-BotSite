<template>
    <q-page padding>
        <div class="row">
            <div class="col-12 col-md-4">
                <RaiderIO></RaiderIO>
            </div>
            <div class="col-12 col-md-4">
                <span>Block2</span>
            </div>
            <div class="col-12 col-md-4">
                <span>Block3</span>
            </div>
        </div>
        <div class="row" style="height:100%">
            <div class="col flex flex-center">
                <img
                    alt="Gremio de Nordrassil logo"
                    src="~assets/logo.png"
                    style="width: 200px; height: 200px"
                />
            </div>
        </div>
    </q-page>
</template>

<script>
import RaiderIO from "src/components/Home/RaiderIO.vue";

import { defineComponent } from "vue";

export default defineComponent({
    name: "PageIndex",
    components: {
        RaiderIO,
    },
});
</script>
