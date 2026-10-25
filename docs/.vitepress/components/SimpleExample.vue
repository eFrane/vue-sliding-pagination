<template>
  <sliding-pagination
    :current="current"
    :total="total"
    @page-change="onPageChange"
  >
  </sliding-pagination>
</template>

<script setup>
import { ref } from 'vue'
import SlidingPagination from '../../../src/SlidingPagination.vue'

const current = ref(1)
const total = ref(10)

const onPageChange = (page) => {
  current.value = page
}
</script>
