<template>
  <v-app>
    <v-navigation-drawer :mini-variant="mini" app permanent>
      <v-list-item class="px-2">
        <v-list-item-avatar class="mr-6">
          <v-img src="https://blogpfthumb-phinf.pstatic.net/data1/2004/9/7/54/IMG_0406.jpg"></v-img>
        </v-list-item-avatar>
        chotire@gmail.com
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="menu in menus" :key="menu.path" @click="go(menu.path)" link>
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list dense>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="mini = !mini"></v-app-bar-nav-icon>
      <v-toolbar-title>OKR</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/"><v-icon>mdi-home</v-icon></router-link>
      <v-icon>mdi-square</v-icon>
      <v-icon>mdi-circle</v-icon>
    </v-app-bar>
    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      mini: true,
      menus: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', path: '/dashboard' },
        { title: 'TODO', icon: 'mdi-checkbox-marked', path: '/todo' },
        { title: 'Tree', icon: 'mdi-file-tree', path: '/tree' },
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
  margin-left: 20px;
  // padding: 60px 0px 0px 80px !important;
}
</style>
