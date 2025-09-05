<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Get Your Perfect Trip Quote
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Tell us about your dream vacation and we'll create a personalized package just for you
        </p>
      </div>

      <!-- Wishlist Summary -->
      <div
        v-if="wishlistStore && wishlistStore.itemCount > 0"
        class="mb-8"
      >
        <ui-card class="bg-orange-50 border-orange-200">
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <icon-heart
                variant="filled"
                size="md"
                class="text-red-500"
              />
              Your Wishlist Items
            </h3>
            <div class="grid md:grid-cols-3 gap-4 mb-4">
              <div
                v-for="item in wishlistStore.items"
                :key="item.id"
                class="flex items-center gap-3 p-3 bg-white rounded-lg border"
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
                  v-if="item.id"
                  class="p-1 hover:bg-red-100 rounded transition-colors text-red-500"
                  title="Remove from wishlist"
                  @click="removeFromWishlist(item.id)"
                >
                  <icon
                    name="lucide:x"
                    class="w-4 h-4"
                  />
                </button>
              </div>
            </div>
            <p class="text-sm text-gray-600">
              These items will be included in your quote request
            </p>
          </div>
        </ui-card>
      </div>

      <!-- Debug Display -->
      <!-- <div class="mb-4 p-4 bg-gray-100 rounded">
        <h3 class="font-medium mb-2">
          Debug Info:
        </h3>
        <p>
          <strong>Form Values:</strong> {{ formValues }}
        </p>
      </div> -->

      <!-- Trip Request Form -->
      <ui-card class="shadow-xl">
        <form
          class="p-8"
          @submit="onSubmit"
          @keydown.enter.prevent
        >
          <div class="grid md:grid-cols-2 gap-8">
            <!-- Left Column -->
            <div class="space-y-6">
              <!-- Trip Type -->
              <ui-form-field
                v-slot="{ componentField }"
                name="tripType"
              >
                <ui-form-item>
                  <ui-form-label class="text-base font-medium">
                    What type of trip is this?
                  </ui-form-label>
                  <ui-form-control>
                    <ui-select v-bind="componentField">
                      <ui-select-trigger>
                        <ui-select-value placeholder="Select trip type" />
                      </ui-select-trigger>
                      <ui-select-content>
                        <ui-select-item value="honeymoon">
                          💕 Honeymoon
                        </ui-select-item>
                        <ui-select-item value="family">
                          👨‍👩‍👧‍👦 Family Vacation
                        </ui-select-item>
                        <ui-select-item value="business">
                          💼 Business Trip
                        </ui-select-item>
                        <ui-select-item value="friends">
                          👥 Friends Getaway
                        </ui-select-item>
                        <ui-select-item value="solo">
                          🧳 Solo Adventure
                        </ui-select-item>
                      </ui-select-content>
                    </ui-select>
                  </ui-form-control>
                  <ui-form-message />
                </ui-form-item>
              </ui-form-field>

              <!-- Dates -->
              <div class="grid grid-cols-2 gap-4">
                <!-- Check-in Date -->
                <ui-form-field name="checkIn">
                  <ui-form-item>
                    <ui-form-label>Check-in Date</ui-form-label>
                    <ui-popover>
                      <ui-popover-trigger as-child>
                        <ui-form-control>
                          <ui-button
                            variant="outline"
                            :class="[
                              'w-full justify-start text-left font-normal',
                              !checkInDate && 'text-muted-foreground',
                            ]"
                          >
                            <icon
                              name="lucide:calendar"
                              class="mr-2 h-4 w-4"
                            />
                            {{ checkInDate ? formatDate(checkInDate) : 'Pick a date' }}
                          </ui-button>
                          <input hidden>
                        </ui-form-control>
                      </ui-popover-trigger>
                      <ui-popover-content class="w-auto p-0">
                        <ui-calendar
                          v-model="checkInDate"
                          :min-value="today(getLocalTimeZone())"
                          @update:model-value="(v) => handleSetCheckInDate(v)"
                        />
                      </ui-popover-content>
                    </ui-popover>
                    <ui-form-message />
                  </ui-form-item>
                </ui-form-field>

                <!-- Check-out Date -->
                <ui-form-field name="checkOut">
                  <ui-form-item>
                    <ui-form-label>Check-out Date</ui-form-label>
                    <ui-popover>
                      <ui-popover-trigger as-child>
                        <ui-form-control>
                          <ui-button
                            variant="outline"
                            :class="[
                              'w-full justify-start text-left font-normal',
                              !checkOutDate && 'text-muted-foreground',
                            ]"
                          >
                            <icon
                              name="lucide:calendar"
                              class="mr-2 h-4 w-4"
                            />
                            {{ checkOutDate ? formatDate(checkOutDate) : 'Pick a date' }}
                          </ui-button>
                          <input hidden>
                        </ui-form-control>
                      </ui-popover-trigger>
                      <ui-popover-content class="w-auto p-0">
                        <ui-calendar
                          v-model="checkOutDate"
                          :min-value="checkInDate ? addDays(checkInDate, 1) : addDays(today(getLocalTimeZone()), 1)"
                          @update:model-value="(v) => handleSetCheckOutDate(v)"
                        />
                      </ui-popover-content>
                    </ui-popover>
                    <ui-form-message />
                  </ui-form-item>
                </ui-form-field>
              </div>

              <!-- Guest Count -->
              <ui-form-field
                v-slot="{ componentField }"
                name="guestCount"
              >
                <ui-form-item>
                  <ui-form-label>Number of Guests</ui-form-label>
                  <ui-form-control>
                    <ui-select v-bind="componentField">
                      <ui-select-trigger>
                        <ui-select-value placeholder="Select guest count" />
                      </ui-select-trigger>
                      <ui-select-content>
                        <ui-select-item value="1">
                          1 Guest
                        </ui-select-item>
                        <ui-select-item value="2">
                          2 Guests
                        </ui-select-item>
                        <ui-select-item value="3">
                          3 Guests
                        </ui-select-item>
                        <ui-select-item value="4">
                          4 Guests
                        </ui-select-item>
                        <ui-select-item value="5">
                          5 Guests
                        </ui-select-item>
                        <ui-select-item value="6">
                          6+ Guests
                        </ui-select-item>
                      </ui-select-content>
                    </ui-select>
                  </ui-form-control>
                  <ui-form-message />
                </ui-form-item>
              </ui-form-field>

              <!-- Food Preferences -->
              <div class="space-y-3">
                <h3 class="text-base font-medium">
                  Food Preferences
                </h3>
                <div class="grid grid-cols-2 gap-3">
                  <ui-form-field
                    v-for="pref in foodPreferenceOptions"
                    :key="pref.value"
                    v-slot="{ value, handleChange }"
                    type="checkbox"
                    :name="`foodPreferences.${pref.value}`"
                  >
                    <ui-form-item class="flex flex-row items-start gap-x-3 space-y-0 bg-gray-50 hover:bg-gray-100 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer group">
                      <ui-form-control>
                        <ui-checkbox
                          :model-value="value"
                          @update:model-value="handleChange"
                        />
                      </ui-form-control>
                      <div class="space-y-1 leading-none">
                        <ui-form-label class="text-sm font-medium cursor-pointer group-hover:text-gray-700 transition-colors">
                          {{ pref.emoji }} {{ pref.label }}
                        </ui-form-label>
                        <ui-form-message />
                      </div>
                    </ui-form-item>
                  </ui-form-field>
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-6">
              <!-- Add-ons -->
              <div class="space-y-3">
                <h3 class="text-base font-medium">
                  Add-ons & Services
                </h3>
                <div class="space-y-3">
                  <ui-form-field
                    v-for="addon in addOns"
                    :key="addon.value"
                    v-slot="{ value, handleChange }"
                    type="checkbox"
                    :name="`addOns.${addon.value}`"
                  >
                    <ui-form-item class="flex flex-row items-start gap-x-3 space-y-0 bg-gray-50 hover:bg-gray-100 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer group">
                      <ui-form-control>
                        <ui-checkbox
                          :model-value="value"
                          @update:model-value="handleChange"
                        />
                      </ui-form-control>
                      <div class="space-y-1 leading-none">
                        <ui-form-label class="font-medium cursor-pointer group-hover:text-gray-700 transition-colors">
                          {{ addon.emoji }} {{ addon.label }}
                        </ui-form-label>
                        <p class="text-sm text-gray-600">
                          {{ addon.description }}
                        </p>
                        <ui-form-message />
                      </div>
                    </ui-form-item>
                  </ui-form-field>
                </div>
              </div>

              <!-- Contact Information -->
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-900">
                  Contact Information
                </h3>

                <!-- Full Name -->
                <ui-form-field
                  v-slot="{ componentField }"
                  name="contactInfo.name"
                >
                  <ui-form-item>
                    <ui-form-label>Full Name</ui-form-label>
                    <ui-form-control>
                      <ui-input
                        v-bind="componentField"
                        placeholder="Enter your full name"
                        autocomplete="off"
                      />
                    </ui-form-control>
                    <ui-form-message />
                  </ui-form-item>
                </ui-form-field>

                <!-- Email -->
                <ui-form-field
                  v-slot="{ componentField }"
                  name="contactInfo.email"
                >
                  <ui-form-item>
                    <ui-form-label>Email Address</ui-form-label>
                    <ui-form-control>
                      <ui-input
                        v-bind="componentField"
                        type="email"
                        placeholder="Enter your email"
                        autocomplete="off"
                      />
                    </ui-form-control>
                    <ui-form-message />
                  </ui-form-item>
                </ui-form-field>

                <!-- Phone -->
                <ui-form-field
                  v-slot="{ componentField }"
                  name="contactInfo.phone"
                >
                  <ui-form-item>
                    <ui-form-label>Phone Number</ui-form-label>
                    <ui-form-control>
                      <ui-input
                        v-bind="componentField"
                        type="tel"
                        placeholder="Enter your phone number"
                        autocomplete="off"
                      />
                    </ui-form-control>
                    <ui-form-message />
                  </ui-form-item>
                </ui-form-field>

                <!-- WhatsApp Opt-in -->
                <ui-form-field
                  v-slot="{ value, handleChange }"
                  type="checkbox"
                  name="contactInfo.whatsappOptIn"
                >
                  <ui-form-item class="flex flex-row items-center gap-x-2 space-y-0">
                    <ui-form-control>
                      <ui-checkbox
                        :model-value="value"
                        @update:model-value="handleChange"
                      />
                    </ui-form-control>
                    <ui-form-label class="text-sm font-normal">
                      Send me updates and offers via WhatsApp
                    </ui-form-label>
                  </ui-form-item>
                </ui-form-field>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="mt-8 pt-6 border-t border-gray-200">
            <ui-button
              type="submit"
              size="lg"
              class="w-full bg-orange-500 hover:bg-orange-600 text-white"
              :disabled="isSubmitting"
            >
              <icon
                name="lucide:message-square"
                class="w-5 h-5 mr-2"
              />
              {{ isSubmitting ? 'Sending Request...' : 'Get My Best Quote' }}
            </ui-button>
          </div>
        </form>
      </ui-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { getLocalTimeZone, today } from '@internationalized/date';
