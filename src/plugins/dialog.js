import Dialog from '@/components/Dialog.vue';
import { ALERT, CONFIRM, PROMPT } from '@/components/dialog-type';

class Plugin {
  constructor(Vue) {
    this.Vue = Vue;
    this.mounted = false;
    this.$root = {};
  }

  mountIfNotMounted() {
    if (this.mounted) {
      return;
    }

    this.$root = (() => {
      const node = document.createElement('div');
      document.querySelector('body').appendChild(node);
      const DialogComponent = this.Vue.extend(Dialog);
      const instance = new DialogComponent();
      // 동적으로 생성하는 vue 컴포넌트로 vuetify에 의해 생성되는 컴포넌트가 아니므로
      // vuetify의 속성을 만족 시켜줘야만 정상적으로 동작됨.
      // https://gist.github.com/eolant/ba0f8a5c9135d1a146e1db575276177d
      instance.$vuetify = {
        breakpoint: {},
        theme: {
          dark: true,
        },
      };
      return instance.$mount(node);
    })();

    this.mounted = true;
  }

  alert(message = null, options = {}) {
    return this.open('Alert', message, Object.assign({}, options, { type: ALERT }));
  }

  confirm(message = null, options = {}) {
    return this.open('Confirm', message, Object.assign({}, options, { type: CONFIRM }));
  }

  prompt(message = null, options = {}) {
    return this.open('Prompt', message, Object.assign({}, options, { type: PROMPT }));
  }

  open(title, message, options) {
    this.mountIfNotMounted();
    return this.$root.open(title, message, options);
  }

  static install(Vue, options) {
    Object.defineProperties(Vue.prototype, {
      $dialog: {
        get() {
          return new Plugin(Vue, options);
        },
      },
    });
  }
}

export default Plugin;

/*
import Dialog from '@/components/Dialog.vue';
import { ALERT, CONFIRM, PROMPT } from '@/components/dialog-type';

const Plugin = function(Vue) {
  this.Vue = Vue;
  this.mounted = false;
  this.$root = {}; // The root component
};

Plugin.prototype.mountIfNotMounted = function() {
  if (this.mounted) {
    return;
  }

  this.$root = (() => {
    const node = document.createElement('div');
    document.querySelector('body').appendChild(node);
    const DialogComponent = this.Vue.extend(Dialog);
    const dialog = new DialogComponent();
    // 동적으로 생성하는 vue 컴포넌트로 vuetify에 의해 생성되는 컴포넌트가 아니므로
    // vuetify의 속성을 만족 시켜줘야만 정상적으로 동작됨.
    // https://gist.github.com/eolant/ba0f8a5c9135d1a146e1db575276177d
    dialog.$vuetify = {
      breakpoint: {},
      theme: {
        dark: true,
      },
    };
    return dialog.$mount(node);
  })();
  this.mounted = true;
};

Plugin.prototype.alert = function(message = null, options = {}) {
  return this.open('Alert', message, Object.assign({}, options, { type: ALERT }));
};

Plugin.prototype.confirm = function(message = null, options = {}) {
  return this.open('Confirm', message, Object.assign({}, options, { type: CONFIRM }));
};

Plugin.prototype.prompt = function(message = null, options = {}) {
  return this.open('Prompt', message, Object.assign({}, options, { type: PROMPT }));
};

Plugin.prototype.open = function(title, message, options) {
  this.mountIfNotMounted();
  return this.$root.open(title, message, options);
};

Plugin.install = function(Vue, options) {
  Object.defineProperties(Vue.prototype, {
    $dialog: {
      get() {
        return new Plugin(Vue, options);
      },
    },
  });
};

export default Plugin;
*/
