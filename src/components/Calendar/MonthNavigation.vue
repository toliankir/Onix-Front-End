<template lang="pug">
div
  span.link(@click="$emit('setMonth', prevMonth)") <<<{{getMonthName(prevMonth.getMonth())}}
  span {{getMonthName(date.getMonth())}}
  span.link(@click="$emit('setMonth', nextMonth)") {{getMonthName(nextMonth.getMonth())}}>>>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class MonthNavigation extends Vue {
  @Prop() date!:Date;

  get prevMonth():Date {
    return new Date(this.date.getFullYear(), this.date.getMonth() - 1);
  }

  get nextMonth():Date {
    return new Date(this.date.getFullYear(), this.date.getMonth() + 1);
  }

  getMonthName = (index: number): string => ['January', 'February', 'March',
    'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][index];
}
</script>

<style lang="less" scoped>
div {
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 13px;
    & span {
        margin: 10px;
        &.link {
            cursor: pointer;
        }
    }
}
</style>
