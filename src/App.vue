<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  created() {
    const darkMode = this.$q.localStorage.getItem("darkMode");

    if(darkMode == null){
      this.$q.dark.set(true)
      this.$q.localStorage.set("darkMode", $q.dark.isActive);
    }else {
      this.$q.dark.set(darkMode)
    }
  }
})
</script>
