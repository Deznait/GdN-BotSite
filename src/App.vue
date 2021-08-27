<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar();

    const darkMode = $q.localStorage.getItem("darkMode");

    if(darkMode == null){
      $q.dark.set(true);
      $q.localStorage.set("darkMode", $q.dark.isActive);
    }else {
      $q.dark.set(darkMode);
    }
  }
});
</script>