import { toDate } from 'reka-ui/date';
import type { DateValue } from '@internationalized/date';

// SEO
useHead({
  title: 'Get Your Perfect Trip Quote - Mysuru Tourism',
  meta: [
    { name: 'description', content: 'Get personalized quotes for your Mysuru adventure. Tell us about your dream vacation and we\'ll create the perfect package for you.' },
  ],
});

// Stores
const wishlistStore = useWishlistStore();
const leadsStore = useLeadsStore();

// Form validation schema
const formSchema = toTypedSchema(z.object({
  tripType: z.enum(['honeymoon', 'family', 'business', 'friends', 'solo']),
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  guestCount: z.string().min(1, 'Guest count is required'),
  foodPreferences: z.record(z.string(), z.boolean()).optional(),
  addOns: z.record(z.string(), z.boolean()).optional(),
  contactInfo: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    phone: z.string().min(10, 'Please enter a valid phone number'),
    whatsappOptIn: z.boolean(),
  }),
}));

// Form setup
const { handleSubmit, setFieldValue, values: formValues } = useForm({
  validationSchema: formSchema,
  initialValues: {
    tripType: 'honeymoon',
    checkIn: '',
    checkOut: '',
    guestCount: '2',
    foodPreferences: {},
    addOns: {},
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      whatsappOptIn: false,
    },
  },
});

