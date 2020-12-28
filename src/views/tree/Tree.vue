<template>
  <div>
    <tree-table v-model="tree" :headers="headers" :open="initiallyOpen" :items="items" item-key="name" activatable open-on-click>
      <template v-slot:prepend="{ item, open }">
        <v-icon v-if="!item.file">
          {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>
        <v-icon v-else>
          {{ files[item.file] }}
        </v-icon>
      </template>
    </tree-table>
  </div>
</template>

<script>
import TreeTable from '@/components/TreeTable';

export default {
  components: {
    TreeTable,
  },
  data() {
    return {
      headers: [
        { text: 'Department Name', value: 'name', width: '35%' },
        { text: 'Department Head', value: 'head', width: '35%' },
        { text: 'Enabled?', value: 'enabled', width: '15%' },
        { text: 'Actions', value: 'actions', width: '15%' },
      ],
      initiallyOpen: ['Quality', 'Engineering'],
      tree: [],
      items: [
        {
          name: 'Marketing',
          head: 'chotire',
          enabled: true,
        },
        {
          name: 'Sales',
          enabled: true,
        },
        {
          name: 'Quality',
          children: [
            {
              name: 'Engineering',
              children: [
                {
                  name: 'OKR',
                  head: 'CHO YongSang',
                  enabled: true,
                },
              ],
            },
            {
              name: 'SDCIT',
              head: 'LEE DeaJin',
              enabled: true,
            },
            {
              name: 'Hanwha System',
              head: 'KIM HyoungTea',
              enabled: true,
            },
          ],
        },
        {
          name: 'Manufacturing',
          enabled: true,
        },
        {
          name: 'Corporate',
          enabled: true,
        },
        {
          name: 'R&D',
          enabled: true,
        },
        {
          name: 'Customer Service',
          file: 'md',
          enabled: true,
        },
        {
          name: 'Human Resource',
          enabled: true,
        },
        {
          name: 'Shared Service',
          enabled: true,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
