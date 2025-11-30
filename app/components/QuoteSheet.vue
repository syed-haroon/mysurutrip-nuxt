<template>
  <ui-sheet v-model:open="isOpen">
    <ui-sheet-content class="w-full sm:max-w-2xl overflow-y-auto">
      <ui-sheet-header>
        <ui-sheet-title class="text-xl sm:text-2xl font-bold text-gray-900">
          Get Your Perfect Trip Quote
        </ui-sheet-title>
        <ui-sheet-description class="text-sm sm:text-base text-gray-600">
          Tell us about your dream vacation and we'll create a personalized package just for you
        </ui-sheet-description>
      </ui-sheet-header>

      <div class="p-4">
        <!-- Wishlist Summary -->
        <div
          v-if="wishlistStore && wishlistStore.itemCount > 0"
          class="mb-6"
        >
          <ui-card class="bg-orange-50 border-orange-200 p-0">
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <icon-heart
                  variant="filled"
                  size="md"
                  class="text-red-500"
                />
                Your Wishlist Items
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div
                  v-for="item in wishlistStore.items"
                  :key="item.id"
                  class="flex items-center gap-3 p-2 bg-white rounded-lg border"
                >
                  <img
                    :src="item.image"
                    :alt="item.title"
                    class="w-10 h-10 object-cover rounded"
                  >
                  <div class="flex-1 min-w-0">
                    <h4 class="font-medium text-gray-900 truncate text-sm">
                      {{ item.displayName || item.title }}
                    </h4>
                    <p class="text-xs text-gray-600">
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
                      class="w-3 h-3"
                    />
                  </button>
                </div>
              </div>
              <p class="text-xs text-gray-600">
                These items will be included in your quote request
              </p>
            </div>
          </ui-card>
        </div>

        <!-- Trip Request Form -->
        <form
          @submit="onSubmit"
          @keydown.enter.prevent
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <!-- Left Column -->
            <div class="space-y-4">
              <!-- Contact Information -->
              <div class="space-y-3">
                <h3 class="text-base font-medium text-gray-900">
                  Contact Information
                </h3>

                <!-- Full Name -->
                <ui-form-field
                  v-slot="{ componentField }"
                  name="contactInfo.name"
                >
                  <ui-form-item>
                    <ui-form-label class="text-sm">
                      Full Name
                    </ui-form-label>
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
                    <ui-form-label class="text-sm">
                      Email Address
                    </ui-form-label>
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
                    <ui-form-label class="text-sm">
                      Phone Number
                    </ui-form-label>
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
              </div>

              <!-- Dates -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <!-- Check-in Date -->
                <ui-form-field name="checkIn">
                  <ui-form-item>
                    <ui-form-label class="text-sm">
                      Check-in Date
                    </ui-form-label>
                    <ui-popover>
                      <ui-popover-trigger as-child>
                        <ui-form-control>
                          <ui-button
                            variant="outline"
                            :class="[
                              'w-full justify-start text-left font-normal text-sm',
                              !checkInDate && 'text-muted-foreground',
                            ]"
                          >
                            <icon
                              name="lucide:calendar"
                              class="mr-2 h-3 w-3"
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
                          @update:model-value="v => handleSetCheckInDate(v)"
                        />
                      </ui-popover-content>
                    </ui-popover>
                    <ui-form-message />
                  </ui-form-item>
                </ui-form-field>

                <!-- Check-out Date -->
                <ui-form-field name="checkOut">
                  <ui-form-item>
                    <ui-form-label class="text-sm">
                      Check-out Date
                    </ui-form-label>
                    <ui-popover>
                      <ui-popover-trigger as-child>
                        <ui-form-control>
                          <ui-button
                            variant="outline"
                            :class="[
                              'w-full justify-start text-left font-normal text-sm',
                              !checkOutDate && 'text-muted-foreground',
                            ]"
                          >
                            <icon
                              name="lucide:calendar"
                              class="mr-2 h-3 w-3"
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
                          @update:model-value="v => handleSetCheckOutDate(v)"
                        />
                      </ui-popover-content>
                    </ui-popover>
                    <ui-form-message />
                  </ui-form-item>
                </ui-form-field>
              </div>

              <!-- Trip Type -->
              <ui-form-field
                v-slot="{ componentField }"
                name="tripType"
              >
                <ui-form-item>
                  <ui-form-label class="text-sm font-medium">
                    What type of trip is this?
                  </ui-form-label>
                  <ui-form-control>
                    <ui-select v-bind="componentField">
                      <ui-select-trigger class="w-full">
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

              <!-- Guest Count -->
              <ui-form-field
                v-slot="{ componentField }"
                name="guestCount"
              >
                <ui-form-item>
                  <ui-form-label class="text-sm">
                    Number of Guests
                  </ui-form-label>
                  <ui-form-control>
                    <ui-select v-bind="componentField">
                      <ui-select-trigger class="w-full">
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
            </div>

            <!-- Right Column -->
            <div class="space-y-4">
              <!-- Food Preferences -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">
                  Food Preferences
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <ui-form-field
                    v-for="pref in foodPreferenceOptions"
                    :key="pref.value"
                    v-slot="{ value, handleChange }"
                    type="checkbox"
                    :name="`foodPreferences.${pref.value}`"
                  >
                    <ui-form-item
                      :class="[
                        'relative flex flex-row items-start space-y-0 p-3 rounded-lg border transition-all cursor-pointer group',
                        value
                          ? 'bg-orange-50 border-orange-300 hover:bg-orange-100 hover:border-orange-400'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300',
                      ]"
                      @click="handleChange(!value)"
                    >
                      <ui-form-control class="invisible absolute w-0 h-0">
                        <ui-checkbox
                          :model-value="value"
                          @update:model-value="handleChange"
                        />
                      </ui-form-control>
                      <div class="space-y-1 leading-none">
                        <ui-form-label
                          :class="[
                            'text-xs font-medium cursor-pointer transition-colors',
                            value ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900',
                          ]"
                        >
                          {{ pref.emoji }} {{ pref.label }}
                        </ui-form-label>
                        <ui-form-message />
                      </div>
                    </ui-form-item>
                  </ui-form-field>
                </div>
              </div>

              <!-- Add-ons -->
              <div class="space-y-2">
                <h3 class="text-sm font-medium">
                  Add-ons & Services
                </h3>
                <div class="space-y-2">
                  <ui-form-field
                    v-for="addon in addOns"
                    :key="addon.value"
                    v-slot="{ value, handleChange }"
                    type="checkbox"
                    :name="`addOns.${addon.value}`"
                  >
                    <ui-form-item
                      :class="[
                        'relative flex flex-row items-start space-y-0 p-3 rounded-lg border transition-all cursor-pointer group',
                        value
                          ? 'bg-orange-50 border-orange-300 hover:bg-orange-100 hover:border-orange-400'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300',
                      ]"
                      @click="handleChange(!value)"
                    >
                      <ui-form-control class="invisible absolute w-0 h-0">
                        <ui-checkbox
                          :model-value="value"
                          @update:model-value="handleChange"
                        />
                      </ui-form-control>
                      <div class="space-y-1 leading-none">
                        <ui-form-label
                          :class="[
                            'text-xs font-medium cursor-pointer transition-colors',
                            value ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900',
                          ]"
                        >
                          {{ addon.emoji }} {{ addon.label }}
                        </ui-form-label>
                        <p class="text-xs text-gray-600">
                          {{ addon.description }}
                        </p>
                        <ui-form-message />
                      </div>
                    </ui-form-item>
                  </ui-form-field>
                </div>
              </div>
            </div>
          </div>

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
              <ui-form-label class="text-xs font-normal">
                Send me updates and offers via WhatsApp
              </ui-form-label>
            </ui-form-item>
          </ui-form-field>

          <!-- Submit Button -->
          <div class="mt-6 pt-4 border-t border-gray-200">
            <ui-button
              type="submit"
              size="lg"
              class="w-full bg-orange-500 hover:bg-orange-600 text-white"
              :disabled="isSubmitting"
            >
              <icon
                name="lucide:message-square"
                class="w-4 h-4 mr-2"
              />
              {{ isSubmitting ? 'Sending Request...' : 'Get My Best Quote' }}
            </ui-button>
          </div>
        </form>
      </div>
    </ui-sheet-content>
  </ui-sheet>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { getLocalTimeZone, today } from '@internationalized/date';
