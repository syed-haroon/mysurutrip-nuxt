import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface WishlistItem {
  id: string | undefined;
  type: 'hotel' | 'activity';
  title: string;
  displayName?: string; // For hotels: fake name shown to customers
  image: string;
  location: string;
}

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref<WishlistItem[]>([]);
  const maxItems = 3;

  // Load from localStorage on store initialization
  if (import.meta.client) {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      items.value = JSON.parse(saved);
    }
  }

  // Save to localStorage whenever items change
  const saveToStorage = () => {
    if (import.meta.client) {
      localStorage.setItem('wishlist', JSON.stringify(items.value));
    }
  };

  const addItem = (item: WishlistItem) => {
    if (items.value.length >= maxItems) {
      return false;
    }

    // Check if item already exists
    const existingIndex = items.value.findIndex(existing => existing.id === item.id);
    if (existingIndex > -1) {
      return false; // Item already exists
    }

    items.value.push(item);
    saveToStorage();
    return true;
  };

  const removeItem = (id: string) => {
    const index = items.value.findIndex(item => item.id === id);
    if (index > -1) {
      items.value.splice(index, 1);
      saveToStorage();
      return true;
    }
    return false;
  };

  const clearWishlist = () => {
    items.value = [];
    saveToStorage();
  };

  const isInWishlist = (id: string) => {
    return items.value.some(item => item.id === id);
  };

  const canAddMore = computed(() => items.value.length < maxItems);

  const itemCount = computed(() => items.value.length);

  return {
    items,
    maxItems,
    addItem,
    removeItem,
    clearWishlist,
    isInWishlist,
    canAddMore,
    itemCount,
  };
});
