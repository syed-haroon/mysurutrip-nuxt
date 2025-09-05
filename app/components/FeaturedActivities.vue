<template>
  <!-- Activities Section -->
  <section
    id="activities"
    class="py-20 px-4 bg-gray-50"
  >
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          Things to Do
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Immerse yourself in Mysuru's rich culture, history, and natural beauty
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8 mb-12">
        <ActivityCard
          v-for="activity in featuredActivities || []"
          :key="activity.id"
          :activity="activity"
        />
      </div>

      <div class="text-center">
        <ui-button
          as="nuxt-link"
          to="/activities"
          size="lg"
          variant="outline"
        >
          Explore All Activities
          <icon
            name="lucide:arrow-right"
            class="w-5 h-5 ml-2"
          />
        </ui-button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data: featuredActivities } = await useAsyncData(
  'featured-activities',
  () =>
    queryCollection('activities')
      .where('type', '=', 'activity')
      .limit(1)
      .all(),
);

// ✅ Single document instead of array
// const { data: featuredActivity } = await useAsyncData<Activity | null>(
//   'featured-activity',
//   () =>
//     queryCollection('activities')
//       .where('type', '=', 'activity') // ✅ new syntax
//       .first(), // returns Activity | null
// );
</script>
