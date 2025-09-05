<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Hero Section -->
    <section class="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-black/40 z-10" />
      <div class="absolute inset-0">
        <HeroSlider />
      </div>
      <div class="relative z-20 text-center px-4">
        <div class="text-white">
          <h1 class="text-5xl md:text-7xl font-bold mb-6">
            Discover Mysuru
          </h1>
          <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Experience the royal heritage, cultural richness, and natural beauty of Karnataka's cultural capital
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <ui-button
            size="lg"
            class="bg-orange-500 hover:bg-orange-600 text-white"
            @click="scrollToHotels"
          >
            <icon
              name="lucide:heart"
              class="w-5 h-5"
            />
            Explore Stays
          </ui-button>
          <ui-button
            size="lg"
            variant="outline"
            @click="scrollToActivities"
          >
            <icon
              name="lucide:map-pin"
              class="w-5 h-5"
            />
            Things to Do
          </ui-button>
        </div>
      </div>
    </section>

    <!-- Featured Hotels Section -->
    <FeaturedHotels />

    <!-- Activities Section -->
    <FeaturedActivities />

    <!-- CTA Section -->
    <section class="py-20 px-4 bg-gradient-to-r from-orange-500 to-red-500">
      <div class="max-w-4xl mx-auto text-center text-white">
        <h2 class="text-4xl font-bold mb-6">
          Ready to Plan Your Perfect Trip?
        </h2>
        <p class="text-xl mb-8 opacity-90">
          Get personalized quotes and exclusive offers for your Mysuru adventure
        </p>
        <ui-button
          as="nuxt-link"
          to="/get-quote"
          size="lg"
          class="bg-white text-orange-600 hover:bg-gray-100"
        >
          <icon
            name="lucide:message-square"
            class="w-5 h-5 mr-2"
          />
          Get My Best Quote
        </ui-button>
      </div>
    </section>

    <!-- Wishlist Summary -->
    <WishlistSummary v-if="wishlistStore.itemCount > 0" />
  </div>
</template>

<script setup lang="ts">
// SEO
useHead({
  title: 'Discover Mysuru - Luxury Stays & Cultural Experiences',
  meta: [
    { name: 'description', content: 'Experience the royal heritage of Mysuru with luxury hotels, cultural tours, and personalized travel packages. Get your best quote today!' },
  ],
});

// Stores
const wishlistStore = useWishlistStore();

const scrollToHotels = () => {
  document.getElementById('hotels')?.scrollIntoView({ behavior: 'smooth' });
};

const scrollToActivities = () => {
  document.getElementById('activities')?.scrollIntoView({ behavior: 'smooth' });
};
</script>
