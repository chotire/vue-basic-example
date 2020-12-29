<template>
  <div>
    <div class="d-flex">
      <v-btn small right class="mb-2" @click="expandAll(true)"><v-icon small>mdi-arrow-expand-vertical</v-icon></v-btn>
      <v-btn small right class="mb-2" @click="expandAll(false)"><v-icon small>mdi-arrow-collapse-vertical</v-icon></v-btn>
    </div>
    <!-- eslint-disable-next-line prettier/prettier -->
    <tree-data-table 
      :headers="headers" 
      :items="items" 
      item-key="id" 
      :open-all="openAll" 
      height="500"
      @click:expand="expand" 
      @click:row="highlight" 
      @contextmenu:row="showContextMenu" 
      dense hide-default-footer disable-pagination fixed-header single-select
    >
      <template #item.step="{ value }"> {{ comma(value) }} </template>
    </tree-data-table>

    <v-menu v-model="showMenu" :position-x="x" :position-y="y" z-index="10" absolute offset-y>
      <v-list dense>
        <v-list-item link>
          <v-list-item-title>Menu#1</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-title>Menu#2</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import TreeDataTable from '@/components/TreeDataTable';
import { comma } from '@/utils/number-formatter';

export default {
  name: 'tree',
  components: {
    TreeDataTable,
  },
  data() {
    return {
      // TreeDataTable 컴포넌트는 headers에 expandable 이 true인 값을 기준으로
      // expand/collapse 기능을 추가하므로 원하는 컬럼에 expandable: true를 설정한다.
      headers: [
        { text: '시스템 메뉴', value: 'name', sortable: false, width: '30%', expandable: true },
        { text: '총 스텝수', value: 'step', sortable: false, width: '10%' },
        { text: 'Ø R.T.', value: 'a', sortable: false },
        { text: 'Ø Wait', value: 'b', sortable: false },
        { text: 'Ø Roll in', value: 'c', sortable: false },
        { text: 'Ø Load+Gen', value: 'd', sortable: false },
        { text: 'Ø Proc', value: 'e', sortable: false },
      ],
      items: [],
      openAll: false,

      // context menu
      showMenu: false,
      x: 0,
      y: 0,
    };
  },
  created() {
    // TreeDataTable을 사용하기 위해서는 아래와 같이 계층적인(Hierarchical) 데이터가 요구되고
    // 또 그 데이터는 계층들 중 어떤 데이터가 Leaf 노드인지 표현되어야 한다.
    // 즉 TreeDataTable 이 필수적인 속성은 다음과 같다.
    // - children: 자식을 포함
    // eslint-disable-next-line prettier/prettier
    this.items = [
      {
        id: '1',
        name: 'Office',
        children: [
          { id: '1-1', name: 'Office-1', children: [] },
          {
            id: '1-2',
            name: 'Office-2',
            children: [
              { id: '1-2-1', name: 'Office-2-1', step: 123 },
              { id: '1-2-2', name: 'Office-2-2', step: 3941 },
              {
                id: '1-2-3',
                name: 'Office-2-3',
                children: [
                  { id: '1-2-3-1', name: 'Office-2-3-1', step: 8 },
                  { id: '1-2-3-2', name: 'Office-2-3-2', step: 85 },
                  { id: '1-2-3-3', name: 'Office-2-3-3', step: 392 },
                ],
              },
            ],
          },
          { id: '1-3', name: 'Office-3', children: [] },
        ],
      },
      { id: '2', name: 'Cross-Application Components', children: [] },
    ];
  },
  methods: {
    expandAll(value) {
      this.openAll = value;
    },
    // { opened, expanded, loading, add, remove } arguments는 사용하고 싶은 것만 선택적으로 가능
    expand(item, { opened, loading, add, remove }) {
      // opened는 컴포넌트를 사용하는 곳에서 트리를 오픈할 때 이미 한 번 오픈한 Node인지 식별하기 위한 설정 값
      // 보통 비동기 통신에서 한 번만 데이터를 가져오기 위해 사용됨
      if (!opened) {
        loading(true);
        const id = this.genId();
        setTimeout(() => {
          if (item.id === '1-1') {
            remove(item);
          } else {
            const newItem = { id, name: `chotire-${id}`, step: id };
            add(newItem);
          }
          loading(false);
        }, 500);
      }
    },
    genId() {
      return Math.floor(Math.random() * (100000 - 1) + 1);
    },
    // { headers, opened, expanded, selected, item, select } arguments는 사용하고 싶은 것만 선택적으로 가능
    highlight(node, { selected, select }) {
      select(!selected);
    },
    // { headers, opened, expanded, selected, item, select } arguments는 사용하고 싶은 것만 선택적으로 가능
    showContextMenu(event) {
      event.preventDefault();
      this.x = event.clientX;
      this.y = event.clientY;
      this.showMenu = true;
    },
    comma,
  },
};
</script>

<style lang="scss" scoped></style>