const isSubmitting = ref(false);

// Date handling
const checkInDate = ref<DateValue>();
const checkOutDate = ref<DateValue>();

// Helper functions
const formatDate = (date: DateValue) => {
  return toDate(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const addDays = (date: DateValue, days: number): DateValue => {
  const newDate = toDate(date);
  newDate.setDate(newDate.getDate() + days);
  return date.copy().add({ days });
};

const handleSetCheckInDate = (v: DateValue | undefined) => {
  checkInDate.value = v;
  setFieldValue('checkIn', v ? v.toString() : '');

  // Reset check-out date if it's before or same as check-in date
  if (v && checkOutDate.value && checkOutDate.value <= v) {
    checkOutDate.value = undefined;
    setFieldValue('checkOut', '');
  }
};

const handleSetCheckOutDate = (v: DateValue | undefined) => {
  checkOutDate.value = v;
  setFieldValue('checkOut', v ? v.toString() : '');
};

// Data
const foodPreferenceOptions = [
  { value: 'vegetarian', label: 'Vegetarian', emoji: '🥗' },
  { value: 'non-vegetarian', label: 'Non-Vegetarian', emoji: '🍗' },
  { value: 'vegan', label: 'Vegan', emoji: '🌱' },
  { value: 'jain', label: 'Jain', emoji: '🙏' },
  { value: 'halal', label: 'Halal', emoji: '🕌' },
  { value: 'gluten-free', label: 'Gluten-Free', emoji: '🌾' },
];

const addOns = [
  { value: 'campfire', label: 'Campfire Experience', description: 'Evening bonfire with snacks', emoji: '🔥' },
  { value: 'spa', label: 'Spa & Wellness', description: 'Relaxing spa treatments', emoji: '💆‍♀️' },
  { value: 'taxi', label: 'Local Transport', description: 'Airport pickup & local tours', emoji: '🚗' },
  { value: 'guide', label: 'Professional Guide', description: 'Expert local tour guide', emoji: '🗺️' },
  { value: 'photography', label: 'Photography', description: 'Professional photo session', emoji: '📸' },
];

// Methods
const removeFromWishlist = (id: string) => {
  if (wishlistStore) {
    wishlistStore.removeItem(id);
  }
};

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;

  try {
    // Transform checkbox records to arrays
    const selectedFoodPreferences = Object.keys(values.foodPreferences || {}).filter(
      key => values.foodPreferences?.[key],
    );

    const selectedAddOns = Object.keys(values.addOns || {}).filter(
      key => values.addOns?.[key],
    );

    // Create lead
    const _lead = leadsStore.addLead({
      tripType: values.tripType,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      guestCount: parseInt(values.guestCount),
      foodPreferences: selectedFoodPreferences,
      addOns: selectedAddOns,
      contactInfo: {
        name: values.contactInfo.name,
        email: values.contactInfo.email,
        phone: values.contactInfo.phone,
        whatsappOptIn: Boolean(values.contactInfo.whatsappOptIn),
      },
      wishlistItems: wishlistStore ? wishlistStore.items.map(item => item.id) : [],
    });

    // Clear wishlist after successful submission
    if (wishlistStore) {
      wishlistStore.clearWishlist();
    }

    // Show success message
    alert('Thank you! Your quote request has been submitted successfully. We\'ll get back to you within 24 hours.');

    // Navigate back to home
    navigateTo('/');
  }
  catch (error) {
    console.error('Error submitting form:', error);
    alert('There was an error submitting your request. Please try again.');
  }
  finally {
    isSubmitting.value = false;
  }
});
</script>
