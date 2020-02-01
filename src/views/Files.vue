<template lang="pug">
div
  h4 All files in comments
  ul
    li(v-for="(image, index) of getCommentFiles" :key="index") {{image}}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { Comment } from '@/types';

@Component
export default class Files extends Vue {
@Getter getCommentFiles!: Comment[];
}
</script>

<style lang="less" scoped>

</style>
