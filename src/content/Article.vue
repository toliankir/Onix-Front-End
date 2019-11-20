<template>
  <section
    class="icon icon-download"
    :class="[getIconColorClass(article.icon), getIconTypeClass(article.icon)]"
  >
    <div class="content">
      <p>{{article.data}}</p>
      <div v-if="article.images.length !== 0" class="images">
        <img
          v-for="(image, index) of article.images"
          :key="index"
          :src="'./assets/content-images/'+image"
          alt="Content image"
        />
      </div>
      <div v-if="article.comments.length !== 0" class="coment">
        <p v-for="(comment, index) of article.comments" :key="index">{{comment}}</p>
      </div>
    </div>
    <div class="time">{{article.date}}</div>
  </section>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    getIconColorClass(iconObj) {
      switch (iconObj.color) {
        case "blue":
          return "icon-blue";
        case "yellow":
          return "icon-yellow";
        case "green":
          return "icon-green";
      }
    },
    getIconTypeClass(iconObj) {
      switch (iconObj.type) {
        case "download":
          return "icon-download";
        case "ok":
          return "icon-ok";
        case "comment":
          return "icon-comment";
      }
    }
  }
};
</script>
<style scoped>
section {
  min-height: 30px;
  margin-left: 40px;
  margin-bottom: 30px;
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
}
section .time {
  min-width: 80px;
  font-size: 14px;
}
section .content > p {
  margin: 0;
  font-size: 16px;
  line-height: 18px;
  width: 65%;
  min-height: 40px;
  display: flex;
  align-items: center;
}
section .content div.coment {
  margin: 20px 0 0 0;
  background-color: #eeebe5;
  width: 100%;
  padding: 20px 30px;
  border-radius: 10px;
}
section .content div.coment p:first-child {
  margin: 0;
}
section .content div.coment p {
  margin-top: 15px;
  font-size: 15px;
  line-height: 20px;
}
section .content .images {
  width: 100%;
  margin-top: 20px;
}
section .content .images img {
  float: left;
  width: 100px;
  margin: 0 10px 10px 0;
  border-radius: 8px;
}
.icon::before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  position: absolute;
  color: #3d3a2c;
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
  content: url(/assets/Icon@3x.svg);
}
.icon-yellow::before {
  background-color: #fff8dd;
}
.icon-green::before {
  background-color: #cef9c6;
}
.icon-blue::before {
  background-color: #e3efff;
}
</style>