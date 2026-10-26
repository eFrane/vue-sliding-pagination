<template>
  <div class="edge-cases-container">
    <div class="example-section">
      <h3>Single Page (total=1)</h3>
      <sliding-pagination
        :current="singlePageCurrent"
        :total="1"
        @page-change="(page) => singlePageCurrent = page"
      />
    </div>

    <div class="example-section">
      <h3>Two Pages (total=2)</h3>
      <sliding-pagination
        :current="twoPagesCurrent"
        :total="2"
        @page-change="(page) => twoPagesCurrent = page"
      />
    </div>

    <div class="example-section">
      <h3>At Non-Sliding Threshold (total=9)</h3>
      <sliding-pagination
        :current="thresholdCurrent"
        :total="9"
        @page-change="(page) => thresholdCurrent = page"
      />
    </div>

    <div class="example-section">
      <h3>Large Page Count (total=100)</h3>
      <sliding-pagination
        :current="largeCurrent"
        :total="100"
        @page-change="(page) => largeCurrent = page"
      />
    </div>

    <div class="example-section">
      <h3>Custom Page with Invalid Input</h3>
      <sliding-pagination
        :key="invalidInputKey"
        :pageComponent="TextInputCustomPage"
        :current="invalidInputCurrent"
        :total="20"
        @page-change="handleInvalidInputPageChange"
      />
      <p v-if="invalidInputError" class="error-message">
        {{ invalidInputError }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SlidingPagination from '../../../src/SlidingPagination.vue'
import TextInputCustomPage from './TextInputCustomPage.vue'

const singlePageCurrent = ref(1)
const twoPagesCurrent = ref(1)
const thresholdCurrent = ref(1)
const largeCurrent = ref(1)
const invalidInputCurrent = ref(1)
const invalidInputError = ref('')
const invalidInputKey = ref(0)

const handleInvalidInputPageChange = (page) => {
  if (page < 1 || page > 20 || !Number.isInteger(page)) {
    invalidInputError.value = `Invalid page: ${page}. Must be between 1 and 20.`
    // Force re-mount of pagination to reset the input
    invalidInputKey.value++
    return
  }
  invalidInputError.value = ''
  invalidInputCurrent.value = page
}
</script>

<style scoped>
.edge-cases-container {
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

.error-message {
  color: #d32f2f;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>
