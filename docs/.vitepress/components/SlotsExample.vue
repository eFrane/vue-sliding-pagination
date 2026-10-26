<template>
  <div class="slots-container">
    <div class="example-section">
      <h3>Custom Previous/Next Icons (SVG)</h3>
      <sliding-pagination
        :current="customIconsCurrent"
        :total="10"
        @page-change="(page) => customIconsCurrent = page"
      >
        <template #previousPage>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </template>
        <template #nextPage>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </template>
      </sliding-pagination>
    </div>

    <div class="example-section">
      <h3>Custom Gap Indicators</h3>
      <sliding-pagination
        :current="customGapsCurrent"
        :total="20"
        @page-change="(page) => customGapsCurrent = page"
      >
        <template #gapLeft>
          <span class="custom-gap">...</span>
        </template>
        <template #gapRight>
          <span class="custom-gap">...</span>
        </template>
      </sliding-pagination>
    </div>

    <div class="example-section">
      <h3>All Slots Customized</h3>
      <sliding-pagination
        :current="allSlotsCurrent"
        :total="30"
        @page-change="(page) => allSlotsCurrent = page"
      >
        <template #previousPage>
          <span class="nav-icon">←</span>
        </template>
        <template #nextPage>
          <span class="nav-icon">→</span>
        </template>
        <template #gapLeft>
          <span class="gap-indicator">←←←</span>
        </template>
        <template #gapRight>
          <span class="gap-indicator">→→→</span>
        </template>
      </sliding-pagination>
    </div>

    <div class="example-section">
      <h3>Custom Page Component with Emoji</h3>
      <sliding-pagination
        :pageComponent="EmojiPage"
        :current="emojiCurrent"
        :total="10"
        @page-change="(page) => emojiCurrent = page"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SlidingPagination from '../../../src/SlidingPagination.vue'

const customIconsCurrent = ref(1)
const customGapsCurrent = ref(1)
const allSlotsCurrent = ref(1)
const emojiCurrent = ref(1)

// Custom page component with emoji
const EmojiPage = {
  name: 'EmojiPage',
  props: {
    ariaPageLabel: String,
    isCurrent: Boolean,
    page: Number,
    pageClass: String
  },
  setup(props, { emit }) {
    const goToPage = (e) => {
      e.preventDefault()
      e.stopPropagation()
      emit('page-click', props.page)
    }
    
    return { props, goToPage }
  },
  template: `
    <a 
      v-if="!props.isCurrent" 
      :class="props.pageClass" 
      href="#" 
      :aria-label="props.ariaPageLabel" 
      @click="goToPage"
    >
      {{ page }}✨
    </a>
    <span 
      v-else 
      :class="[props.pageClass, 'current-page']" 
      :aria-label="props.ariaPageLabel"
    >
      {{ page }}🎯
    </span>
  `
}
</script>

<style scoped>
.slots-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.example-section {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 4px;
}

.example-section h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.custom-gap {
  color: #ff5722;
  font-weight: bold;
}

.nav-icon {
  color: #4caf50;
  font-weight: bold;
}

.gap-indicator {
  color: #9c27b0;
  font-weight: bold;
}

.current-page {
  cursor: default;
}
</style>
