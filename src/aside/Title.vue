<template lang="pug">
  div.aside-title.aside-padding
    router-link(to="/") PROJECTUS
    button
      img(src="/assets/Search@3x.svg" alt="Aside logo")
</template>

<style lang="less" scoped>
@import "../constants.less";

.aside-title {
  margin: 30px 0;
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
}
.aside-title a {
  color: @aside-main-text-main-color;
  margin: 0 0 0 32px;
  font-size: 16px;
  text-decoration: none;
}
.aside-title a::before {
  position: absolute;
  width: 40px;
  height: 100%;
  content: "";
  background: url(/assets/Logo@3x.svg) no-repeat;
  background-size: 24px;
  top: -2px;
  left: -32px;
}
.aside-title button {
  cursor: pointer;
  background-color: @aside-background-color;
  border: none;
  outline: none;
}
.aside-title button img {
  width: 16px;
}
</style>