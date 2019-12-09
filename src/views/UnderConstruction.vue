<template lang="pug">
div
  h1 Under construction "{{linkDescription}}"
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class UnderConstruction extends Vue {
@Prop() linkDescription!: string;
}
</script>

<style scoped>
h1 {
  text-align: center;
  width: 100%;
}
</style>
