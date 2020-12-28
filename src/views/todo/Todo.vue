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
        <v-btn>HTTP</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12"> 가격: {{ comma(price) }} </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn @click="openModal">Modal Window</v-btn>
        <modal-window v-model="open" :loading="loading" title="Objectives 입력">
          <template #content>
            <v-text-field label="Objective 명을 입력하세요."></v-text-field>
          </template>
          <template #footer>
            <v-spacer></v-spacer>
            <v-btn color="primary" text>저장</v-btn>
            <v-btn color="primary" text @click="open = false">닫기</v-btn>
          </template>
        </modal-window>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <doughnut-chart :style="{ height: '300px' }"></doughnut-chart>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { api } from '@/api/axios';
import { comma } from '@/utils/number-formatter';
import ModalWindow from '@/components/ModalWindow';
import DoughnutChart from './DoughnutChart';

export default {
  name: 'Todo',
  components: {
    ModalWindow,
    DoughnutChart,
  },
  data() {
    return {
      price: 125000,
      open: false,
      loading: false,
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
        .get('todos/1')
        .then(response => console.log(response.data))
        .catch(error => console.log(JSON.stringify(error)));
    },
    openModal() {
      this.open = true;
      this.loading = true;
      setTimeout(() => (this.loading = false), 1500);
    },
    comma,
  },
};
</script>

<style lang="scss" scoped></style>
