<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink
            to="/"
            class="flex items-center space-x-2"
          >
            <div class="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">M</span>
            </div>
            <span class="text-xl font-bold text-gray-900">MysuruTrip</span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink
            to="/"
            class="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            active-class="text-orange-600"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/hotels"
            class="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            active-class="text-orange-600"
          >
            Stays
          </NuxtLink>
          <NuxtLink
            v-if="siteStore.showActivities"
            to="/activities"
            class="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            active-class="text-orange-600"
          >
            Activities
          </NuxtLink>
          <NuxtLink
            to="/explore"
            class="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            active-class="text-orange-600"
          >
            Explore
          </NuxtLink>
        </div>

        <!-- Right Side -->
        <div class="flex items-center space-x-4">
          <!-- Phone Number -->
          <a
            href="tel:+91-9845448902"
            class="hidden lg:flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 hover:from-blue-100 hover:to-indigo-100 transition-all"
            title="Call Now"
          >
            <div class="flex bg-blue-500 rounded-full p-1 size-8">
              <icon
                name="lucide:phone"
                class="text-lg text-white m-auto"
              />
            </div>
            <div class="text-sm leading-tight">
              <div class="text-blue-600 font-medium">Call Now</div>
              <div class="text-blue-700 font-bold">+91 98454 48902</div>
            </div>
          </a>

          <!-- Wishlist Indicator -->
          <NuxtLink
            v-if="itemCount > 0"
            to="/get-quote"
            class="relative p-2 text-gray-700 hover:text-orange-600 transition-colors"
            title="View Wishlist"
          >
            <icon-heart
              variant="outline"
              size="lg"
            />
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              {{ itemCount }}
            </span>
          </NuxtLink>
          <div
            v-else
            class="relative p-2 text-gray-400 cursor-not-allowed"
            title="No items in wishlist"
          >
            <icon-heart
              variant="outline"
              size="lg"
            />
          </div>

          <!-- CTA Button -->
          <ui-button
            as="nuxt-link"
            to="/get-quote"
            size="sm"
            class="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Get Quote
          </ui-button>

          <!-- Mobile Menu Button -->
          <button
            class="md:hidden p-2 text-gray-700 hover:text-orange-600 transition-colors"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <icon
              v-if="!isMobileMenuOpen"
              name="lucide:menu"
              class="w-6 h-6"
            />
            <icon
              v-else
              name="lucide:x"
              class="w-6 h-6"
            />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition name="slide">
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden border-t border-gray-200"
        >
          <div class="py-4 space-y-4">
            <NuxtLink
              to="/"
              class="block text-gray-700 hover:text-orange-600 transition-colors font-medium"
              active-class="text-orange-600"
              @click="isMobileMenuOpen = false"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/hotels"
              class="block text-gray-700 hover:text-orange-600 transition-colors font-medium"
              active-class="text-orange-600"
              @click="isMobileMenuOpen = false"
            >
              Stays
            </NuxtLink>
            <NuxtLink
              v-if="siteStore.showActivities"
              to="/activities"
              class="block text-gray-700 hover:text-orange-600 transition-colors font-medium"
              active-class="text-orange-600"
              @click="isMobileMenuOpen = false"
            >
              Activities
            </NuxtLink>
            <NuxtLink
              to="/explore"
              class="block text-gray-700 hover:text-orange-600 transition-colors font-medium"
              active-class="text-orange-600"
              @click="isMobileMenuOpen = false"
            >
              Explore
            </NuxtLink>
            <NuxtLink
              to="/get-quote"
              class="block text-gray-700 hover:text-orange-600 transition-colors font-medium"
              active-class="text-orange-600"
              @click="isMobileMenuOpen = false"
            >
              Get Quote
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
const wishlistStore = useWishlistStore();
const siteStore = useSiteStore();
const { itemCount } = storeToRefs(wishlistStore);
const isMobileMenuOpen = ref(false);
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
