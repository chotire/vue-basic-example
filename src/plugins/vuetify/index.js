import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import ko from 'vuetify/lib/locale/ko';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#F57C00',
        secondary: '#455A64',
        accent: '#FF5722',
        error: '#D50000',
        info: '#01579B',
        success: '#757575',
        warning: '#000',
      },
      dark: {
        primary: '#F57C00',
        secondary: '#252525',
        accent: '#000',
        error: '#D50000',
        info: '#01579B',
        success: '#757575',
        warning: '#FF5722',
      },
    },
    dark: true,
  },
  lang: {
    locales: { ko },
    current: 'ko',
  },
});
