<template>
  <div>
    <span
      ><el-button type="primary" @click="handleClick">Primary</el-button></span
    >
  </div>
</template>
<script setup lang="ts">
const handleClick = () => {
  alert("aaa");
};
</script>
<style scoped></style>
