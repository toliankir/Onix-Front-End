<template>
  <nav class="aside-nav aside-padding">
    <p>MENU</p>
    <a href="#">Home</a>
    <a href="#">My Tasks</a>
    <a href="#">
      Notifications
      <span id="notify">3</span>
    </a>
  </nav>
</template>

<style scoped>
.aside-nav {
  display: flex;
  flex-direction: column;
}
.aside-nav p {
  margin: 8px 0;
  color: #9b9b9b;
  font-size: 12px;
  line-height: 22px;
}
.aside-nav a {
  margin: 8px 0;
  color: #ffffff;
  font-size: 14px;
  line-height: 22px;
  text-decoration: none;
}
.aside-nav a span {
  display: inline-block;
  margin-left: 9px;
  font-size: 13px;
  line-height: 20px;
  color: #000000;
  background-color: #ffc200;
  height: 20px;
  width: 20px;
  text-indent: -1px;
  text-align: center;
  border-radius: 50%;
}
</style>