import { toDate } from 'reka-ui/date';
import type { DateValue } from '@internationalized/date';

interface Props {
  open?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

// Computed for v-model
const isOpen = computed({
  get: () => props.open ?? false,
  set: value => emit('update:open', value),
});

// Stores
const wishlistStore = useWishlistStore();
const leadsStore = useLeadsStore();
const siteStore = useSiteStore();

// Form validation schema
const formSchema = toTypedSchema(z.object({
  tripType: z.enum(['honeymoon', 'family', 'business', 'friends', 'solo']),
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  guestCount: z.string().min(1, 'Guest count is required'),
  foodPreferences: z.object({
    vegetarian: z.boolean().optional(),
    nonVegetarian: z.boolean().optional(),
    vegan: z.boolean().optional(),
    jain: z.boolean().optional(),
    halal: z.boolean().optional(),
    glutenFree: z.boolean().optional(),
  }).optional(),
  addOns: z.object({
    campfire: z.boolean().optional(),
    spa: z.boolean().optional(),
    taxi: z.boolean().optional(),
    guide: z.boolean().optional(),
    photography: z.boolean().optional(),
  }).optional(),
  contactInfo: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    phone: z.string().min(10, 'Please enter a valid phone number'),
    whatsappOptIn: z.boolean(),
  }),
}));

