<template>
  <ui-dropdown-menu>
    <ui-dropdown-menu-trigger as-child>
      <ui-button
        variant="outline"
        size="sm"
      >
        <icon
          name="lucide:share-2"
          class="w-4 h-4 mr-2"
        />
        Share
        <icon
          name="lucide:chevron-down"
          class="w-3 h-3 ml-1"
        />
      </ui-button>
    </ui-dropdown-menu-trigger>
    <ui-dropdown-menu-content
      align="end"
      class="w-56"
    >
      <ui-dropdown-menu-label>
        <div>Share this page</div>
        <div class="text-sm text-gray-500">
          {{ shareText }}
        </div>
      </ui-dropdown-menu-label>
      <ui-dropdown-menu-separator />
      <ui-dropdown-menu-group>
        <ui-dropdown-menu-item
          v-for="item in socialShareItems"
          :key="item.id"
          @click="item.action"
        >
          <icon
            :name="item.icon"
            :class="`w-4 h-4 mr-2 ${item.color}`"
          />
          <span>{{ item.label }}</span>
        </ui-dropdown-menu-item>
      </ui-dropdown-menu-group>

      <ui-dropdown-menu-separator />

      <!-- Copy Link -->
      <ui-dropdown-menu-item @click="copyLink">
        <icon
          name="lucide:copy"
          class="w-4 h-4 mr-2 text-gray-600"
        />
        <span>{{ linkCopied ? 'Link Copied!' : 'Copy Link' }}</span>
      </ui-dropdown-menu-item>
    </ui-dropdown-menu-content>
  </ui-dropdown-menu>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
  url?: string;
  image?: string;
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  url: '',
  image: '',
});

// Reactive state
const linkCopied = ref(false);

// Computed values for sharing
const shareUrl = computed(() => props.url || (import.meta.client ? window.location.href : ''));
const shareText = computed(() => props.description ? `${props.title} - ${props.description}` : props.title);

// Social share items configuration
const socialShareItems = [
  {
    id: 'facebook',
    icon: 'lucide:facebook',
    color: 'text-blue-600',
    label: 'Share on Facebook',
    action: () => shareOnFacebook(),
  },
  // {
  //   id: 'twitter',
  //   icon: 'lucide:twitter',
  //   color: 'text-sky-500',
  //   label: 'Share on X (Twitter)',
  //   action: () => shareOnTwitter(),
  // },
  {
    id: 'whatsapp',
    icon: 'lucide:message-circle',
    color: 'text-green-600',
    label: 'Share on WhatsApp',
    action: () => shareOnWhatsApp(),
  },
  {
    id: 'linkedin',
    icon: 'lucide:linkedin',
    color: 'text-blue-700',
    label: 'Share on LinkedIn',
    action: () => shareOnLinkedIn(),
  },
  {
    id: 'email',
    icon: 'lucide:mail',
    color: 'text-gray-600',
    label: 'Share by Email',
    action: () => shareByEmail(),
  },
];

// Share methods
const shareOnFacebook = () => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.value)}`;
  openShareWindow(url);
};

// const shareOnTwitter = () => {
//   const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText.value)}&url=${encodeURIComponent(shareUrl.value)}`;
//   openShareWindow(url);
// };

const shareOnWhatsApp = () => {
  const text = `${props.title}\n${props.description}\n${shareUrl.value}`;
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  openShareWindow(url);
};

const shareOnLinkedIn = () => {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl.value)}`;
  openShareWindow(url);
};

const shareByEmail = () => {
  const subject = encodeURIComponent(`Check out: ${props.title}`);
  const body = encodeURIComponent(`I thought you might be interested in this:\n\n${props.title}\n${props.description}\n\n${shareUrl.value}`);
  const url = `mailto:?subject=${subject}&body=${body}`;

  if (import.meta.client) {
    window.location.href = url;
  }
};

const copyLink = async () => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl.value);
    }
    else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl.value;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    linkCopied.value = true;
    setTimeout(() => {
      linkCopied.value = false;
    }, 2000);
  }
  catch (err) {
    console.error('Failed to copy link:', err);
  }
};

const openShareWindow = (url: string) => {
  if (import.meta.client) {
    window.open(
      url,
      'share',
      'width=600,height=400,scrollbars=yes,resizable=yes',
    );
  }
};
</script>
