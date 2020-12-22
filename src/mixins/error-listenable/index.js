import bus from '@/utils/bus';

export default {
  created() {
    bus.$on('response:error', error => {
      const message = error.response.data.message || error.message;
      if (this.$dialog !== undefined) {
        this.$dialog.alert(message);
      } else {
        console.warn("'this.$dialog' is undefined. Please describe the appropriate error handling method in the'mixins/error-listenable.js' file. Since there is no proper error handling method, the error contents are printed with 'console.error()'.");
        console.error(error);
      }
    });
  },
};
