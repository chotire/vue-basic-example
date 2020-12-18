<template>
  <component :is="layout">
    <slot></slot>
  </component>
</template>

<script>
import DefaultLayout from './DefaultLayout';
import PopupLayout from './PopupLayout';

export default {
  name: 'Layout',
  components: {
    DefaultLayout,
    PopupLayout,
  },
  computed: {
    layout() {
      return this.$route.meta.layout || 'DefaultLayout';
    },
  },
};
</script>

<style lang="scss" scoped></style>
