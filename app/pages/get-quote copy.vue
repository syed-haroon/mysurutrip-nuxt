<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 opacity-20">
      <div class="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
      <div class="absolute top-40 right-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000" />
      <div class="absolute -bottom-8 left-1/3 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000" />
    </div>

    <div class="relative z-10 py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <!-- Hero Header -->
        <div class="text-center mb-16">
          <div class="inline-block">
            <h1 class="text-6xl md:text-7xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6 animate-fade-in">
              Your Dream Trip
            </h1>
            <div class="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6 rounded-full animate-pulse" />
          </div>
          <p class="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light leading-relaxed animate-slide-up">
            ✨ Tell us your vision, and we'll craft the perfect adventure just for you
          </p>
        </div>

        <!-- Wishlist Summary -->
        <div
          v-if="wishlistStore && wishlistStore.itemCount > 0"
          class="mb-12 animate-slide-up"
        >
          <div class="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-lg border border-orange-300/30 rounded-3xl p-8 shadow-2xl">
            <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div class="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-bounce">
                <icon-heart
                  variant="filled"
                  size="sm"
                  class="text-white"
                />
              </div>
              Your Wishlist Collection
            </h3>
            <div class="grid md:grid-cols-3 gap-4 mb-6">
              <div
                v-for="(item, index) in wishlistStore.items"
                :key="item.id"
                class="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
                :style="{ animationDelay: `${index * 100}ms` }"
              >
                <div class="flex items-center gap-4">
                  <div class="relative overflow-hidden rounded-xl">
                    <img
                      :src="item.image"
                      :alt="item.title"
                      class="w-16 h-16 object-cover transition-transform duration-300 group-hover:scale-110"
                    >
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-bold text-white truncate group-hover:text-purple-200 transition-colors">
                      {{ item.title }}
                    </h4>
                    <p class="text-blue-200 text-sm">
                      📍 {{ item.location }}
                    </p>
                  </div>
                  <button
                    v-if="item.id"
                    class="w-8 h-8 flex items-center justify-center bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white rounded-full transition-all duration-300 transform hover:scale-110"
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
            </div>
            <p class="text-blue-200 text-sm flex items-center gap-2">
              <icon
                name="lucide:sparkles"
                class="w-4 h-4"
              />
              These magical destinations will be included in your personalized quote
            </p>
          </div>
        </div>

        <div>{{ formValues }}</div>

        <!-- Trip Request Form -->
        <div class="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
          <!-- Form Progress Indicator -->
          <div class="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
            <div class="flex items-center justify-between text-white">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <icon
                    name="lucide:map-pin"
                    class="w-5 h-5"
                  />
                </div>
                <div>
                  <h2 class="text-2xl font-bold">
                    Trip Details
                  </h2>
                  <p class="text-purple-100">
                    Step 1 of 1 - Let's plan your adventure
                  </p>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm opacity-80">
                  Estimated completion
                </div>
                <div class="text-lg font-bold">
                  2-3 minutes
                </div>
              </div>
            </div>
          </div>

          <form
            class="p-8 md:p-12"
            @submit="onSubmit"
            @keydown.enter.prevent
          >
            <div class="grid lg:grid-cols-2 gap-12">
              <!-- Left Column -->
              <div class="space-y-8">
                <!-- Trip Type -->
                <div class="space-y-4">
                  <h3 class="text-xl font-bold text-white flex items-center gap-2">
                    <icon
                      name="lucide:compass"
                      class="w-5 h-5 text-purple-400"
                    />
                    What's your vibe?
                  </h3>
                  <ui-form-field
                    v-slot="{ componentField }"
                    name="tripType"
                  >
                    <ui-form-item>
                      <ui-form-control>
                        <ui-select v-bind="componentField">
                          <ui-select-trigger class="h-14 bg-white/10 border-white/20 text-white placeholder:text-blue-200 rounded-2xl hover:bg-white/20 transition-all duration-300">
                            <ui-select-value placeholder="Choose your adventure style..." />
                          </ui-select-trigger>
                          <ui-select-content class="bg-slate-900 border-slate-700">
                            <ui-select-item
                              value="honeymoon"
                              class="hover:bg-purple-600/20 text-white"
                            >
                              💕 Romantic Honeymoon
                            </ui-select-item>
                            <ui-select-item
                              value="family"
                              class="hover:bg-purple-600/20 text-white"
                            >
                              👨‍👩‍👧‍👦 Family Adventure
                            </ui-select-item>
                            <ui-select-item
                              value="business"
                              class="hover:bg-purple-600/20 text-white"
                            >
                              💼 Business & Leisure
                            </ui-select-item>
                            <ui-select-item
                              value="friends"
                              class="hover:bg-purple-600/20 text-white"
                            >
                              👥 Friends Escape
                            </ui-select-item>
                            <ui-select-item
                              value="solo"
                              class="hover:bg-purple-600/20 text-white"
                            >
                              🧳 Solo Discovery
                            </ui-select-item>
                          </ui-select-content>
                        </ui-select>
                      </ui-form-control>
                      <ui-form-message class="text-red-300" />
                    </ui-form-item>
                  </ui-form-field>
                </div>

                <!-- Dates -->
                <div class="space-y-4">
                  <h3 class="text-xl font-bold text-white flex items-center gap-2">
                    <icon
                      name="lucide:calendar-days"
                      class="w-5 h-5 text-blue-400"
                    />
                    When's the magic happening?
                  </h3>
                  <div class="grid grid-cols-2 gap-6">
                    <!-- Check-in Date -->
                    <ui-form-field name="checkIn">
                      <ui-form-item>
                        <ui-form-label class="text-blue-200 font-medium">
                          Check-in
                        </ui-form-label>
                        <ui-popover>
                          <ui-popover-trigger as-child>
                            <ui-form-control>
                              <ui-button
                                variant="outline"
                                class="h-14 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-2xl transition-all duration-300 justify-start"
                              >
                                <icon
                                  name="lucide:calendar"
                                  class="mr-3 h-5 w-5 text-purple-400"
                                />
                                {{ checkInDate ? formatDate(checkInDate) : 'Select date' }}
                              </ui-button>
                              <input hidden>
                            </ui-form-control>
                          </ui-popover-trigger>
                          <ui-popover-content class="w-auto p-0 bg-slate-900 border-slate-700">
                            <ui-calendar
                              v-model="checkInDate"
                              :min-value="today(getLocalTimeZone())"
                              class="bg-slate-900 text-white"
                              @update:model-value="(v) => handleSetCheckInDate(v)"
                            />
                          </ui-popover-content>
                        </ui-popover>
                        <ui-form-message class="text-red-300" />
                      </ui-form-item>
                    </ui-form-field>

                    <!-- Check-out Date -->
                    <ui-form-field name="checkOut">
                      <ui-form-item>
                        <ui-form-label class="text-blue-200 font-medium">
                          Check-out
                        </ui-form-label>
                        <ui-popover>
                          <ui-popover-trigger as-child>
                            <ui-form-control>
                              <ui-button
                                variant="outline"
                                class="h-14 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-2xl transition-all duration-300 justify-start"
                              >
                                <icon
                                  name="lucide:calendar"
                                  class="mr-3 h-5 w-5 text-blue-400"
                                />
                                {{ checkOutDate ? formatDate(checkOutDate) : 'Select date' }}
                              </ui-button>
                              <input hidden>
                            </ui-form-control>
                          </ui-popover-trigger>
                          <ui-popover-content class="w-auto p-0 bg-slate-900 border-slate-700">
                            <ui-calendar
                              v-model="checkOutDate"
                              :min-value="checkInDate ? addDays(checkInDate, 1) : addDays(today(getLocalTimeZone()), 1)"
                              class="bg-slate-900 text-white"
                              @update:model-value="(v) => handleSetCheckOutDate(v)"
                            />
                          </ui-popover-content>
                        </ui-popover>
                        <ui-form-message class="text-red-300" />
                      </ui-form-item>
                    </ui-form-field>
                  </div>
                </div>

                <!-- Guest Count -->
                <div class="space-y-4">
                  <h3 class="text-xl font-bold text-white flex items-center gap-2">
                    <icon
                      name="lucide:users"
                      class="w-5 h-5 text-green-400"
                    />
                    Who's joining the adventure?
                  </h3>
                  <ui-form-field
                    v-slot="{ componentField }"
                    name="guestCount"
                  >
                    <ui-form-item>
                      <ui-form-control>
                        <ui-select v-bind="componentField">
                          <ui-select-trigger class="h-14 bg-white/10 border-white/20 text-white placeholder:text-blue-200 rounded-2xl hover:bg-white/20 transition-all duration-300">
                            <ui-select-value placeholder="How many travelers?" />
                          </ui-select-trigger>
                          <ui-select-content class="bg-slate-900 border-slate-700">
                            <ui-select-item
                              value="1"
                              class="hover:bg-purple-600/20 text-white"
                            >
                              🧳 Just me (1 Guest)
                            </ui-select-item>
                            <ui-select-item
                              value="2"
                              class="hover:bg-purple-600/20 text-white"
                            >
                              💑 Couple (2 Guests)
                            </ui-select-item>
                            <ui-select-item
                              value="3"
                              class="hover:bg-purple-600/20 text-white"
                            >
                              👨‍👩‍👧 Small group (3 Guests)
                            </ui-select-item>
                            <ui-select-item
                              value="4"
                              class="hover:bg-purple-600/20 text-white"
                            >
                              👨‍👩‍👧‍👦 Family (4 Guests)
                            </ui-select-item>
                            <ui-select-item
                              value="5"
                              class="hover:bg-purple-600/20 text-white"
                            >
                              👥 Squad (5 Guests)
                            </ui-select-item>
                            <ui-select-item
                              value="6"
                              class="hover:bg-purple-600/20 text-white"
                            >
                              🎉 Party (6+ Guests)
                            </ui-select-item>
                          </ui-select-content>
                        </ui-select>
                      </ui-form-control>
                      <ui-form-message class="text-red-300" />
                    </ui-form-item>
                  </ui-form-field>
                </div>

                <!-- Food Preferences -->
                <div class="space-y-4">
                  <h3 class="text-xl font-bold text-white flex items-center gap-2">
                    <icon
                      name="lucide:utensils"
                      class="w-5 h-5 text-yellow-400"
                    />
                    What tickles your taste buds?
                  </h3>
                  <ui-form-field name="foodPreferences">
                    <ui-form-item>
                      <ui-form-control>
                        <div class="grid grid-cols-2 gap-4">
                          <ui-form-field
                            v-for="pref in foodPreferenceOptions"
                            :key="pref.value"
                            v-slot="{ value, handleChange }"
                            type="checkbox"
                            :name="`foodPreferences.${pref.value}`"
                          >
                            <ui-form-item class="flex flex-row items-center gap-x-3 space-y-0 bg-white/5 hover:bg-white/10 p-4 rounded-2xl transition-all duration-300 cursor-pointer group">
                              <ui-form-control>
                                <ui-checkbox
                                  :checked="value"
                                  class="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                  @update:checked="handleChange"
                                />
                              </ui-form-control>
                              <ui-form-label class="text-white font-medium cursor-pointer group-hover:text-purple-200 transition-colors">
                                {{ pref.emoji }} {{ pref.label }}
                              </ui-form-label>
                            </ui-form-item>
                          </ui-form-field>
                        </div>
                      </ui-form-control>
                      <ui-form-message class="text-red-300" />
                    </ui-form-item>
                  </ui-form-field>
                </div>
              </div>

              <!-- Right Column -->
              <div class="space-y-8">
                <!-- Add-ons -->
                <div class="space-y-4">
                  <h3 class="text-xl font-bold text-white flex items-center gap-2">
                    <icon
                      name="lucide:sparkles"
                      class="w-5 h-5 text-pink-400"
                    />
                    Level up your experience
                  </h3>
                  <ui-form-field name="addOns">
                    <ui-form-item>
                      <ui-form-control>
                        <div class="space-y-4">
                          <ui-form-field
                            v-for="addon in addOns"
                            :key="addon.value"
                            v-slot="{ value, handleChange }"
                            type="checkbox"
                            :name="`addOns.${addon.value}`"
                          >
                            <ui-form-item class="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 rounded-2xl p-5 transition-all duration-300 space-y-0 cursor-pointer group">
                              <div class="flex items-center gap-4">
                                <ui-form-control>
                                  <ui-checkbox
                                    :checked="value"
                                    class="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                    @update:checked="handleChange"
                                  />
                                </ui-form-control>
                                <div class="flex-1">
                                  <ui-form-label class="text-white font-bold text-lg cursor-pointer group-hover:text-purple-200 transition-colors flex items-center gap-2">
                                    {{ addon.emoji }} {{ addon.label }}
                                  </ui-form-label>
                                  <p class="text-blue-200 text-sm mt-1">
                                    {{ addon.description }}
                                  </p>
                                </div>
                              </div>
                            </ui-form-item>
                          </ui-form-field>
                        </div>
                      </ui-form-control>
                      <ui-form-message class="text-red-300" />
                    </ui-form-item>
                  </ui-form-field>
                </div>

                <!-- Contact Information -->
                <div class="space-y-6 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
                  <h3 class="text-xl font-bold text-white flex items-center gap-2">
                    <icon
                      name="lucide:contact"
                      class="w-5 h-5 text-indigo-400"
                    />
                    Let's stay connected
                  </h3>

                  <!-- Full Name -->
                  <ui-form-field
                    v-slot="{ componentField }"
                    name="contactInfo.name"
                  >
                    <ui-form-item>
                      <ui-form-label class="text-blue-200 font-medium">
                        Your name
                      </ui-form-label>
                      <ui-form-control>
                        <div class="relative">
                          <ui-input
                            v-bind="componentField"
                            placeholder="What should we call you?"
                            class="h-12 bg-white/10 border-white/20 text-white placeholder:text-blue-300 rounded-xl pl-12 hover:bg-white/15 transition-all duration-300"
                            autocomplete="off"
                          />
                          <icon
                            name="lucide:user"
                            class="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400"
                          />
                        </div>
                      </ui-form-control>
                      <ui-form-message class="text-red-300" />
                    </ui-form-item>
                  </ui-form-field>

                  <!-- Email -->
                  <ui-form-field
                    v-slot="{ componentField }"
                    name="contactInfo.email"
                  >
                    <ui-form-item>
                      <ui-form-label class="text-blue-200 font-medium">
                        Email address
                      </ui-form-label>
                      <ui-form-control>
                        <div class="relative">
                          <ui-input
                            v-bind="componentField"
                            type="email"
                            placeholder="your.email@example.com"
                            class="h-12 bg-white/10 border-white/20 text-white placeholder:text-blue-300 rounded-xl pl-12 hover:bg-white/15 transition-all duration-300"
                            autocomplete="off"
                          />
                          <icon
                            name="lucide:mail"
                            class="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400"
                          />
                        </div>
                      </ui-form-control>
                      <ui-form-message class="text-red-300" />
                    </ui-form-item>
                  </ui-form-field>

                  <!-- Phone -->
                  <ui-form-field
                    v-slot="{ componentField }"
                    name="contactInfo.phone"
                  >
                    <ui-form-item>
                      <ui-form-label class="text-blue-200 font-medium">
                        Phone number
                      </ui-form-label>
                      <ui-form-control>
                        <div class="relative">
                          <ui-input
                            v-bind="componentField"
                            type="tel"
                            placeholder="+91 98765 43210"
                            class="h-12 bg-white/10 border-white/20 text-white placeholder:text-blue-300 rounded-xl pl-12 hover:bg-white/15 transition-all duration-300"
                            autocomplete="off"
                          />
                          <icon
                            name="lucide:phone"
                            class="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400"
                          />
                        </div>
                      </ui-form-control>
                      <ui-form-message class="text-red-300" />
                    </ui-form-item>
                  </ui-form-field>

                  <!-- WhatsApp Opt-in -->
                  <ui-form-field
                    v-slot="{ value, handleChange }"
                    type="checkbox"
                    name="contactInfo.whatsappOptIn"
                  >
                    <ui-form-item class="flex flex-row items-center gap-x-3 space-y-0 bg-green-500/10 hover:bg-green-500/20 p-4 rounded-2xl transition-all duration-300 cursor-pointer group">
                      <ui-form-control>
                        <ui-checkbox
                          :checked="value"
                          class="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                          @update:checked="handleChange"
                        />
                      </ui-form-control>
                      <ui-form-label class="text-white font-medium cursor-pointer group-hover:text-green-200 transition-colors flex items-center gap-2">
                        <icon
                          name="lucide:message-circle"
                          class="w-4 h-4 text-green-400"
                        />
                        Send me updates via WhatsApp
                      </ui-form-label>
                    </ui-form-item>
                  </ui-form-field>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="mt-12 pt-8 border-t border-white/10">
              <div class="text-center">
                <ui-button
                  type="submit"
                  size="lg"
                  class="h-16 px-12 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-bold text-xl rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 group relative overflow-hidden"
                  :disabled="isSubmitting"
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <div class="relative flex items-center gap-3">
                    <icon
                      :name="isSubmitting ? 'lucide:loader-2' : 'lucide:rocket'"
                      :class="['w-6 h-6', { 'animate-spin': isSubmitting }]"
                    />
                    {{ isSubmitting ? 'Creating Your Perfect Trip...' : '🚀 Get My Dream Quote!' }}
                  </div>
                </ui-button>
                <p class="text-blue-200 text-sm mt-4 opacity-80">
                  ⚡ We'll get back to you within 2 hours with your personalized quote
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Custom styles for animations -->
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
const { handleSubmit, values: formValues, setFieldValue } = useForm({
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

// Enhanced data with emojis and better descriptions
const foodPreferenceOptions = [
  { value: 'vegetarian', label: 'Vegetarian', emoji: '🥗' },
  { value: 'non-vegetarian', label: 'Non-Vegetarian', emoji: '🍗' },
  { value: 'vegan', label: 'Vegan', emoji: '🌱' },
  { value: 'jain', label: 'Jain', emoji: '🙏' },
  { value: 'halal', label: 'Halal', emoji: '🕌' },
  { value: 'gluten-free', label: 'Gluten-Free', emoji: '🌾' },
];

const addOns = [
  {
    value: 'campfire',
    label: 'Campfire Magic',
    description: 'Starlit bonfire with snacks & stories',
    emoji: '🔥',
  },
  {
    value: 'spa',
    label: 'Spa & Wellness',
    description: 'Rejuvenating treatments & relaxation',
    emoji: '💆‍♀️',
  },
  {
    value: 'taxi',
    label: 'VIP Transport',
    description: 'Airport pickup & luxury local tours',
    emoji: '🚗',
  },
  {
    value: 'guide',
    label: 'Expert Guide',
    description: 'Local storyteller & culture expert',
    emoji: '🗺️',
  },
  {
    value: 'photography',
    label: 'Memory Capture',
    description: 'Professional photos of your journey',
    emoji: '📸',
  },
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
    alert('🎉 Amazing! Your quote request has been submitted successfully. We\'ll craft your perfect trip and get back to you within 2 hours!');

    // Navigate back to home
    navigateTo('/');
  }
  catch (error) {
    console.error('Error submitting form:', error);
    alert('Oops! There was an error submitting your request. Please try again.');
  }
  finally {
    isSubmitting.value = false;
  }
});
</script>

<style scoped>
  @keyframes fade-in {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slide-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-in {
  animation: fade-in 1s ease-out;
  }

  .animate-slide-up {
  animation: slide-up 0.8s ease-out;
  }

  .animation-delay-2000 {
  animation-delay: 2s;
  }

  .animation-delay-4000 {
  animation-delay: 4s;
  }
</style>
