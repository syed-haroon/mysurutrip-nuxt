<template>
  <div
    v-if="shouldShowPanel"
    class="fixed bottom-4 right-4 z-50"
  >
    <ui-card class="bg-white/95 backdrop-blur-sm border border-orange-200 shadow-lg">
      <div class="p-4">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <icon
              name="lucide:shield-check"
              class="w-4 h-4 text-orange-600"
            />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 text-sm">
              Access Control
            </h3>
            <p class="text-xs text-gray-600">
              {{ accessLevel }} mode
            </p>
          </div>
        </div>

        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs">
            <div
              :class="[
                'w-2 h-2 rounded-full',
                isProduction ? 'bg-red-500' : 'bg-green-500',
              ]"
            />
            <span class="text-gray-600">
              {{ isProduction ? 'Production' : 'Development' }}
            </span>
          </div>

          <div class="flex items-center gap-2 text-xs">
            <div
              :class="[
                'w-2 h-2 rounded-full',
                shouldShowComingSoon ? 'bg-yellow-500' : 'bg-blue-500',
              ]"
            />
            <span class="text-gray-600">
              {{ shouldShowComingSoon ? 'Coming Soon' : 'Full Site' }}
            </span>
          </div>
        </div>

        <div class="mt-3 pt-3 border-t border-gray-200">
          <div class="flex gap-2">
            <ui-button
              v-if="!hasAdminAccess"
              size="sm"
              variant="outline"
              class="text-xs"
              @click="enableAdminAccess"
            >
              Admin Access
            </ui-button>

            <ui-button
              v-if="!hasGuestAccess"
              size="sm"
              variant="outline"
              class="text-xs"
              @click="enableGuestAccess"
            >
              Guest View
            </ui-button>

            <ui-button
              v-if="hasAdminAccess || hasGuestAccess"
              size="sm"
              variant="outline"
              class="text-xs"
              @click="clearAccess"
            >
              Clear
            </ui-button>
          </div>
        </div>
      </div>
    </ui-card>
  </div>
</template>

<script setup lang="ts">
const {
  isProduction,
  isDevelopment,
  hasAdminAccess,
  hasGuestAccess,
  accessLevel,
  shouldShowComingSoon,
  getAdminAccessUrl,
  getGuestAccessUrl,
  clearAccessParams,
} = useAccessControl();

// Only show panel in development or when admin access is active
const shouldShowPanel = computed(() => {
  return isDevelopment.value || hasAdminAccess.value;
});

const enableAdminAccess = () => {
  window.location.href = getAdminAccessUrl();
};

const enableGuestAccess = () => {
  window.location.href = getGuestAccessUrl();
};

const clearAccess = () => {
  window.location.href = clearAccessParams();
};
</script>
