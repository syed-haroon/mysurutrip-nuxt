<template>
  <footer class="bg-gray-900 text-white">
    <!-- Main Footer Content -->
    <div class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <icon
              name="lucide:map-pin"
              class="w-6 h-6 text-orange-500"
            />
            <h3 class="text-xl font-bold">
              Mysuru Tours
            </h3>
          </div>
          <p class="text-gray-300 text-sm leading-relaxed">
            Discover the royal heritage and cultural wonders of Mysuru. Your trusted partner for authentic experiences, luxury accommodations, and unforgettable adventures in the City of Palaces.
          </p>
          <div class="flex space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.id"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-orange-500 transition-colors"
              :aria-label="social.ariaLabel"
            >
              <icon
                :name="social.icon"
                class="w-5 h-5"
              />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-white">
            Quick Links
          </h4>
          <ul class="space-y-2">
            <li
              v-for="link in quickLinks"
              :key="link.to"
            >
              <nuxt-link
                :to="link.to"
                class="text-gray-300 hover:text-orange-500 transition-colors text-sm"
              >
                {{ link.label }}
              </nuxt-link>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-white">
            Our Services
          </h4>
          <ul class="space-y-2">
            <li
              v-for="service in services"
              :key="service"
            >
              <span class="text-gray-300 text-sm">{{ service }}</span>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-white">
            Contact Us
          </h4>
          <div class="space-y-3">
            <div
              v-for="contact in contactInfo"
              :key="contact.icon"
              class="flex items-start space-x-3"
            >
              <icon
                :name="contact.icon"
                :class="`w-4 h-4 ${contact.color}`"
              />
              <a
                v-if="contact.isLink"
                :href="contact.href"
                class="text-gray-300 hover:text-orange-500 transition-colors text-sm"
              >
                {{ contact.text }}
              </a>
              <span
                v-else
                class="text-gray-300 text-sm"
              >
                {{ contact.text }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div class="border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="text-gray-400 text-sm">
            © {{ new Date().getFullYear() }} Mysuru Tours. All rights reserved.
          </div>
          <div class="flex space-x-6 text-sm">
            <nuxt-link
              v-for="link in legalLinks"
              :key="link.to"
              :to="link.to"
              class="text-gray-400 hover:text-orange-500 transition-colors"
            >
              {{ link.label }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Store
const siteStore = useSiteStore();

// Social media links configuration
const socialLinks = [
  {
    id: 'facebook',
    url: 'https://facebook.com',
    icon: 'lucide:facebook',
    ariaLabel: 'Follow us on Facebook',
  },
  // {
  //   id: 'twitter',
  //   url: 'https://twitter.com',
  //   icon: 'lucide:twitter',
  //   ariaLabel: 'Follow us on Twitter',
  // },
  {
    id: 'instagram',
    url: 'https://instagram.com',
    icon: 'lucide:instagram',
    ariaLabel: 'Follow us on Instagram',
  },
  {
    id: 'youtube',
    url: 'https://youtube.com',
    icon: 'lucide:youtube',
    ariaLabel: 'Subscribe to our YouTube channel',
  },
];

// Quick links configuration
const quickLinks = computed(() => {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/hotels', label: 'Hotels & Accommodation' },
    { to: '/explore', label: 'Explore Attractions' },
  ];

  // Add activities link only if enabled
  if (siteStore.showActivities) {
    links.splice(2, 0, { to: '/activities', label: 'Activities & Tours' });
  }

  return links;
});

// Services configuration
const services = [
  'Cultural Tours',
  'Heritage Walks',
  'Luxury Accommodation',
  'Adventure Activities',
  'Custom Packages',
  'Transportation',
];

// Contact information configuration
const contactInfo = [
  // {
  //   icon: 'lucide:map-pin',
  //   color: 'text-orange-500',
  //   lines: ['Mysuru Palace Road', 'Mysuru, Karnataka 570001'],
  // },
  {
    icon: 'lucide:phone',
    color: 'text-orange-500',
    isLink: true,
    href: 'tel:+918211234567',
    text: '+91 ‭98454 48902‬',
  },
  {
    icon: 'lucide:mail',
    color: 'text-orange-500',
    isLink: true,
    href: 'mailto:info@mysurutrip.com',
    text: 'info@mysurutrip.com',
  },
  {
    icon: 'lucide:clock',
    color: 'text-orange-500',
    text: '24/7 Support',
  },
];

// Legal links configuration
const legalLinks = [
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms-of-service', label: 'Terms of Service' },
  { to: '/cancellation-policy', label: 'Cancellation Policy' },
  { to: '/sitemap', label: 'Sitemap' },
];

// SEO metadata for the footer
useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://mysurutrip.com',
    },
  ],
});
</script>
