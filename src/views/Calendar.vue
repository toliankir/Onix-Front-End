<template lang="pug">
div
  h4 Calendar
  MonthNavigation(:date="date" @setMonth="setMonth")
  table
    thead
      tr
        td Mon
        td Tue
        td Wen
        td Thu
        td Fri
        td Sat
        td Sun
    tr(v-for="week in 6" :key="week")
      day(
        v-for="day in 7"
        :comment="comment"
        @showComment="showComment"
        :key="day"
        :date="monthTS[((week - 1) * 7) + day - 1]"
        :month="date.getMonth()"
      )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Day from '@/components/Calendar/Day.vue';
import MonthNavigation from '@/components/Calendar/MonthNavigation.vue';

@Component({
  components: {
    Day,
    MonthNavigation,
  },
})
export default class Calendar extends Vue {
  monthTS: number[] = [];

  date = new Date((new Date()).getFullYear(), (new Date()).getMonth());

  comment = -1;

  showComment(id: number) {
    this.comment = id;
  }

  setMonth(date: Date) {
    this.date = date;
    this.buildMonth();
  }

  buildMonth() {
    const d = new Date(this.date);
    d.setDate(d.getDate() - (d.getDay() !== 0 ? d.getDay() - 1 : 6));
    this.monthTS = [];
    this.monthTS.push(Math.trunc(d.getTime() / 1000));
    for (let dayPrePage = 1; dayPrePage < 6 * 7; dayPrePage += 1) {
      d.setDate(d.getDate() + 1);
      this.monthTS.push(Math.trunc(d.getTime() / 1000));
    }
  }

  mounted() {
    this.buildMonth();
  }
}
</script>

<style lang="less" scoped>
@import "../constants.less";

table {
  width: 100%;
  border-spacing: 7px;
  & thead {
    & td {
      font-size: 13px;
      text-align: center;
      font-weight: bold;
      background-color: @task-item-blue;
      padding: 4px 0;
      border-radius: 5px;
      box-shadow: 0px 3px 6px 1px rgba(0,0,0,0.1);
    }
  }
}
</style>
