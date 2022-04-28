<template>
  <div class="user" v-if="user">
    <el-avatar class="avatar" :src="user.profile.avatar" />
    <span>{{ user.profile.trueName || user.profile.nickName }}</span>
    <span class="space"></span>
    <el-button type="text" @click="handleLogout">登出</el-button>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "./store";

const store = useStore();
const user = computed(() => store.state.auth.user);

const handleLogout = () => {
  store.dispatch("auth/logout");
  chrome.storage.local.clear();
};
</script>
<style scoped>
.user {
  display: flex;
  align-items: center;
  height: 55px;
  padding: 0 15px;
}
.avatar {
  margin-right: 15px;
}
.space {
  flex: 1;
}
</style>
