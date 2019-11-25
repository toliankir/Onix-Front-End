<template lang="pug">
  div.aside-profile.aside-padding
    div.user-card
      img(:src="'./assets/photos/' + userProfile.image" alt="User photo")
      div.user-data
        p.user-name {{userProfile.name}}
        p.user-state {{userProfile.group}}
    div.user-details
      button
        span.dots
</template>

<script>
export default {
  data() {
    return {
      userProfile: {
        name: "Jean Gonzales",
        group: "Product Owner",
        image: "1.jpg"
      }
    }
  }
}
</script>

<style scoped>
.aside-profile {
  padding-right: 10px;
  background-color: #202020;
  display: flex;
  align-items: center;
  height: 80px;
  justify-content: space-between;
}
.aside-profile .user-details {
  margin-right: -8px;
}
.aside-profile .user-details button {
  height: 40px;
  min-width: 40px;
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 20px;
  outline: none;
  padding: 0;
  margin: 0;
}
.aside-profile .user-card {
  display: flex;
}
.aside-profile .user-card img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 16px;
}
.aside-profile .user-card .user-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.aside-profile .user-card .user-data .user-name {
  color: #ffffff;
  font-size: 14px;
  margin: 0;
}
.aside-profile .user-card .user-data .user-state {
  color: #9b9b9b;
  font-size: 12px;
  margin: 2px 0 0 0;
}
</style>