<template lang="pug">
  div.main-wrapper
    Header
    Navigation
    MainContent
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Header from '@/content/Header.vue';
import Navigation from '@/content/Navigation.vue';
import MainContent from '@/content/MainContent.vue';

@Component({
  components: {
    Header,
    Navigation,
    MainContent,
  },
})
export default class Content extends Vue {}
</script>

<style scoped>
.main-wrapper {
  flex-grow: 1;
  /* min-width: 900px; */
  display: flex;
  flex-direction: column;
}
</style>
