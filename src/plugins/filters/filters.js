import { comma } from '@/utils/number-formatter';
export default {
  install(Vue) {
    Vue.filter('comma', value => {
      return comma(value);
    });
  },
};
