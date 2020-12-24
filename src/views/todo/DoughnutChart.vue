<script>
import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  mounted() {
    this.renderChart(
      {
        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
        datasets: [
          {
            backgroundColor: ['#3b9b73', '#bd5a4b', '#07b5d6', '#834f9c'],
            borderWidth: 0,
            data: [40, 20, 80, 10],
            label: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
          },
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Modern JavaScript Popularity',
        },
        legend: {
          position: 'bottom',
        },
      },
    );
  },
};
</script>

<style lang="scss" scoped></style>
