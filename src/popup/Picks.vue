<template>
  <div class="picks">
    <UserInfo />
    <div class="content"></div>
  </div>
</template>
<script setup lang="ts">
import UserInfo from "./UserInfo.vue";
</script>
<style scoped>
.picks {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  overflow: auto;
  background-image: url(/icons/logo.svg);
  background-size: 88%;
  background-position: center;
	background-repeat: no-repeat;
}
</style>
