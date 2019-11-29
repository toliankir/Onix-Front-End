<template lang="pug">
  div
    h4 TODAY
    Article(v-for="(article, index) of articles" :article="article" :key="index")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Article from '@/content/Article.vue';
import { Comment } from '@/types';

@Component({
  components: {
    Article,
  },
})
export default class Home extends Vue {
private articles: Array<Comment> = [
  {
    data: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
    comments: [],
    images: [],
    date: '22:12',
    icon: { type: 'ok', color: 'green' },
  },
  {
    data: 'Emelee Simchenko commented on Account for teams and personal in bottom style',
    comments: [
      'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes',
    ],
    images: [],
    date: '7:32 PM',
    icon: { type: 'comment', color: 'yellow' },
  },
  {
    data: 'Driaka Samak uploaded 4 files on An option to search in current projects or in all projects',
    comments: [],
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
    date: '6:02 PM',
    icon: { type: 'download', color: 'blue' },
  },
];
}
</script>
