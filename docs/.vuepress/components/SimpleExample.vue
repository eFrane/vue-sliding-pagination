<template>
  <sliding-pagination
    :current="current"
    :total="total"
    @page-change="onPageChange"
  >
  </sliding-pagination>
</template>

<script>
import SlidingPagination from '@/../../../src/SlidingPagination.vue'

export default {
  name: 'SimpleExample',
  components: {
    SlidingPagination
  },
  data() {
    return {
      current: 1,
      total: 10
    }
  },
  methods: {
    onPageChange (page) {
      this.current = page
    }
  }
}
</script>
