<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p class="text-gray-600 mt-2">
              Manage your MysuruTrip application
            </p>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-sm text-gray-500">
              Environment: <span class="font-medium">{{ isProduction ? 'Production' : 'Development' }}</span>
            </div>
            <ui-button
              variant="outline"
              @click="navigateTo('/')"
            >
              <icon
                name="lucide:arrow-left"
                class="w-4 h-4 mr-2"
              />
              Back to Site
            </ui-button>
          </div>
        </div>
      </div>

      <!-- Access Control Status -->
      <ui-card class="mb-8">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            Access Control Status
          </h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="flex items-center gap-3 mb-2">
                <div
                  :class="[
                    'w-3 h-3 rounded-full',
                    isProduction ? 'bg-red-500' : 'bg-green-500',
                  ]"
                />
                <span class="font-medium text-gray-900">Environment</span>
              </div>
              <p class="text-sm text-gray-600">
                {{ isProduction ? 'Production' : 'Development' }}
              </p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <div class="flex items-center gap-3 mb-2">
                <div
                  :class="[
                    'w-3 h-3 rounded-full',
                    hasAdminAccess ? 'bg-blue-500' : 'bg-gray-400',
                  ]"
                />
                <span class="font-medium text-gray-900">Admin Access</span>
              </div>
              <p class="text-sm text-gray-600">
                {{ hasAdminAccess ? 'Active' : 'Inactive' }}
              </p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <div class="flex items-center gap-3 mb-2">
                <div
                  :class="[
                    'w-3 h-3 rounded-full',
                    shouldShowComingSoon ? 'bg-yellow-500' : 'bg-green-500',
                  ]"
                />
                <span class="font-medium text-gray-900">Site Mode</span>
              </div>
              <p class="text-sm text-gray-600">
                {{ shouldShowComingSoon ? 'Coming Soon' : 'Full Site' }}
              </p>
            </div>
          </div>
        </div>
      </ui-card>

      <!-- Quick Actions -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ui-card class="cursor-pointer hover:shadow-lg transition-shadow">
          <div class="p-6">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <icon
                name="lucide:users"
                class="w-6 h-6 text-blue-600"
              />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">
              User Management
            </h3>
            <p class="text-sm text-gray-600">
              Manage user accounts and permissions
            </p>
          </div>
        </ui-card>

        <ui-card class="cursor-pointer hover:shadow-lg transition-shadow">
          <div class="p-6">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <icon
                name="lucide:bed"
                class="w-6 h-6 text-green-600"
              />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">
              Hotel Management
            </h3>
            <p class="text-sm text-gray-600">
              Manage hotel listings and availability
            </p>
          </div>
        </ui-card>

        <ui-card class="cursor-pointer hover:shadow-lg transition-shadow">
          <div class="p-6">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <icon
                name="lucide:map-pin"
                class="w-6 h-6 text-orange-600"
              />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">
              Activity Management
            </h3>
            <p class="text-sm text-gray-600">
              Manage tours and activities
            </p>
          </div>
        </ui-card>

        <ui-card class="cursor-pointer hover:shadow-lg transition-shadow">
          <div class="p-6">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <icon
                name="lucide:bar-chart"
                class="w-6 h-6 text-purple-600"
              />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">
              Analytics
            </h3>
            <p class="text-sm text-gray-600">
              View site analytics and reports
            </p>
          </div>
        </ui-card>

        <ui-card class="cursor-pointer hover:shadow-lg transition-shadow">
          <div class="p-6">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <icon
                name="lucide:settings"
                class="w-6 h-6 text-red-600"
              />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">
              Site Settings
            </h3>
            <p class="text-sm text-gray-600">
              Configure site-wide settings
            </p>
          </div>
        </ui-card>

        <ui-card class="cursor-pointer hover:shadow-lg transition-shadow">
          <div class="p-6">
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <icon
                name="lucide:mail"
                class="w-6 h-6 text-yellow-600"
              />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">
              Email Subscribers
            </h3>
            <p class="text-sm text-gray-600">
              Manage coming soon email list
            </p>
          </div>
        </ui-card>
      </div>

      <!-- System Information -->
      <ui-card>
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            System Information
          </h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-medium text-gray-900 mb-3">
                Environment Details
              </h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Node Environment:</span>
                  <span class="font-medium">{{ isProduction ? 'Production' : 'Development' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Access Level:</span>
                  <span class="font-medium">{{ accessLevel }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Site Mode:</span>
                  <span class="font-medium">{{ shouldShowComingSoon ? 'Coming Soon' : 'Full Site' }}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 class="font-medium text-gray-900 mb-3">
                Quick Links
              </h3>
              <div class="space-y-2">
                <ui-button
                  variant="outline"
                  size="sm"
                  class="w-full justify-start"
                  @click="navigateTo('/')"
                >
                  <icon
                    name="lucide:home"
                    class="w-4 h-4 mr-2"
                  />
                  Home Page
                </ui-button>
                <ui-button
                  variant="outline"
                  size="sm"
                  class="w-full justify-start"
                  @click="navigateTo('/coming-soon')"
                >
                  <icon
                    name="lucide:construction"
                    class="w-4 h-4 mr-2"
                  />
                  Coming Soon Page
                </ui-button>
                <ui-button
                  variant="outline"
                  size="sm"
                  class="w-full justify-start"
                  @click="clearAccess"
                >
                  <icon
                    name="lucide:log-out"
                    class="w-4 h-4 mr-2"
                  />
                  Clear Access Parameters
                </ui-button>
              </div>
            </div>
          </div>
        </div>
      </ui-card>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO
useHead({
  title: 'Admin Dashboard - MysuruTrip',
  meta: [
    { name: 'description', content: 'Admin dashboard for MysuruTrip management' },
    { name: 'robots', content: 'noindex, nofollow' },
  ],
});

const {
  isProduction,
  hasAdminAccess,
  accessLevel,
  shouldShowComingSoon,
  clearAccessParams,
} = useAccessControl();

// Redirect if not admin access
if (!hasAdminAccess.value) {
  throw createError({
    statusCode: 403,
    statusMessage: 'Admin access required',
  });
}

const clearAccess = () => {
  window.location.href = clearAccessParams();
};
</script>
