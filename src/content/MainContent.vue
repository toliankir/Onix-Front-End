<template>
  <div class="content-wrapper">
    <div class="container">
      <h4>TODAY</h4>
      <Article v-for="(article, index) of articles" :article="article" :key="index" />
    </div>
  </div>
</template>

<script>
import Article from "@/content/Article.vue"

export default {
  data() {
    return {
      articles: [
        {
          data:
            "Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users",
          comments: [],
          images: [],
          date: "22:12"
        },
        {
          data:
            "Emelee Simchenko commented on Account for teams and personal in bottom style",
          comments: [
            "During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes"
          ],
          images: [],
          date: "7:32 PM"
        },
        {
          data:
            "Driaka Samak uploaded 4 files on An option to search in current projects or in all projects",
          comments: [],
          images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
          date: "6:02 PM"
        }
      ]
    };
  },
  components: {
      Article
  }
};
</script>

<style scoped>
.content-wrapper {
  background-color: #eeebe5;
  flex-grow: 1;
  padding: 30px 0;
}
.container {
  background-color: white;
  width: 62%;
  margin: auto;
  padding: 35px 30px 60px 30px;
  border-radius: 8px;
}
.container h4 {
  margin: 0 0 32px 0;
  font-size: 14px;
  font-weight: normal;
}
</style>