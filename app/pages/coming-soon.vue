<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div class="max-w-4xl mx-auto px-4 text-center py-10">
      <!-- Logo -->
      <div class="mb-8">
        <div class="flex items-center justify-center space-x-3 mb-6">
          <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
            <span class="text-white font-bold text-2xl">M</span>
          </div>
          <span class="text-3xl font-bold text-gray-900">MysuruTrip</span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20">
        <!-- Icon -->
        <div class="mb-8">
          <div class="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <icon
              name="lucide:construction"
              class="text-4xl text-white"
            />
          </div>
        </div>

        <!-- Heading -->
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Coming Soon
        </h1>

        <!-- Subtitle -->
        <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
          We're crafting something amazing for your Mysuru adventure. Stay tuned for an incredible experience!
        </p>

        <!-- Features Preview -->
        <div class="grid md:grid-cols-3 gap-6 mb-12">
          <div class="bg-white/60 rounded-xl p-6 border border-white/30">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <icon
                name="lucide:bed"
                class="text-xl text-orange-600"
              />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">
              Luxury Stays
            </h3>
            <p class="text-gray-600 text-sm">
              Premium hotels and heritage properties
            </p>
          </div>

          <div class="bg-white/60 rounded-xl p-6 border border-white/30">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <icon
                name="lucide:map-pin"
                class="text-xl text-orange-600"
              />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">
              Cultural Tours
            </h3>
            <p class="text-gray-600 text-sm">
              Authentic experiences and guided tours
            </p>
          </div>

          <div class="bg-white/60 rounded-xl p-6 border border-white/30">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <icon
                name="lucide:heart"
                class="text-xl text-orange-600"
              />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">
              Personalized
            </h3>
            <p class="text-gray-600 text-sm">
              Custom itineraries just for you
            </p>
          </div>
        </div>

        <!-- Launch Notice -->
        <div class="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-8 text-white mb-8">
          <h2 class="text-2xl font-bold mb-4">
            We're Launching Soon!
          </h2>
          <p class="mb-6 opacity-90">
            Get ready for an incredible Mysuru experience with luxury stays, cultural tours, and personalized itineraries.
          </p>
          <div class="text-center">
            <div class="inline-flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full">
              <icon
                name="lucide:calendar"
                class="w-5 h-5"
              />
              <span class="font-semibold">Expected Launch: Q3 2025</span>
            </div>
          </div>
        </div>

        <!-- Social Links -->
        <div class="flex justify-center space-x-6 mb-8">
          <a
            href="#"
            class="w-12 h-12 bg-gray-100 hover:bg-orange-100 rounded-full flex items-center justify-center transition-colors"
            title="Facebook"
          >
            <icon
              name="lucide:facebook"
              class="w-5 h-5 text-gray-600"
            />
          </a>
          <a
            href="#"
            class="w-12 h-12 bg-gray-100 hover:bg-orange-100 rounded-full flex items-center justify-center transition-colors"
            title="Instagram"
          >
            <icon
              name="lucide:instagram"
              class="w-5 h-5 text-gray-600"
            />
          </a>
          <a
            href="#"
            class="w-12 h-12 bg-gray-100 hover:bg-orange-100 rounded-full flex items-center justify-center transition-colors"
            title="Twitter"
          >
            <icon
              name="lucide:twitter"
              class="w-5 h-5 text-gray-600"
            />
          </a>
        </div>

        <!-- Footer -->
        <div class="text-gray-500 text-sm">
          <p>&copy; {{ currentYear }} MysuruTrip. All rights reserved.</p>
          <p class="mt-2">
            Expected launch: Q3 2025
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO
useHead({
  title: 'Coming Soon - MysuruTrip',
  meta: [
    { name: 'description', content: 'MysuruTrip is coming soon! Be the first to know about luxury stays and cultural experiences in Mysuru.' },
    { name: 'robots', content: 'noindex, nofollow' },
  ],
});

// Reactive data
const currentYear = new Date().getFullYear();
</script>
