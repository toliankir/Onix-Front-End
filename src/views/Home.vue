<template lang="pug">
  div
    h4 TODAY
    Article(v-for="(article, index) of getArticles" :article="article" :key="index")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import Article from '@/content/Article.vue';
import { Comment } from '@/types';

@Component({
  components: {
    Article,
  },
})
export default class Home extends Vue {
@Getter getArticles!: Comment[];
}
</script>
