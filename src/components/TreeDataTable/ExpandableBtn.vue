<template>
  <span>
    <template v-if="node.children !== undefined">
      <v-btn :loading="loading" @click="click(node)" class="mr-1" x-small text fab>
        <v-icon small>
          {{ icon(node) }}
        </v-icon>
        <template v-slot:loader>
          <span class="loader">
            <v-icon small>mdi-cached</v-icon>
          </span>
        </template>
      </v-btn>
    </template>
    <template v-else>
      <span style="padding-left: 15px"></span>
    </template>
  </span>
</template>

<script>
export default {
  props: {
    node: Object,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    icon(node) {
      return node._expanded ? 'mdi-chevron-down' : 'mdi-chevron-right';
    },
    click(node) {
      const vm = this;
      this.$emit('click', node, {
        loading(value) {
          vm.loading = value;
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.v-btn--fab.v-size--x-small {
  height: 23px;
  width: 23px;
}
.loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
