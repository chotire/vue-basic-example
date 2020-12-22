<template>
  <div>
    <h1>TO-DO</h1>
    <v-btn @click="alert">Alert</v-btn>
    <v-btn @click="confirm">Confirm</v-btn>
    <v-btn @click="prompt">Prompt</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    alert() {
      this.$dialog.alert('Request completed!').then(closed => console.log('Closed', closed));
    },
    async confirm() {
      const confirmed = await this.$dialog.confirm('저장 하시겠습니까?');
      console.log('Confirmed', confirmed);
    },
    prompt() {
      this.$dialog.prompt('이름을 입력하세요.').then(input => console.log('Input', input));
    },
  },
};
</script>

<style lang="scss" scoped></style>
