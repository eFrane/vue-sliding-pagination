<template>
  <sliding-pagination
    pageComponent="text-input-custom-page"
    :current="current"
    :total="total"
    @page-change="onPageChange"
  >
  </sliding-pagination>
</template>

<script setup>
import { ref } from 'vue'
import SlidingPagination from '../../../src/SlidingPagination.vue'
import TextInputCustomPage from './TextInputCustomPage.vue'

const current = ref(1)
const total = ref(20)

const onPageChange = (page) => {
  current.value = page
}
</script>
