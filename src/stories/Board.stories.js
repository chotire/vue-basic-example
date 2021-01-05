import { WorkBoard } from '../components/OKR';

export default {
  title: 'OKR/Board',
  component: WorkBoard,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WorkBoard },
  template: '<work-board :items="items" item-key="workId" v-bind="$props" />',
});

export const Items = Template.bind({});
WorkBoard.args = {
  items: [],
};
