<template lang="pug">
  div.content-wrapper
    div.container
      router-view
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class MainContent extends Vue {}
</script>

<style lang="less">
@import "../constants.less";

.content-wrapper {
  background-color: @main-content-background-color;
  flex-grow: 1;
  padding: 30px 0;
  width: 100%;
}
.container {
  background-color: white;
  width: 62%;
  margin: auto;
  padding: 35px 30px 60px 30px;
  @media @md {
    width: 95%;
  }
  @media @sm {
    width: 95%;
    padding: 15px 5px 20px 5px;
  }
  border-radius: 8px;
}
.container h4 {
  margin: 0 0 32px 0;
  font-size: 14px;
  font-weight: normal;
}
</style>
