export default defineNuxtRouteMiddleware((to) => {
  const siteStore = useSiteStore();

  // If coming soon mode is enabled and not already on coming soon page
  if (siteStore.showComingSoon && to.path !== '/coming-soon') {
    return navigateTo('/coming-soon');
  }

  // If coming soon mode is disabled and on coming soon page, redirect to home
  if (!siteStore.showComingSoon && to.path === '/coming-soon') {
    return navigateTo('/');
  }

  // If activities are disabled and trying to access activities pages, redirect to home
  if (!siteStore.showActivities && to.path.startsWith('/activities')) {
    return navigateTo('/');
  }
});
