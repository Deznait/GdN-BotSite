<template>
    <q-page class="q-pt-xs">
        <div class="q-ma-md">
            <div class="row q-my-md">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <table-progress></table-progress>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import TableProgress from "src/components/Tables/TableProgress";

export default {
    name: 'PagePuntos',
    components: {
        TableProgress
    },
};
</script>
