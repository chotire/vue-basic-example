<template>
  <v-app id="inspire">
    <layout>
      <router-view />
    </layout>
  </v-app>
</template>

<script>
import Layout from '@/layouts/Layout';

export default {
  name: 'App',
  components: {
    Layout,
  },
  data() {
    return {
      drawer: true,
    };
  },
};
</script>

<style lang="scss" scoped></style>
