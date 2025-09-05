<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import type { ButtonVariants } from '.';
import { Primitive } from 'reka-ui';
import { cn } from '@/lib/utils';
import { buttonVariants } from '.';

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  class?: HTMLAttributes['class'];
  loading?: boolean;
  as?: 'button' | 'nuxt-link';
  to?: string; // Added 'to' prop for nuxt-link destination
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  loading: false,
});
</script>

<template>
  <Primitive
    v-if="as === 'button'"
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="loading"
  >
    <icon
      v-if="loading"
      name="lucide:loader-circle"
      class="animate-spin h-5 w-5"
    />
    <slot v-else />
  </Primitive>
  <nuxt-link
    v-else
    :to="to"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="loading"
  >
    <icon
      v-if="loading"
      name="lucide:loader-circle"
      class="animate-spin h-5 w-5"
    />
    <slot v-else />
  </nuxt-link>
</template>
