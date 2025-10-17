export const useFeatures = () => {
  // Comprehensive features list with icon mapping (deduplicated)
  const featuresMap = {
    // Architecture & Heritage
    'Heritage Architecture': 'lucide:building',
    'Traditional Architecture': 'lucide:building',
    'Modern Architecture': 'lucide:building-2',

    // Views & Location
    'Palace Views': 'lucide:crown',
    'Riverside Location': 'lucide:waves',
    'Garden View': 'lucide:trees',
    'City View': 'lucide:city',
    'Mountain View': 'lucide:mountain',
    'Central Location': 'lucide:map-pin',

    // Experience & Service
    'Home-stay Experience': 'lucide:home',
    'Personalized Service': 'lucide:user-check',
    'Traditional Hospitality': 'lucide:heart',
    'Cultural Experience': 'lucide:palette',
    'Cultural Immersion': 'lucide:globe',
    'Authentic Experience': 'lucide:star',

    // Activities & Entertainment
    'Cultural Shows': 'lucide:music',
    'Cultural Tours': 'lucide:compass',
    'Heritage Tours': 'lucide:landmark',
    'Nature Walks': 'lucide:hiking',
    'Adventure Activities': 'lucide:mountain',

    // Wellness & Treatments
    'Ayurvedic Treatments': 'lucide:leaf',
    'Wellness Programs': 'lucide:heart-pulse',
    'Spa Treatments': 'lucide:spa',
    'Yoga Classes': 'lucide:flower',

    // Dining & Cuisine
    'Local Cuisine': 'lucide:utensils',
    'Traditional Cuisine': 'lucide:chef-hat',
    'Fine Dining': 'lucide:wine',
    'Home-cooked Meals': 'lucide:home',
    'Cooking Classes': 'lucide:chef-hat',

    // Family & Accessibility
    'Family-friendly': 'lucide:users',
    'Kid-friendly': 'lucide:baby',
    'Pet-friendly': 'lucide:dog',
    'Eco-friendly': 'lucide:leaf',
    'Accessibility Features': 'lucide:wheelchair',

    // Technology & Modern Amenities
    'Modern Amenities': 'lucide:zap',
    'Smart Technology': 'lucide:smartphone',
    'High-speed Internet': 'lucide:wifi',
    'Digital Services': 'lucide:monitor',

    // Business & Events
    'Business Facilities': 'lucide:briefcase',
    'Event Hosting': 'lucide:calendar',
    'Conference Facilities': 'lucide:users',
    'Meeting Rooms': 'lucide:users',

    // Security & Safety
    '24/7 Security': 'lucide:shield-check',
    'CCTV Surveillance': 'lucide:video',
    'Fire Safety': 'lucide:fire-extinguisher',
    'Emergency Services': 'lucide:phone-call',

    // Transportation & Convenience
    'Airport Shuttle': 'lucide:plane',
    'Valet Parking': 'lucide:car',
    'Concierge Service': 'lucide:user-check',

    // Unique Experiences
    'Royal Experience': 'lucide:crown',
    'Luxury Experience': 'lucide:gem',
    'Boutique Experience': 'lucide:shopping-bag',
    'Resort Experience': 'lucide:palm-tree',
    'Villa Experience': 'lucide:home',

    // Sustainability
    'Sustainable Tourism': 'lucide:leaf',
    'Panoramic Views': 'lucide:eye',
    'Farm-to-Table Cuisine': 'lucide:wheat',
    'Outdoor Activities': 'lucide:mountain',
    'Peaceful Environment': 'lucide:peace',
  };

  // Function to get icon for a feature
  const getFeatureIcon = (feature: string): string => {
    return featuresMap[feature as keyof typeof featuresMap] || 'lucide:star';
  };

  // Function to get all available features (for admin/management purposes)
  const getAllFeatures = (): string[] => {
    return Object.keys(featuresMap);
  };

  // Function to validate if a feature exists
  const isValidFeature = (feature: string): boolean => {
    return feature in featuresMap;
  };

  // Function to get features with their icons
  const getFeaturesWithIcons = (features: string[]) => {
    return features.map(feature => ({
      name: feature,
      icon: getFeatureIcon(feature),
    }));
  };

  return {
    getFeatureIcon,
    getAllFeatures,
    isValidFeature,
    getFeaturesWithIcons,
    featuresMap,
  };
};
