<template>
  <v-data-table v-bind="dataTableOptions" :items="nodes" :item-key="itemKey" class="elevation-0 content">
    <template v-slot:top>
      <slot name="top" v-bind="{ nodes, headers }"></slot>
    </template>
    <template v-slot:item="{ item: node, headers }">
      <slot name="item" v-bind="{ node, headers }">
        <!-- eslint-disable-next-line prettier/prettier -->
        <tr 
          v-show="showNode(node)" 
          :class="{ 'v-data-table__selected': node._selected }" 
          @click="onClickRow($event, node)" 
          @click.right.prevent="onClickRowRight($event, node)"
        >
          <td v-for="(header, index) in headers" :key="index" :class="`text-${header.align ? header.align : 'start'}`">
            <span v-if="header.expandable">
              <span :style="nodeStyle(node)"></span>
              <expandable-btn :node="node" @click="toggleNode"></expandable-btn>
            </span>
            <slot :name="`item.${header.value}`" v-bind="{ item: node, headers, value: node[header.value] }">
              {{ node[header.value] }}
            </slot>
          </td>
        </tr>
      </slot>
    </template>
    <template v-slot:footer>
      <slot name="footer" v-bind="{ nodes, headers }"></slot>
    </template>
  </v-data-table>
</template>

<script>
/**
 * 속성 중 Underscore(_) prefix가 붙은 것은 내부적으로 새롭게 추가한 속성으로
 * 사용자가 props으로 넘겨준 데이터의 속성 이름과 중복을 피하고
 * 또 Tree의 속성인지 사용자 데이터 속성인지 구분하기 위한 것임.
 *
 * TreeDataTable에 적용되어야하는 VDataTable의 속성들(fixedHeader, dense, disablePagination)은
 * 기본적으로 props의 정의하여 VDataTable에 적용될 수 있도록 했다.
 * 더불어 click:row, contextmenu:row 의 이벤트도 대응될 수 있도록 구현되어있다.
 * 추후 더 많은 속성 및 이벤트가 필요할 경우 그때 그때 추가하도록한다.
 */
import { flattenDeep, merge, cloneDeep } from 'lodash';
import ExpandableBtn from './ExpandableBtn';

