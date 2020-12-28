<template>
  <v-dialog v-model="show" v-bind="dialogOptions">
    <v-card v-bind="cardOptions">
      <v-card-title>
        {{ title }}
        <v-spacer></v-spacer>
        <v-btn @click="show = false" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <slot name="content">
          content slot 영역을 작성하세요.
        </slot>
      </v-card-text>
      <v-card-actions>
        <slot name="footer">
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="show = false">
            닫기
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { merge } from 'lodash';

export default {
  props: {
    value: Boolean,
    title: {
      type: String,
      default: 'Modal',
    },
    // v-dialog options
    fullscreen: Boolean,
    scrollable: Boolean,
    persistent: {
      type: Boolean,
      default: true,
    },
    maxWidth: {
      type: [String, Number],
      default: 800,
    },
    width: {
      type: [String, Number],
      default: 'auto',
    },
    // v-card options
    loading: Boolean,
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    dialogOptions() {
      const options = merge({}, this.$props);
      delete options.value;
      delete options.title;
      delete options.loading;
      return options;
    },
    cardOptions() {
      const options = { loading: this.loading };
      return options;
    },
  },
};
</script>

<style lang="scss" scoped></style>
