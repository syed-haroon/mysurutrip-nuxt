import { defineStore } from 'pinia';

export const useSiteStore = defineStore('site', () => {
  // Simple toggle for coming soon mode
  const showComingSoon = ref(false); // Set to true to show coming soon page

  // Toggle for activities pages
  const showActivities = ref(false); // Set to true to show activities pages

  const toggleComingSoon = () => {
    showComingSoon.value = !showComingSoon.value;
  };

  const setComingSoon = (value: boolean) => {
    showComingSoon.value = value;
  };

  const toggleActivities = () => {
    showActivities.value = !showActivities.value;
  };

  const setActivities = (value: boolean) => {
    showActivities.value = value;
  };

  return {
    showComingSoon: readonly(showComingSoon),
    toggleComingSoon,
    setComingSoon,
    showActivities: readonly(showActivities),
    toggleActivities,
    setActivities,
  };
});
