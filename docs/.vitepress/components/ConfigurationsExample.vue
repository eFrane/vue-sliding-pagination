<template>
  <div class="configurations-container">
    <div class="example-section">
      <h3>Small Sliding Window (slidingWindowSize=1)</h3>
      <p class="config-info">
        slidingEndingSize: 2, slidingWindowSize: 1, nonSlidingSize: 9
      </p>
      <sliding-pagination
        :current="smallWindowCurrent"
        :total="20"
        :slidingWindowSize="1"
        @page-change="(page) => smallWindowCurrent = page"
      />
    </div>

    <div class="example-section">
      <h3>Large Sliding Endings (slidingEndingSize=5)</h3>
      <p class="config-info">
        slidingEndingSize: 5, slidingWindowSize: 3, nonSlidingSize: 9
      </p>
      <sliding-pagination
        :current="largeEndingsCurrent"
        :total="30"
        :slidingEndingSize="5"
        @page-change="(page) => largeEndingsCurrent = page"
      />
    </div>

    <div class="example-section">
      <h3>Large Non-Sliding Threshold (nonSlidingSize=20)</h3>
      <p class="config-info">
        slidingEndingSize: 2, slidingWindowSize: 3, nonSlidingSize: 20
      </p>
      <sliding-pagination
        :current="largeThresholdCurrent"
        :total="25"
        :nonSlidingSize="20"
        @page-change="(page) => largeThresholdCurrent = page"
      />
    </div>

    <div class="example-section">
      <h3>Asymmetric Configuration</h3>
      <p class="config-info">
        slidingEndingSize: 1, slidingWindowSize: 5, nonSlidingSize: 7
      </p>
      <sliding-pagination
        :current="asymmetricCurrent"
        :total="20"
        :slidingEndingSize="1"
        :slidingWindowSize="5"
        :nonSlidingSize="7"
        @page-change="(page) => asymmetricCurrent = page"
      />
    </div>

    <div class="example-section">
      <h3>Tight Configuration</h3>
      <p class="config-info">
        slidingEndingSize: 1, slidingWindowSize: 2, nonSlidingSize: 5
      </p>
      <sliding-pagination
        :current="tightCurrent"
        :total="15"
        :slidingEndingSize="1"
        :slidingWindowSize="2"
        :nonSlidingSize="5"
        @page-change="(page) => tightCurrent = page"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SlidingPagination from '../../../src/SlidingPagination.vue'

const smallWindowCurrent = ref(1)
const largeEndingsCurrent = ref(1)
const largeThresholdCurrent = ref(1)
const asymmetricCurrent = ref(1)
const tightCurrent = ref(1)
</script>

<style scoped>
.configurations-container {
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
  margin-bottom: 0.25rem;
}

.config-info {
  font-size: 0.75rem;
  color: #666;
  margin: 0 0 0.5rem 0;
  font-family: monospace;
}
</style>
