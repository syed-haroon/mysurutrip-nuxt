export const useSearchFilters = () => {
  // Mobile filter state
  const isMobileFiltersOpen = ref(false);

  // Toggle mobile filters
  const toggleMobileFilters = () => {
    isMobileFiltersOpen.value = !isMobileFiltersOpen.value;
  };

  // Check if filter has a value (not default)
  const hasFilterValue = (value: string, defaultValue: string) => {
    return value !== defaultValue;
  };

  // Get filter badge color based on filter type
  const getFilterBadgeColor = (filterType: string) => {
    const colors = {
      search: 'bg-blue-100 text-blue-800',
      category: 'bg-green-100 text-green-800',
      dynamic: 'bg-purple-100 text-purple-800',
      rating: 'bg-yellow-100 text-yellow-800',
    };
    return colors[filterType as keyof typeof colors] || colors.dynamic;
  };

  // Get filter icon based on filter type
  const getFilterIcon = (filterType: string) => {
    const icons = {
      search: 'lucide:search',
      category: 'lucide:tag',
      dynamic: 'lucide:clock',
      rating: 'lucide:star',
    };
    return icons[filterType as keyof typeof icons] || icons.dynamic;
  };

  return {
    isMobileFiltersOpen,
    toggleMobileFilters,
    hasFilterValue,
    getFilterBadgeColor,
    getFilterIcon,
  };
};
