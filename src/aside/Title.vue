<template>
  <div class="aside-title aside-padding">
    <h2>PROJECTUS</h2>
    <button>
      <img src="@/assets/Search@3x.svg" alt="Aside logo" />
    </button>
  </div>
</template>

<style scoped>
.aside-title {
  margin: 30px 0;
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
}
.aside-title h2 {
  color: #ffffff;
  margin: 0 0 0 32px;
  font-size: 16px;
}
.aside-title h2::before {
  position: absolute;
  width: 40px;
  height: 100%;
  content: "";
  background: url(../assets/Logo@3x.svg) no-repeat;
  background-size: 24px;
  left: -32px;
}
.aside-title button {
  cursor: pointer;
  background-color: #000000;
  border: none;
  outline: none;
}
.aside-title button img {
  width: 16px;
}
</style>