<template>
  <div v-resize="onResize" style="width: 100%">
    <v-card style="height: 40px;" class="d-flex">
      <div v-for="(column, index) in columns" :key="index" :style="{ width: column.width }" :class="`text-${column.align ? column.align : 'start'}`" class="header">{{ column.text }}</div>
    </v-card>
    <!-- <v-simple-table dense>
      <template>
        <thead>
          <th v-for="(column, index) in columns" :key="index" :width="column.width" :class="`text-${column.align ? column.align : 'start'}`">{{ column.text }}</th>
        </thead>
      </template>
    </v-simple-table> -->
    <v-treeview v-bind="treeOptions" v-model="tree" :items="nodes">
      <template #label="{ item }">
        <div :style="{ width: getWidth('name') }">{{ item.name }}</div>
      </template>
      <template #append="{ item }">
        <div class="d-flex">
          <div :style="{ width: getWidth('head') }">
            {{ item.head }}
          </div>
          <div :style="{ width: getWidth('enabled') }">
            {{ item.enabled }}
          </div>
          <div :style="{ width: getWidth('actions') }">
            <v-btn @click="onClick(item.name)">click</v-btn>
          </div>
        </div>
      </template>
    </v-treeview>
  </div>
</template>

<script>
import { merge, cloneDeep } from 'lodash';

export default {
  props: {
    value: Array,
    headers: Array,
    // v-treeview options
    items: Array,
    itemKey: String,
    open: Array,
    activatable: Boolean,
    openOnClick: Boolean,
  },
  data() {
    return {
      tree: [],
      nodes: [],
      columns: [],
    };
  },
  computed: {
    treeOptions() {
      const options = merge({}, this.$props);
      delete options.value;
      delete options.headers;
      return options;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.tree = cloneDeep(value);
      },
    },
    headers: {
      immediate: true,
      handler(value) {
        this.columns = cloneDeep(value);
      },
    },
    items: {
      immediate: true,
      handler(value) {
        this.nodes = cloneDeep(value);
      },
    },
  },
  mounted() {
    for (const column of this.columns) {
      column.width = this.getPixel(column.width);
    }
  },
  methods: {
    getPixel(value) {
      return (this.$el.clientWidth * parseInt(value.replace('%', ''))) / 100 + 'px';
    },
    getWidth(name) {
      return this.columns.find(column => column.value === name).width;
    },
    onResize() {
      // console.log(this.$el.clientWidth);
    },
    onClick(name) {
      alert(name);
    },
  },
};
</script>

<style lang="scss" scoped>
// ::v-deep .v-treeview-node__label {
//   flex: none;
// }
thead th {
  height: 50px;
  padding-left: 10px;
}
.header {
  margin: auto;
  padding-left: 10px;
  font-weight: bold;
}
</style>
