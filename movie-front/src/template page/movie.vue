<template>
  <div>
    <header-nav></header-nav>
      	<router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import headerNav from "@/components/header-nav";
export default {
  components: {
    headerNav,
  },
};
</script>

<style scoped>
</style>