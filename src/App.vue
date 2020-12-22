<template>
  <v-app id="inspire">
    <layout>
      <router-view />
    </layout>
  </v-app>
</template>

<script>
import ErrorListenable from '@/mixins/error-listenable';
import Layout from '@/layouts/Layout';

export default {
  name: 'App',
  mixins: [ErrorListenable],
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
