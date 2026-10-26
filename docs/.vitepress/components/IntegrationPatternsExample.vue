<template>
  <div class="integration-container">
    <div class="example-section">
      <h3>v-model Pattern Wrapper</h3>
      <p>Current page: {{ vModelCurrent }}</p>
      <SlidingPaginationVModel
        v-model="vModelCurrent"
        :total="15"
      />
    </div>

    <div class="example-section">
      <h3>Async Loading with State</h3>
      <p>Current page: {{ asyncCurrent }}</p>
      <p>Loading: {{ asyncLoading ? 'Yes' : 'No' }}</p>
      <sliding-pagination
        :current="asyncCurrent"
        :total="15"
        @page-change="handleAsyncPageChange"
      />
    </div>

    <div class="example-section">
      <h3>Multiple Independent Instances</h3>
      <div class="instance">
        <h4>Products ({{ productsCurrent }}/10)</h4>
        <sliding-pagination
          :current="productsCurrent"
          :total="10"
          @page-change="(page) => productsCurrent = page"
        />
      </div>
      <div class="instance">
        <h4>Users ({{ usersCurrent }}/15)</h4>
        <sliding-pagination
          :current="usersCurrent"
          :total="15"
          @page-change="(page) => usersCurrent = page"
        />
      </div>
      <div class="instance">
        <h4>Orders ({{ ordersCurrent }}/20)</h4>
        <sliding-pagination
          :current="ordersCurrent"
          :total="20"
          @page-change="(page) => ordersCurrent = page"
        />
      </div>
    </div>

    <div class="example-section">
      <h3>Composition API with Reactive Props</h3>
      <div class="controls">
        <button @click="resetComposition">Reset</button>
        <button @click="goToRandomPage">Random Page</button>
      </div>
      <sliding-pagination
        :current="compositionCurrent"
        :total="compositionTotal"
        @page-change="(page) => compositionCurrent = page"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SlidingPagination from '../../../src/SlidingPagination.vue'

// v-model pattern wrapper component
const SlidingPaginationVModel = {
  name: 'SlidingPaginationVModel',
  props: {
    modelValue: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const current = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    })
    
    const handlePageChange = (page) => {
      current.value = page
    }
    
    return { current, handlePageChange }
  },
  template: `
    <sliding-pagination
      :current="current"
      :total="total"
      @page-change="handlePageChange"
    />
  `
}

// State for v-model example
const vModelCurrent = ref(1)

// State for async example
const asyncCurrent = ref(1)
const asyncLoading = ref(false)

const handleAsyncPageChange = async (page) => {
  asyncLoading.value = true
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 300))
  asyncCurrent.value = page
  asyncLoading.value = false
}

// State for multiple instances
const productsCurrent = ref(1)
const usersCurrent = ref(1)
const ordersCurrent = ref(1)

// State for composition API example
const compositionCurrent = ref(1)
const compositionTotal = ref(20)

const resetComposition = () => {
  compositionCurrent.value = 1
  compositionTotal.value = 20
}

const goToRandomPage = () => {
  const randomPage = Math.floor(Math.random() * compositionTotal.value) + 1
  compositionCurrent.value = randomPage
}
</script>

<style scoped>
.integration-container {
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

.instance {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #eee;
  border-radius: 4px;
}

.instance h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
}

.controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

button {
  padding: 0.25rem 0.75rem;
  background: #246068;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
}

button:hover {
  background: #69969c;
}
</style>
