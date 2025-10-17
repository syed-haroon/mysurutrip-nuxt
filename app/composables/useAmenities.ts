export const useAmenities = () => {
  // Comprehensive amenities list with icon mapping (deduplicated)
  const amenitiesMap = {
    // Room Service & Security
    '24-hour Room Service': 'lucide:bell',
    '24x7 Security': 'lucide:shield-check',
    'Room Service': 'lucide:bell',

    // Transportation
    'Airport Transfer': 'lucide:plane',
    'Paid Pick-up/Drop': 'lucide:car',
    'Paid Bus Station Transfers': 'lucide:bus',
    'Taxi Service': 'lucide:taxi',

    // Facilities & Halls
    'Activity Centre': 'lucide:activity',
    'Banquet Hall': 'lucide:party-popper',
    'Conference Hall': 'lucide:users',
    'Conference Facilities': 'lucide:users',
    'Business Centre': 'lucide:briefcase',
    'Executive Lounge': 'lucide:crown',
    'Party Hall': 'lucide:party-popper',

    // Food & Beverage
    'Bar': 'lucide:wine',
    'Coffee Shop': 'lucide:coffee',
    'Restaurant': 'lucide:utensils',
    'Fine Dining Restaurant': 'lucide:utensils',
    'Organic Restaurant': 'lucide:leaf',

    // Recreation & Wellness
    'Bonfire': 'lucide:flame',
    'Games Room': 'lucide:gamepad-2',
    'Indoor Games': 'lucide:dice-6',
    'Gym': 'lucide:dumbbell',
    'Health Club': 'lucide:heart-pulse',
    'Massage Centre': 'lucide:hand',
    'Spa': 'lucide:spa',
    'Steam and Sauna': 'lucide:thermometer',
    'Swimming Pool': 'lucide:droplets',

    // Outdoor & Nature
    'Garden': 'lucide:trees',
    'Smoking Area': 'lucide:cigarette',
    'Nature Walks': 'lucide:hiking',
    'Bird Watching': 'lucide:binoculars',

    // Technology & Communication
    'Free WiFi': 'lucide:wifi',
    'CCTV': 'lucide:video',
    'Power Backup / 24 Hrs Electricity Backup': 'lucide:battery',
    'Photocopying': 'lucide:copy',

    // Accessibility & Convenience
    'Elevator': 'lucide:arrow-up-down',
    'Ground Floor Rooms': 'lucide:home',
    'Wheelchair Accessible': 'lucide:wheelchair',
    'Public Restroom': 'lucide:bath',
    'Free Toiletries': 'lucide:soap',
    'Modern Bathrooms': 'lucide:bath',

    // Services
    'Concierge': 'lucide:user-check',
    'Front Desk': 'lucide:desk',
    'Travel Desk': 'lucide:map',
    'Local Guide': 'lucide:map',
    'Currency Exchange': 'lucide:dollar-sign',
    'Doctor on Call': 'lucide:stethoscope',
    'Wake-up Service': 'lucide:alarm-clock',
    'Laundry Service': 'lucide:shirt',
    'Ironing Facilities': 'lucide:iron',
    'Luggage Storage': 'lucide:luggage',

    // Safety & Security
    'Fire Extinguishers': 'lucide:fire-extinguisher',
    'Sanitizers': 'lucide:spray',
    'Torch': 'lucide:flashlight',

    // Information & Media
    'Newspaper in Lobby': 'lucide:newspaper',

    // Views & Special Features
    'River View': 'lucide:waves',
    'Balcony Views': 'lucide:eye',

    // Kitchen & Dining
    'Kitchen Access': 'lucide:chef-hat',
    'Home-cooked Meals': 'lucide:home',

    // Parking
    'Parking': 'lucide:parking-circle',

    // Tours & Activities
    'Local Tours': 'lucide:map-pin',

    // Accommodation Types
    'Eco-friendly Cottages': 'lucide:home',
  };

  // Function to get icon for an amenity
  const getAmenityIcon = (amenity: string): string => {
    return amenitiesMap[amenity as keyof typeof amenitiesMap] || 'lucide:check';
  };

  // Function to get all available amenities (for admin/management purposes)
  const getAllAmenities = (): string[] => {
    return Object.keys(amenitiesMap);
  };

  // Function to validate if an amenity exists
  const isValidAmenity = (amenity: string): boolean => {
    return amenity in amenitiesMap;
  };

  // Function to get amenities with their icons
  const getAmenitiesWithIcons = (amenities: string[]) => {
    return amenities.map(amenity => ({
      name: amenity,
      icon: getAmenityIcon(amenity),
    }));
  };

  return {
    getAmenityIcon,
    getAllAmenities,
    isValidAmenity,
    getAmenitiesWithIcons,
    amenitiesMap,
  };
};
