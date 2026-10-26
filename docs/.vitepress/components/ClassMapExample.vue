<template>
  <div class="class-map-container">
    <div class="example-section">
      <h3>Default Class Map</h3>
      <sliding-pagination
        :current="defaultCurrent"
        :total="20"
        @page-change="(page) => defaultCurrent = page"
      />
    </div>

    <div class="example-section">
      <h3>Custom Class Map (Bootstrap-like)</h3>
      <sliding-pagination
        :current="bootstrapCurrent"
        :total="20"
        :classMap="bootstrapClassMap"
        @page-change="(page) => bootstrapCurrent = page"
      />
    </div>

    <div class="example-section">
      <h3>Custom Class Map (Minimal)</h3>
      <sliding-pagination
        :current="minimalCurrent"
        :total="20"
        :classMap="minimalClassMap"
        @page-change="(page) => minimalCurrent = page"
      />
    </div>

    <div class="example-section">
      <h3>Custom Class Map (Tailwind-like)</h3>
      <sliding-pagination
        :current="tailwindCurrent"
        :total="20"
        :classMap="tailwindClassMap"
        @page-change="(page) => tailwindCurrent = page"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SlidingPagination from '../../../src/SlidingPagination.vue'

const defaultCurrent = ref(1)
const bootstrapCurrent = ref(1)
const minimalCurrent = ref(1)
const tailwindCurrent = ref(1)

// Bootstrap-like class map
const bootstrapClassMap = {
  component: 'pagination',
  list: 'pagination-list',
  element: 'page-item',
  page: 'page-link',
  elementActive: 'active',
  elementDisabled: 'disabled'
}

// Minimal class map
const minimalClassMap = {
  component: 'pagination-minimal',
  list: 'pagination-list-minimal',
  element: 'page',
  page: 'page-link-minimal',
  elementActive: 'active',
  elementDisabled: 'disabled'
}

// Tailwind-like class map
const tailwindClassMap = {
  component: 'flex justify-center',
  list: 'flex space-x-1',
  element: 'px-3 py-1 rounded',
  page: 'no-underline text-inherit',
  elementActive: 'bg-blue-500 text-white',
  elementDisabled: 'opacity-50 cursor-not-allowed'
}
</script>

<style scoped>
.class-map-container {
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

/* Custom styles for bootstrap-like pagination */
.pagination {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.pagination-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.pagination-list .page-item {
  margin: 0 0.25rem;
}

.pagination-list .page-link {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  background-color: #fff;
  border: 1px solid #dee2e6;
  color: #007bff;
  text-decoration: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.pagination-list .page-link:hover {
  background-color: #e9ecef;
}

.pagination-list .page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
}

.pagination-list .page-item.disabled .page-link {
  background-color: #fff;
  border-color: #dee2e6;
  color: #6c757d;
  cursor: not-allowed;
}

/* Minimal styles */
.pagination-minimal {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.pagination-list-minimal {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
}

.pagination-list-minimal .page {
  padding: 0.5rem;
  background: #f0f0f0;
  border-radius: 4px;
}

.pagination-list-minimal .page-link-minimal {
  color: #333;
  text-decoration: none;
  cursor: pointer;
}

.pagination-list-minimal .page.active .page-link-minimal {
  background: #333;
  color: #fff;
}

.pagination-list-minimal .page.disabled .page-link-minimal {
  color: #999;
  cursor: not-allowed;
}

/* Tailwind-like styles */
.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.space-x-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.25rem * var(--tw-space-x-reverse));
  margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
}

.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
.rounded { border-radius: 0.25rem; }
.no-underline { text-decoration: none; }
.text-inherit { color: inherit; }
.bg-blue-500 { background-color: #3b82f6; }
.text-white { color: #fff; }
.opacity-50 { opacity: 0.5; }
.cursor-not-allowed { cursor: not-allowed; }
</style>
