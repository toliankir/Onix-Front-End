<template lang="pug">
div.comment_container.icon(:class="[getColor(article.icon), getType(article.icon)]")
  div.content
    p {{article.data}}
    div.images(v-if="article.images.length !== 0")
      img(v-for="(image, index) of article.images"
          :key="index"
          :src="'./assets/content-images/'+image"
          @click="setImageNotify(index)"
          alt="Content image")
    div.coment(v-if="article.comments.length !== 0")
      p(v-for="(comment, index) of article.comments" :key="index") {{comment}}
  div.time {{article.date}}
</template>

<script lang="ts">
import { Mutation } from 'vuex-class';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Article extends Vue {
@Prop() private article!: any;

@Mutation('setImageNotify') setImageNotify: any;

getColor = (iconObj: any) => {
  switch (iconObj.color) {
    case 'blue':
      return 'icon-blue';
    case 'yellow':
      return 'icon-yellow';
    case 'green':
      return 'icon-green';
    default:
      return 'icon-blue';
  }
}

getType = (iconObj: any) => {
  switch (iconObj.type) {
    case 'download':
      return 'icon-download';
    case 'ok':
      return 'icon-ok';
    case 'comment':
      return 'icon-comment';
    default:
      return 'icon-ok';
  }
}
}
</script>

<style lang="less" scoped>
@import "../constants.less";

.comment_container {
  min-height: 30px;
  margin-left: 40px;
  margin-bottom: 30px;
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
}
.time {
  min-width: 80px;
  font-size: 14px;
}
.content > p {
  margin: 0;
  font-size: 16px;
  line-height: 18px;
  width: 65%;
  min-height: 40px;
  display: flex;
  align-items: center;
}
.content div.coment {
  margin: 20px 0 0 0;
  background-color: @main-content-background-color;
  width: 100%;
  padding: 20px 30px;
  border-radius: 10px;
}
.content div.coment p:first-child {
  margin: 0;
}
.content div.coment p {
  margin-top: 15px;
  font-size: 15px;
  line-height: 20px;
}
.content .images {
  width: 100%;
  margin-top: 20px;
  cursor: pointer;
}
.content .images img {
  float: left;
  width: 100px;
  margin: 0 10px 10px 0;
  border-radius: 8px;
}
.icon::before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  position: absolute;
  color: @icon-content-color;
  top: 0;
  left: -40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-download::before {
  font-size: 12px;
  content: "\f019";
}
.icon-comment::before {
  font-size: 12px;
  font-weight: bold;
  content: "\f27a";
}
.icon-ok::before {
  content: url('~@/assets/Icon@3x.svg');
}
.icon-yellow::before {
  background-color: @icon-yellow-color;
}
.icon-green::before {
  background-color: @icon-green-color;
}
.icon-blue::before {
  background-color: @icon-blue-color;
}
</style>
