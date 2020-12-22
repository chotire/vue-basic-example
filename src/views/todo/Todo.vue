<template>
  <div>
    <h1>TO-DO</h1>
    <v-row>
      <v-col cols="12">
        <v-btn @click="alert">Alert</v-btn>
        <v-btn @click="confirm">Confirm</v-btn>
        <v-btn @click="prompt">Prompt</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn @click="requestApi">API</v-btn>
        <v-btn @click="requestHttp">HTTP</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12"> 가격: {{ price | comma }} </v-col>
    </v-row>
  </div>
</template>

<script>
import { api } from '@/api/axios';

export default {
  data() {
    return {
      price: 125000,
    };
  },
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
    requestApi() {
      api
        .get('todoss/1')
        .then(response => console.log(response.data))
        .catch(error => console.log(JSON.stringify(error)));
    },
    requestHttp() {},
  },
};
</script>

<style lang="scss" scoped></style>
