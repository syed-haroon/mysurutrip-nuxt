import { defineStore } from 'pinia';

export const useSiteStore = defineStore('site', () => {
  // Simple toggle for coming soon mode
  const showComingSoon = ref(false); // Set to true to show coming soon page

  // Toggle for activities pages
  const showActivities = ref(false); // Set to true to show activities pages

  // Admin authentication
  const isAdmin = ref(false);
  const adminPassword = 'iAmAdmin!'; // Static admin password

  // QuoteSheet state
  const isQuoteSheetOpen = ref(false);

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

  // Admin authentication methods
  const authenticateAdmin = (password: string) => {
    if (password === adminPassword) {
      isAdmin.value = true;
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    isAdmin.value = false;
  };

  // QuoteSheet methods
  const openQuoteSheet = () => {
    isQuoteSheetOpen.value = true;
  };

  const closeQuoteSheet = () => {
    isQuoteSheetOpen.value = false;
  };

  const toggleQuoteSheet = () => {
    isQuoteSheetOpen.value = !isQuoteSheetOpen.value;
  };

  const checkAdminFromUrl = () => {
    // Check if admin password is in URL params
    if (import.meta.client) {
      const urlParams = new URLSearchParams(window.location.search);
      const pass = urlParams.get('pass');
      if (pass === adminPassword) {
        isAdmin.value = true;
        // Remove password from URL for security
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('pass');
        window.history.replaceState({}, '', newUrl.toString());
      }
    }
  };

  return {
    showComingSoon,
    toggleComingSoon,
    setComingSoon,
    showActivities,
    toggleActivities,
    setActivities,
    isAdmin,
    authenticateAdmin,
    logoutAdmin,
    checkAdminFromUrl,
    isQuoteSheetOpen,
    openQuoteSheet,
    closeQuoteSheet,
    toggleQuoteSheet,
  };
});
