<template>
  <div class="content-wrapper">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style>
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