<template>
  <div class="main-wrapper">
    <Header />
    <Navigation />
    <MainContent />
  </div>
</template>

<script>
import Header from "@/content/Header.vue";
import Navigation from "@/content/Navigation.vue";
import MainContent from "@/content/MainContent.vue"

export default {
  name: "Content",
  components: {
    Header,
    Navigation,
    MainContent
  }
};
</script>

<style scoped>
.main-wrapper {
  flex-grow: 1;
  min-width: 900px;
  display: flex;  
  flex-direction: column;
}
</style>