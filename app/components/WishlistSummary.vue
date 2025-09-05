<template>
  <div class="fixed bottom-6 right-6 z-50">
    <ui-card class="w-80 shadow-2xl border-2 border-orange-200">
      <div class="px-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <icon-heart
              variant="filled"
              size="md"
              class="text-red-500"
            />
            My Wishlist
            <span class="text-sm text-gray-500">({{ wishlistStore.itemCount }}/{{ wishlistStore.maxItems }})</span>
          </h3>
          <button
            class="p-1 hover:bg-gray-100 rounded transition-colors"
            @click="isExpanded = !isExpanded"
          >
            <icon
              name="lucide:chevron-down"
              class="w-5 h-5 text-gray-600 transition-transform"
              :class="{ 'rotate-180': isExpanded }"
            />
          </button>
        </div>

        <div v-if="isExpanded">
          <Transition name="expand">
            <div
              v-if="isExpanded"
              class="space-y-3"
            >
              <div
                v-for="item in wishlistStore.items"
                :key="item.id"
                class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-12 h-12 object-cover rounded"
                >
                <div class="flex-1 min-w-0">
                  <h4 class="font-medium text-gray-900 truncate">
                    {{ item.title }}
                  </h4>
                  <p class="text-sm text-gray-600">
                    {{ item.location }}
                  </p>
                </div>
                <button
                  class="p-1 hover:bg-red-100 w-7 h-7 rounded transition-colors text-red-500"
                  title="Remove from wishlist"
                  @click="removeItem(item.id)"
                >
                  <icon
                    name="lucide:x"
                    class="w-4 h-4"
                  />
                </button>
              </div>

              <div class="pt-3 border-t border-gray-200">
                <ui-button
                  as="nuxt-link"
                  to="/get-quote"
                  class="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <icon
                    name="lucide:message-square"
                    class="w-4 h-4 mr-2"
                  />
                  Get Quote for All
                </ui-button>
              </div>
            </div>
          </Transition>
        </div>

        <div
          v-else
          class="text-center"
        >
          <p class="text-sm text-gray-600 mb-3">
            {{ wishlistStore.itemCount }} item{{ wishlistStore.itemCount !== 1 ? 's' : '' }} in your wishlist
          </p>
          <ui-button
            as="nuxt-link"
            to="/get-quote"
            size="sm"
            variant="outline"
          >
            Get Quote
          </ui-button>
        </div>
      </div>
    </ui-card>
  </div>
</template>

<script setup lang="ts">
const wishlistStore = useWishlistStore();
const isExpanded = ref(false);

const removeItem = (id: string) => {
  wishlistStore.removeItem(id);
};
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
