<template>
  <div>
    <main-navigation v-if="shouldShowNavigation" />
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
    <app-footer v-if="shouldShowNavigation" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const shouldShowNavigation = ref(true);

if (route.path === '/coming-soon') {
  shouldShowNavigation.value = false;
}
</script>
