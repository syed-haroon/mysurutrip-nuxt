<template>
  <div>
    <main-navigation v-if="shouldShowNavigation" />
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
    <app-footer v-if="shouldShowNavigation" />
    <ui-toaster />
  </div>
</template>

<script setup lang="ts">
import 'vue-sonner/style.css';

const route = useRoute();
const shouldShowNavigation = ref(true);

if (route.path === '/coming-soon') {
  shouldShowNavigation.value = false;
}
</script>
