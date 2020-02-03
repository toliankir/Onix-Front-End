<template lang="pug">
div
  h4 Calendar
  table
    tr(v-for="week in 6" :key="week")
      day(
        v-for="day in 7"
        :comment="comment"
        @showComment="showComment"
        :key="day"
        :date="monthTS[((week - 1) * 7) + day - 1]"
        :month="month"
      )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Day from '@/components/Day.vue';

@Component({
  components: {
    Day,
  },
})
export default class Calendar extends Vue {
  monthTS: number[] = [];

  month = 2;

  comment = -1;

  showComment(id: number) {
    this.comment = id;
  }

  mounted() {
    const year = 2020;
    const monthTS: number[] = [];
    const d = new Date(year, this.month - 1);
    d.setDate(d.getDate() - d.getDay() + 1);
    this.monthTS.push(Math.trunc(d.getTime() / 1000));
    for (let dayPrePage = 1; dayPrePage < 6 * 7; dayPrePage += 1) {
      d.setDate(d.getDate() + 1);
      this.monthTS.push(Math.trunc(d.getTime() / 1000));
    }
  }
}
</script>

<style lang="less" scoped>
table {
  width: 100%;
  border-spacing: 7px;
}
</style>
