<template lang="pug">
 div.filter-bar
   span.search Search:
   input(v-model="titleFilter")
   v-date-picker(
     mode="range"
     v-model="dateRange"
     :popover="{placement: 'bottom', visibility: 'click'}"
     )
     i.far.fa-calendar-alt.calendar-icon(:class="{'datesetted' : dateRange}")
   i.fas.fa-times.calendar-icon(
     @click="resetDateRange"
     :class="{'datesetted' : !dateRange}"
   )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Mutation, Getter } from 'vuex-class';

@Component
export default class FilterBar extends Vue {
  @Mutation setTitleFilter: any;

  @Mutation setDateRange: any;

  @Getter getDateRange!: any;

  @Getter getTitleFilter!: string;

  get titleFilter(): string {
    return this.getTitleFilter;
  }

  set titleFilter(data) {
    this.setTitleFilter(data);
  }

  get dateRange(): any {
    return this.getDateRange;
  }

  set dateRange(data) {
    this.setDateRange(data);
  }

  resetDateRange() {
    this.setDateRange(null);
  }
}
</script>

<style lang="less" scoped>
@import "../../constants.less";

.filter-bar {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  margin: auto;
  width: 50%;
  & input {
    flex-grow: 1;
    width: 100%;
    border: 1px solid @nav-active-line-color;
    border-radius: 5px;
    padding: 1px 3px;
    outline: none;
    margin-right: 10px;
  }
  & .calendar-icon {
    font-size: 22px;
    color: @nav-active-line-color;
    margin: 0 5px;
    cursor: pointer;
    }
  & .datesetted {
    color: @task-item-red;
  }
  &>.search {
    margin-right: 3px;
    font-weight: bold;
    @media @sm {
      display: none;
    }
  }
}
</style>
