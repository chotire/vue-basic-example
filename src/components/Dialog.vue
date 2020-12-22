<template>
  <v-dialog v-model="show" :max-width="options.width" :style="{ zIndex: options.zIndex }" @keydown.esc="cancel" persistent>
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text v-show="!!message && !enabledInput">{{ message }}</v-card-text>
      <v-text-field v-show="enabledInput" v-model="input" :label="message" class="mx-5 mt-3" outlined dense></v-text-field>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn @click.native="agree" color="primary" text>확인</v-btn>
        <v-btn v-show="enabledCancelButton" @click.native="cancel" color="primary" text>취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ALERT, PROMPT } from './dialog-type';

export default {
  name: 'Dialog',
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    title: null,
    input: null,
    options: {
      width: 350,
      zIndex: 200,
      type: ALERT,
    },
  }),
  computed: {
    show: {
      get() {
        return this.dialog;
      },
      set(value) {
        this.dialog = value;
        if (value === false) {
          this.cancel();
        }
      },
    },
    enabledCancelButton() {
      return this.options.type !== ALERT;
    },
    enabledInput() {
      return this.options.type === PROMPT;
    },
  },
  methods: {
    open(title = null, message, options) {
      this.dialog = true;
      this.title = title;
      this.message = message;
      this.options = Object.assign(this.options, options);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      if (this.options.type === PROMPT) {
        this.resolve(this.input);
      } else {
        this.resolve(true);
      }
      this.dialog = false;
      this.reset();
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
      this.reset();
    },
    reset() {
      Object.assign(this.$data, this.$options.data());
    },
  },
};
</script>

<style lang="scss" scoped>
.v-input ::v-deep label {
  left: 0px !important;
  right: auto !important;
}
</style>
