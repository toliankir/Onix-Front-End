<template>
  <header>
    <div class="header-title">
      <div class="logo"></div>
      <h1>Website Redesign</h1>
      <button class="btn btn-grey">
        <span class="dots"></span>
      </button>
    </div>
    <div class="header-controls">
      <img
        v-for="(user, index) of users"
        :key="index"
        :src="'./assets/photos/' + user.image"
        :alt="'User ' + user.name + ' photo'"
      />

      <button class="btn btn-grey margin-v-15">Share</button>
      <button class="btn btn-yellow">
        <img src="/assets/Combined Shape@1x.svg" alt="Button icon" />Chat
      </button>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { name: "1", image: "2.jpg" },
        { name: "1", image: "3.jpg" },
        { name: "1", image: "4.jpg" }
      ]
    };
  }
};
</script>

<style scoped>
header {
  padding: 40px 30px 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header .header-title {
  padding-left: 2.5rem;
  display: flex;
  align-items: center;
}

header .header-title .logo {
  background-color: #ffc200;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-size: 102% 102%;
  background-position: -1px -1px;
  background-image: url("/assets/Shapes@2x.png");
}

header .header-title h1 {
  font-weight: normal;
  margin: 0 11px 0 15px;
  font-size: 32px;
}

header .header-controls {
  display: flex;
}

header .header-controls > img {
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
  cursor: pointer;
}
</style>