// Form setup
const { handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: {
    tripType: 'honeymoon',
    checkIn: '',
    checkOut: '',
    guestCount: '2',
    foodPreferences: {
      vegetarian: false,
      nonVegetarian: false,
      vegan: false,
      jain: false,
      halal: false,
      glutenFree: false,
    },
    addOns: {
      campfire: false,
      spa: false,
      taxi: false,
      guide: false,
      photography: false,
    },
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
  { value: 'nonVegetarian', label: 'Non-Vegetarian', emoji: '🍗' },
  { value: 'vegan', label: 'Vegan', emoji: '🌱' },
  { value: 'jain', label: 'Jain', emoji: '🙏' },
  { value: 'halal', label: 'Halal', emoji: '🕌' },
  { value: 'glutenFree', label: 'Gluten-Free', emoji: '🌾' },
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
    // Prepare data for API submission
    const formData = {
      tripType: values.tripType,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      guestCount: values.guestCount,
      foodPreferences: values.foodPreferences || {},
      addOns: values.addOns || {},
      contactInfo: {
        name: values.contactInfo.name,
        email: values.contactInfo.email,
        phone: values.contactInfo.phone,
        whatsappOptIn: Boolean(values.contactInfo.whatsappOptIn),
      },
      wishlistItems: wishlistStore
        ? wishlistStore.items.map(item => ({
            id: item.id,
            type: item.type,
            title: item.title,
            displayName: item.displayName,
            location: item.location,
          }))
        : [],
    };

    // Submit to API endpoint
    const response = await $fetch('/api/getQuote', {
      method: 'POST',
      body: formData,
    });

    if (response.success) {
      // Also store in local leads store for admin purposes
      const _lead = leadsStore.addLead({
        tripType: values.tripType,
        checkIn: values.checkIn,
        checkOut: values.checkOut,
        guestCount: parseInt(values.guestCount),
        foodPreferences: Object.keys(values.foodPreferences || {}).filter(
          key => values.foodPreferences?.[key],
        ),
        addOns: Object.keys(values.addOns || {}).filter(
          key => values.addOns?.[key],
        ),
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

      // Close the sheet
      siteStore.closeQuoteSheet();
    }
    else {
      throw new Error('Failed to submit quote request');
    }
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
