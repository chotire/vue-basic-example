<template>
  <div>
    <v-card class="header d-flex rounded-0">
      <slot name="header" v-bind="{ headers }">
        <div v-for="(header, index) in headers" :key="index" :style="{ width: header.width }">
          <slot :name="`header.${header.value}`" v-bind="{ header }">
            <span v-html="header.text"></span>
          </slot>
        </div>
      </slot>
    </v-card>
    <v-card v-for="(item, index) in items" :key="index" class="body rounded-0">
      <div @click="expand(index)">
        <div class="d-flex item">
          <div v-for="(header, index) in headers" :key="index" :style="{ width: header.width }">
            <slot :name="`item.${header.value}`" v-bind="{ item, value: item[header.value] }">
              <template v-if="header.value === 'workNm'">
                <v-icon class="mr-2" small>mdi-infinity</v-icon>
                {{ item.workNm }}
              </template>
              <template v-if="header.value === 'workEndDate'">
                {{ format(item.workEndDate, 'MM.dd') }}
              </template>
              <template v-else-if="header.value === 'progress'">
                <div class="d-flex">
                  <v-progress-linear :value="item.dcsnParto" height="15" class="progress"></v-progress-linear>
                  <div style="width: 100px" class="ml-4">
                    <div>
                      <span class="mr-1">{{ item.dcsnParto }}%</span>
                      <span class="text--disabled">{{ item.beforeDcsnParto }}%</span>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                {{ item[header.value] }}
              </template>
            </slot>
          </div>
        </div>
      </div>
      <div v-show="attrs[index].show">
        <v-divider></v-divider>
        <slot name="contents" v-bind="{ item }">
          <div class="item text--disabled">연결 (O) {{ item.kr.objt.objtNm }}</div>
          <div class="item-level text--disabled">L (KR) {{ item.kr.krNm }}</div>
        </slot>
      </div>
      <div v-show="attrs[index].show">
        <v-divider></v-divider>
        <slot name="footer" v-bind="{ item }">
          <div class="footer d-flex text--disabled">
            <span>(Task)</span>
            <template v-for="task in tasks">
              <div :key="task.text">
                <span :key="task.text">{{ task.text }}</span>
                <span :key="task.type">{{ getTaskCount(item, task.type) }} 건</span>
              </div>
            </template>
          </div>
        </slot>
      </div>
    </v-card>
  </div>
</template>

<script>
/**
 * loading 나중에 추가
 */
import { format } from 'date-fns';

export default {
  name: 'WorkBoard',
  props: {
    headers: {
      type: Array,
      default: () => {
        return [
          { text: 'Work & 연결된 ORK', value: 'workNm', width: '40%' },
          { text: '완료일', value: 'workEndDate', width: '15%' },
          { text: '담당조직', value: 'orgNm', width: '15%' },
          { text: '진행상태 (현재 <span class="text--disabled">| 전일대비</span>)', value: 'progress', width: '30%' },
        ];
      },
    },
    items: Array,
    itemKey: {
      type: String,
      default: () => 'workId',
    },
  },
  data() {
    return {
      attrs: [],
    };
  },
  computed: {
    tasks() {
      return [
        { text: '진행예정', type: 1 },
        { text: '진행중', type: 2 },
        { text: '지연', type: 3 },
        { text: '진행완료', type: 4 },
      ];
    },
  },
  watch: {
    items: {
      immediate: true,
      handler(items) {
        for (const item of items) {
          this.attrs.push({ id: item[this.itemKey], show: true });
        }
      },
    },
  },
  methods: {
    getTaskCount(item, type) {
      return item.tasks.filter(task => task.taskStatCd === type).length;
    },
    expand(index) {
      this.attrs[index].show = !this.attrs[index].show;
    },
    format,
  },
};
</script>

<style lang="scss" scoped>
$border: thin solid rgba(255, 255, 255, 0.12);

.v-card {
  padding: 10px 10px 0 10px;
}
.header {
  border-top: $border;
  border-left: $border;
  border-right: $border;
  height: 50px;
}
.body {
  border: $border;
  margin-bottom: 10px;
}
.item {
  height: 40px;
  padding: 0 10px 0 10px;
  display: table-cell;
  vertical-align: middle;
  cursor: pointer;
}
.item-level {
  height: 40px;
  padding-left: 70px;
}
.footer {
  padding: 10px 0 10px 0;
}
.footer > span {
  margin: 0 10px 0 50px;
}
.footer > div {
  width: 25%;
}
.footer > div > span {
  margin-right: 10px;
}
.progress {
  margin: auto;
}
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 20px;
}
</style>
