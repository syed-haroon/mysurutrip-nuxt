export const useAccessControl = () => {
  const route = useRoute();
  const config = useRuntimeConfig();

  // Environment checks
  const isProduction = computed(() => config.public.isProduction);
  const isDevelopment = computed(() => config.public.isDevelopment);

  // Access checks
  const hasAdminAccess = computed(() => {
    return route.query.view === 'admin' && route.query.secret === config.public.adminSecret;
  });

  const hasGuestAccess = computed(() => {
    return route.query.view === 'guest';
  });

  // Access level determination
  const accessLevel = computed(() => {
    if (hasAdminAccess.value) return 'admin';
    if (hasGuestAccess.value) return 'guest';
    return 'normal';
  });

  // Should show coming soon page
  const shouldShowComingSoon = computed(() => {
    if (isProduction.value) {
      return !hasAdminAccess.value;
    }
    else if (isDevelopment.value) {
      return hasGuestAccess.value;
    }
    return false;
  });

  // Should show normal site
  const shouldShowNormalSite = computed(() => {
    return !shouldShowComingSoon.value;
  });

  // Generate admin access URL
  const getAdminAccessUrl = (path: string = '/') => {
    const url = new URL(path, window.location.origin);
    url.searchParams.set('view', 'admin');
    url.searchParams.set('secret', config.public.adminSecret);
    return url.toString();
  };

  // Generate guest access URL
  const getGuestAccessUrl = (path: string = '/coming-soon') => {
    const url = new URL(path, window.location.origin);
    url.searchParams.set('view', 'guest');
    return url.toString();
  };

  // Clear access parameters
  const clearAccessParams = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('view');
    url.searchParams.delete('secret');
    return url.toString();
  };

  return {
    // Environment
    isProduction,
    isDevelopment,

    // Access
    hasAdminAccess,
    hasGuestAccess,
    accessLevel,

    // Display logic
    shouldShowComingSoon,
    shouldShowNormalSite,

    // URL helpers
    getAdminAccessUrl,
    getGuestAccessUrl,
    clearAccessParams,
  };
};
