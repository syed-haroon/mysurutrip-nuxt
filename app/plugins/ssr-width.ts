// Some components require a ssrWidth to be set through VueUse to avoid Hydration errors on mobile.
import { provideSSRWidth } from '@vueuse/core';

export default defineNuxtPlugin((nuxtApp) => {
  provideSSRWidth(1024, nuxtApp.vueApp);
});
