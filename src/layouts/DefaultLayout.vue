<template>
  <div>
    <v-system-bar app>
      <router-link to="/"><v-icon>mdi-home</v-icon></router-link>
      <v-spacer></v-spacer>
      <v-icon>mdi-square</v-icon>
      <v-icon>mdi-circle</v-icon>
      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>
    <v-navigation-drawer app permanent>
      <v-sheet class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
        <div>chotire@gmail.com</div>
      </v-sheet>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="menu in menus" :key="menu.path" @click="go(menu.path)" link>
          <v-list-item-icon>
            <v-icon>mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ menu.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <slot></slot>
    </v-main>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      menus: [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'TODO', path: '/todo' },
      ],
    };
  },
  methods: {
    go(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.v-main {
  background-color: #161616;
  padding: 20px 0px 0px 280px !important;
}
</style>
