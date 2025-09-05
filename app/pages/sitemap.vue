<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 py-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Sitemap
        </h1>
        <p class="text-lg text-gray-600">
          Navigate through all pages and sections of our website
        </p>
      </div>

      <!-- Sitemap Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Main Pages -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <icon
              name="lucide:home"
              class="w-5 h-5 text-orange-500 mr-2"
            />
            Main Pages
          </h2>
          <ul class="space-y-2">
            <li>
              <nuxt-link
                to="/"
                class="text-gray-700 hover:text-orange-500 transition-colors flex items-center"
              >
                <icon
                  name="lucide:chevron-right"
                  class="w-4 h-4 mr-2"
                />
                Home
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/get-quote"
                class="text-gray-700 hover:text-orange-500 transition-colors flex items-center"
              >
                <icon
                  name="lucide:chevron-right"
                  class="w-4 h-4 mr-2"
                />
                Get Quote
              </nuxt-link>
            </li>
          </ul>
        </div>

        <!-- Hotels & Accommodation -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <icon
              name="lucide:building"
              class="w-5 h-5 text-blue-500 mr-2"
            />
            Hotels & Accommodation
          </h2>
          <ul class="space-y-2">
            <li>
              <nuxt-link
                to="/hotels"
                class="text-gray-700 hover:text-orange-500 transition-colors flex items-center"
              >
                <icon
                  name="lucide:chevron-right"
                  class="w-4 h-4 mr-2"
                />
                All Hotels
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/hotels/green-valley-resort"
                class="text-gray-700 hover:text-orange-500 transition-colors flex items-center"
              >
                <icon
                  name="lucide:chevron-right"
                  class="w-4 h-4 mr-2"
                />
                Green Valley Resort
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/hotels/royal-mysuru-palace"
                class="text-gray-700 hover:text-orange-500 transition-colors flex items-center"
              >
                <icon
                  name="lucide:chevron-right"
                  class="w-4 h-4 mr-2"
                />
                Royal Mysuru Palace Hotel
              </nuxt-link>
            </li>
          </ul>
        </div>

        <!-- Activities & Tours -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <icon
              name="lucide:compass"
              class="w-5 h-5 text-green-500 mr-2"
            />
            Activities & Tours
          </h2>
          <ul class="space-y-2">
            <li>
              <nuxt-link
                to="/activities"
                class="text-gray-700 hover:text-orange-500 transition-colors flex items-center"
              >
                <icon
                  name="lucide:chevron-right"
                  class="w-4 h-4 mr-2"
                />
                All Activities
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/activities/mysuru-palace-tour"
                class="text-gray-700 hover:text-orange-500 transition-colors flex items-center"
              >
                <icon
                  name="lucide:chevron-right"
                  class="w-4 h-4 mr-2"
                />
                Mysuru Palace Tour
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/activities/chamundi-hills-trek"
                class="text-gray-700 hover:text-orange-500 transition-colors flex items-center"
              >
                <icon
                  name="lucide:chevron-right"
                  class="w-4 h-4 mr-2"
                />
                Chamundi Hills Trek
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/activities/mysuru-silk-weaving"
                class="text-gray-700 hover:text-orange-500 transition-colors flex items-center"
              >
                <icon
                  name="lucide:chevron-right"
                  class="w-4 h-4 mr-2"
                />
                Mysuru Silk Weaving
              </nuxt-link>
            </li>
          </ul>
        </div>

        <!-- Explore Attractions -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <icon
              name="lucide:map-pin"
              class="w-5 h-5 text-red-500 mr-2"
            />
            Explore Attractions
          </h2>
          <ul class="space-y-2">
            <li>
              <nuxt-link
                to="/explore"
                class="text-gray-700 hover:text-orange-500 transition-colors flex items-center"
              >
                <icon
                  name="lucide:chevron-right"
                  class="w-4 h-4 mr-2"
                />
                All Attractions
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/explore/mysuru-palace"
                class="text-gray-700 hover:text-orange-500 transition-colors flex items-center"
              >
                <icon
                  name="lucide:chevron-right"
                  class="w-4 h-4 mr-2"
                />
                Mysuru Palace
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/explore/brindavan-gardens"
                class="text-gray-700 hover:text-orange-500 transition-colors flex items-center"
              >
                <icon
                  name="lucide:chevron-right"
                  class="w-4 h-4 mr-2"
                />
                Brindavan Gardens
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/explore/chamundi-hills"
                class="text-gray-700 hover:text-orange-500 transition-colors flex items-center"
              >
                <icon
                  name="lucide:chevron-right"
                  class="w-4 h-4 mr-2"
                />
                Chamundi Hills
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/explore/bandipur-national-park"
                class="text-gray-700 hover:text-orange-500 transition-colors flex items-center"
              >
                <icon
                  name="lucide:chevron-right"
                  class="w-4 h-4 mr-2"
                />
                Bandipur National Park
              </nuxt-link>
            </li>
          </ul>
        </div>

        <!-- Legal & Policy Pages -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <icon
              name="lucide:shield"
              class="w-5 h-5 text-purple-500 mr-2"
            />
            Legal & Policies
          </h2>
          <ul class="space-y-2">
            <li>
              <nuxt-link
                to="/privacy-policy"
                class="text-gray-700 hover:text-orange-500 transition-colors flex items-center"
              >
                <icon
                  name="lucide:chevron-right"
                  class="w-4 h-4 mr-2"
                />
                Privacy Policy
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/terms-of-service"
                class="text-gray-700 hover:text-orange-500 transition-colors flex items-center"
              >
                <icon
                  name="lucide:chevron-right"
                  class="w-4 h-4 mr-2"
                />
                Terms of Service
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/cancellation-policy"
                class="text-gray-700 hover:text-orange-500 transition-colors flex items-center"
              >
                <icon
                  name="lucide:chevron-right"
                  class="w-4 h-4 mr-2"
                />
                Cancellation Policy
              </nuxt-link>
            </li>
          </ul>
        </div>

        <!-- Contact & Support -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <icon
              name="lucide:phone"
              class="w-5 h-5 text-indigo-500 mr-2"
            />
            Contact & Support
          </h2>
          <ul class="space-y-2">
            <li>
              <span class="text-gray-700 flex items-center">
                <icon
                  name="lucide:phone"
                  class="w-4 h-4 mr-2"
                />
                +91 ‭98454 48902‬
              </span>
            </li>
            <li>
              <span class="text-gray-700 flex items-center">
                <icon
                  name="lucide:mail"
                  class="w-4 h-4 mr-2"
                />
                info@mysurutrip.com
              </span>
            </li>
            <li>
              <span class="text-gray-700 flex items-center">
                <icon
                  name="lucide:map-pin"
                  class="w-4 h-4 mr-2"
                />
                Mysuru Palace Road, Mysuru
              </span>
            </li>
            <li>
              <span class="text-gray-700 flex items-center">
                <icon
                  name="lucide:clock"
                  class="w-4 h-4 mr-2"
                />
                24/7 Support Available
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Additional Information -->
      <div class="mt-12 bg-white rounded-lg shadow-sm p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
          About Our Website Structure
        </h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3">
              Navigation Structure
            </h3>
            <p class="text-gray-700 text-sm leading-relaxed">
              Our website is organized to provide easy access to all our tourism services. The main navigation includes hotels, activities, and attractions, with detailed pages for each offering.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3">
              SEO Optimization
            </h3>
            <p class="text-gray-700 text-sm leading-relaxed">
              Each page is optimized for search engines with proper meta tags, structured data, and user-friendly URLs. This helps visitors find relevant information quickly and easily.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO metadata
useHead({
  title: 'Sitemap - Mysuru Tours',
  meta: [
    {
      name: 'description',
      content: 'Navigate through all pages and sections of Mysuru Tours website. Find hotels, activities, attractions, and important information easily.',
    },
    {
      name: 'keywords',
      content: 'sitemap, website navigation, Mysuru Tours, tourism pages, site structure',
    },
    {
      property: 'og:title',
      content: 'Sitemap - Mysuru Tours',
    },
    {
      property: 'og:description',
      content: 'Navigate through all pages and sections of Mysuru Tours website.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
});
</script>
