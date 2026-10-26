<template>
  <div class="dynamic-updates-container">
    <div class="controls">
      <div class="control-group">
        <label>Current Page: {{ current }}</label>
        <button @click="setCurrent(1)">Set to 1</button>
        <button @click="setCurrent(5)">Set to 5</button>
        <button @click="setCurrent(10)">Set to 10</button>
        <button @click="incrementCurrent">+1</button>
        <button @click="decrementCurrent">-1</button>
      </div>

      <div class="control-group">
        <label>Total Pages: {{ total }}</label>
        <button @click="setTotal(10)">Set to 10</button>
        <button @click="setTotal(20)">Set to 20</button>
        <button @click="setTotal(50)">Set to 50</button>
        <button @click="setTotal(100)">Set to 100</button>
      </div>

      <div class="control-group">
        <button @click="rapidNavigation">Rapid Navigation (1-2-3-4-5)</button>
        <button @click="reset">Reset</button>
      </div>
    </div>

    <div class="pagination-display">
      <h3>Pagination (reacts to changes above)</h3>
      <sliding-pagination
        :current="current"
        :total="total"
        @page-change="handlePageChange"
      />
    </div>

    <div class="async-section">
      <h3>Async Page Change (simulates API call)</h3>
      <button @click="asyncPageChange" :disabled="isLoading">
        {{ isLoading ? 'Loading...' : 'Change to Page 7 (async)' }}
      </button>
      <sliding-pagination
        :current="asyncCurrent"
        :total="20"
        @page-change="handleAsyncPageChange"
      />
    </div>

    <div class="multiple-instances-section">
      <h3>Multiple Independent Instances</h3>
      <div class="instance">
        <h4>Instance 1</h4>
        <sliding-pagination
          :current="instance1Current"
          :total="10"
          @page-change="(page) => instance1Current = page"
        />
      </div>
      <div class="instance">
        <h4>Instance 2</h4>
        <sliding-pagination
          :current="instance2Current"
          :total="15"
          @page-change="(page) => instance2Current = page"
        />
      </div>
      <div class="instance">
        <h4>Instance 3</h4>
        <sliding-pagination
          :current="instance3Current"
          :total="20"
          @page-change="(page) => instance3Current = page"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SlidingPagination from '../../../src/SlidingPagination.vue'

const current = ref(1)
const total = ref(10)
const asyncCurrent = ref(1)
const instance1Current = ref(1)
const instance2Current = ref(1)
const instance3Current = ref(1)
const isLoading = ref(false)

const setCurrent = (page) => {
  current.value = page
}

const setTotal = (t) => {
  total.value = t
  // Ensure current is within bounds
  if (current.value > total.value) {
    current.value = total.value
  }
}

const incrementCurrent = () => {
  if (current.value < total.value) {
    current.value++
  }
}

const decrementCurrent = () => {
  if (current.value > 1) {
    current.value--
  }
}

const handlePageChange = (page) => {
  current.value = page
}

const rapidNavigation = () => {
  // Simulate rapid consecutive clicks
  current.value = 1
  setTimeout(() => current.value = 2, 50)
  setTimeout(() => current.value = 3, 100)
  setTimeout(() => current.value = 4, 150)
  setTimeout(() => current.value = 5, 200)
}

const reset = () => {
  current.value = 1
  total.value = 10
}

const handleAsyncPageChange = (page) => {
  asyncCurrent.value = page
}

const asyncPageChange = async () => {
  isLoading.value = true
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500))
  asyncCurrent.value = 7
  isLoading.value = false
}
</script>

<style scoped>
.dynamic-updates-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f5f5f5;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group label {
  font-weight: bold;
  font-size: 0.875rem;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  background: #246068;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
}

button:disabled {
  background: #999;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background: #69969c;
}

.pagination-display {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 4px;
}

.pagination-display h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.async-section {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 4px;
}

.async-section h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.multiple-instances-section {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 4px;
}

.multiple-instances-section h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.instance {
  margin-bottom: 1rem;
}

.instance h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
}
</style>