export default {
  name: 'TreeDataTable',
  components: {
    ExpandableBtn,
  },
  props: {
    // VDataTable options
    headers: Array,
    items: Array,
    itemKey: String,
    height: [Number, String],
    fixedHeader: Boolean,
    dense: Boolean,
    disablePagination: Boolean,
    hideDefaultFooter: Boolean,
    singleSelect: Boolean,
    loading: Boolean,
    itemsPerPage: [Number, String],

    // TreeDataTable options
    openAll: Boolean,
  },
  data() {
    return {
      nodes: [],
    };
  },
  computed: {
    dataTableOptions() {
      const options = merge({}, this.$props);
      // delete options.headers;
      delete options.openAll;
      return options;
    },
  },
  watch: {
    items: {
      immediate: true,
      handler(value) {
        this.nodes = this.flattenNodes(cloneDeep(value));
      },
    },
    openAll: {
      immediate: true,
      handler(value) {
        this.expandAll(value);
      },
    },
  },
  methods: {
    flattenNodes(nodes) {
      let flattenNodes = [];
      nodes.forEach(node => {
        node._depth = 1;
        this.$set(node, '_showed', false);
        this.$set(node, '_expanded', false);
        flattenNodes.push(node);
        flattenNodes.push(this.flattenNode(node));
      });
      return flattenDeep(flattenNodes);
    },
    flattenNode(node, children = []) {
      if (node.children) {
        children = children.concat(node.children);
        node.children.forEach(child => {
          child._parentNode = node;
          child._depth = node._depth + 1;
          this.$set(child, '_showed', false);
          this.$set(child, '_expanded', false);
          children.splice(children.indexOf(child) + 1, 0, this.flattenNode(child));
        });
      }
      return flattenDeep(children);
    },
    showNode(node) {
      if (!node._parentNode) {
        return true;
      } else if (node._parentNode._expanded) {
        return true;
      } else {
        return false;
      }
    },
    nodeStyle(node) {
      return {
        paddingLeft: `${node._depth > 1 ? node._depth * 15 : 0}px`,
      };
    },
    expandAll(expanded) {
      this.nodes.forEach(node => {
        node._showed = expanded;
        node._expanded = expanded;
        if (expanded && !node._opened) {
          node._opened = true;
        }
      });
    },
    toggleNode(node, { loading }) {
      node._showed = !node._expanded;
      node._expanded = !node._expanded;
      if (node._expanded) {
        this.expandChildren(node);
      } else {
        this.collapseChildren(node);
      }

      const vm = this;
      this.$emit('click:expand', this.createItemFromNode(node), {
        opened: node._opened,
        expanded: node._expanded,
        loading,
        add(nodes) {
          const addNode = (newNode, parentNode) => {
            vm.$set(newNode, '_showed', false);
            vm.$set(newNode, '_expanded', false);
            newNode._depth = parentNode._depth + 1;
            newNode._parentNode = parentNode;
            parentNode.children = parentNode.children ? parentNode.children.concat(newNode) : [newNode];

            const index = vm.nodes.indexOf(parentNode);
            vm.nodes.splice(index + 1, 0, newNode);
            if (newNode.children && newNode.children.length > 0) {
              for (const child of newNode.children) {
                addNode(child, newNode);
              }
            }
          };

          const newNodes = Array.isArray(nodes) ? nodes : [nodes];
          for (const newNode of newNodes) {
            addNode(newNode, node);
          }
        },
        remove(node) {
          console.log(node);
          const index = vm.getNodeIndex(node);
          vm.nodes.splice(index, 1);
        },
        update(node) {
          const index = vm.getNodeIndex(node);
          vm.nodes.splice(index, 1, merge(vm.nodes[index], node));
        },
      });

      // 컴포넌트를 사용하는 곳에서 트리를 오픈할 때 이미 한 번 오픈한 Node인지 식별하기 위한 설정 값
      // 보통 비동기 통신에서 한 번만 데이터를 가져오기 위해 사용됨
      if (!node._opened && node._expanded) {
        node._opened = true;
      }
    },
    expandChildren(node) {
      const vm = this;
      node._expanded = node._parentNode ? node._showed && node._parentNode._expanded : node._showed;
      if (node.children) {
        node.children.forEach(child => {
          vm.expandChildren(child);
        });
      }
    },
    collapseChildren(node) {
      const vm = this;
      node._expanded = false;
      if (node.children) {
        node.children.forEach(child => {
          vm.collapseChildren(child);
        });
      }
    },
    onClickRow(e, node) {
      const tagName = e.target.tagName;
      if (tagName === 'I' || tagName === 'BUTTON') {
        return;
      }
      this.emit('click:row', node, node);
    },
    onClickRowRight(e, node) {
      this.emit('contextmenu:row', node, e);
    },
    emit(name, node, arg) {
      const vm = this;
      this.$emit(name, arg, {
        headers: this.headers,
        opened: node._opened,
        expanded: node._expanded,
        selected: node._selected,
        item: this.createItemFromNode(node),
        select(value) {
          vm.$set(node, '_selected', value);
          if (value && vm.singleSelect) {
            const selectedIndex = vm.nodes.indexOf(node);
            vm.nodes.forEach((n, index) => {
              if (index !== selectedIndex) {
                if (n._selected) {
                  n._selected = false;
                  return false;
                }
              }
            });
          }
        },
      });
    },
    getNodeIndex(node) {
      return this.nodes.findIndex(elem => elem[this.itemKey] === node[this.itemKey]);
    },
    createItemFromNode(node) {
      const item = merge({}, node);
      delete item._selected;
      delete item._showed;
      delete item._expanded;
      delete item._depth;
      delete item._opened;
      return item;
    },
  },
};
</script>

<style lang="scss" scoped>
table > tbody > tr > td {
  border-bottom: none !important;
}
// tbody {
//   tr:hover {
//     background-color: transparent !important;
//   }
// }
</style>
