export default defineNuxtRouteMiddleware((to) => {
  const route = useRoute();
  const config = useRuntimeConfig();

  // Get environment and access control settings
  const isProduction = config.public.isProduction;
  const isDevelopment = config.public.isDevelopment;
  const adminSecret = config.public.adminSecret;

  // Check for admin access via query parameter
  const hasAdminAccess = route.query.view === 'admin' && route.query.secret === adminSecret;

  // Check for guest access via query parameter
  const hasGuestAccess = route.query.view === 'guest';

  // Access control logic
  if (isProduction) {
    // Production: Show coming soon unless admin access
    if (!hasAdminAccess && to.path !== '/coming-soon') {
      return navigateTo('/coming-soon');
    }
  }
  else if (isDevelopment) {
    // Development: Show normal site unless guest access
    if (hasGuestAccess && to.path !== '/coming-soon') {
      return navigateTo('/coming-soon');
    }
  }

  // If trying to access coming-soon page but should see normal site
  if (to.path === '/coming-soon') {
    if (isProduction && hasAdminAccess) {
      return navigateTo('/');
    }
    else if (isDevelopment && !hasGuestAccess) {
      return navigateTo('/');
    }
  }
});
