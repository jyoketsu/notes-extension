<template>
  <div class="popup">
    <Picks v-if="user" />
    <Login v-else />
  </div>
</template>
<script setup lang="ts">
import { onMounted, computed, watch } from "vue";
import Login from "./Login.vue";
import { useStore } from "./store";
import Picks from "./Picks.vue";
import "element-plus/es/components/message/style/css";

const store = useStore();
const user = computed(() => store.state.auth.user);

onMounted(() => {
  if (!chrome || !chrome.storage) return;
  chrome.storage.local.get(["user"], function (result) {
    if (result.user) {
      store.dispatch("auth/setUser", result.user);
    }
  });
});

watch(user, (newVal) => {
  if (newVal) {
    chrome.storage.local.set({ user: newVal }, function () {});
  }
});
</script>
<style scoped>
.popup {
  width: 390px;
  height: 600px;
  background-color: #f7f7f7;
}
</style>
<style>
html,
body,
#app {
  margin: unset;
}
</style>
