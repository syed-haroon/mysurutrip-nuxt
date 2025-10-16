<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Access
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Enter admin password to access administrative features
        </p>
      </div>

      <form
        class="mt-8 space-y-6"
        @submit.prevent="handleLogin"
      >
        <div>
          <label
            for="password"
            class="sr-only"
          >Admin Password</label>
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            required
            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Admin Password"
          >
        </div>

        <div
          v-if="error"
          class="text-red-600 text-sm text-center"
        >
          {{ error }}
        </div>

        <div>
          <ui-button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            :disabled="loading"
          >
            <span
              v-if="loading"
              class="absolute left-0 inset-y-0 flex items-center pl-3"
            >
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            </span>
            {{ loading ? 'Authenticating...' : 'Access Admin Panel' }}
          </ui-button>
        </div>

        <div class="text-center">
          <p class="text-xs text-gray-500">
            Admin access allows you to see real hotel names and other administrative information.
            <br>
            Access expires when you refresh the page.
          </p>
        </div>
      </form>

      <!-- Admin Panel (shown after successful login) -->
      <div
        v-if="isAdmin"
        class="mt-8 bg-white p-6 rounded-lg shadow"
      >
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Admin Panel
        </h3>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Admin Status:</span>
            <ui-badge
              variant="default"
              class="bg-green-100 text-green-800"
            >
              Authenticated
            </ui-badge>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Real Names Visible:</span>
            <ui-badge
              variant="default"
              class="bg-blue-100 text-blue-800"
            >
              Enabled
            </ui-badge>
          </div>
        </div>

        <div class="mt-6 space-y-3">
          <ui-button
            as="nuxt-link"
            to="/hotels"
            variant="outline"
            class="w-full"
          >
            View Hotels (Admin Mode)
          </ui-button>

          <ui-button
            variant="outline"
            class="w-full text-red-600 border-red-300 hover:bg-red-50"
            @click="logoutAdmin"
          >
            Logout Admin
          </ui-button>
        </div>

        <div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p class="text-xs text-yellow-800">
            <strong>Note:</strong> Admin access is temporary and will expire when you refresh the page or navigate away.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO
useHead({
  title: 'Admin Access - Mysuru Tours',
  meta: [
    { name: 'description', content: 'Admin access panel for Mysuru Tours' },
    { name: 'robots', content: 'noindex, nofollow' },
  ],
});

// Store
const siteStore = useSiteStore();
const { isAdmin, logoutAdmin } = storeToRefs(siteStore);

// State
const password = ref('');
const error = ref('');
const loading = ref(false);

// Methods
const handleLogin = async () => {
  loading.value = true;
  error.value = '';

  // Simulate loading
  await new Promise(resolve => setTimeout(resolve, 500));

  const success = siteStore.authenticateAdmin(password.value);

  if (success) {
    password.value = '';
    // Redirect to hotels page to see admin features
    await navigateTo('/hotels');
  }
  else {
    error.value = 'Invalid admin password';
  }

  loading.value = false;
};

// Check for admin password in URL on mount
onMounted(() => {
  siteStore.checkAdminFromUrl();
});
</script>
