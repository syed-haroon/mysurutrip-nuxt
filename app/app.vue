<template>
  <div>
    <main-navigation v-if="shouldShowNavigation" />
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
    <app-footer v-if="shouldShowNavigation" />
    <admin-access-panel />
  </div>
</template>

<script setup lang="ts">
const { shouldShowComingSoon } = useAccessControl();

// Hide navigation and footer when showing coming soon page
const shouldShowNavigation = computed(() => {
  return !shouldShowComingSoon.value;
});
</script>
