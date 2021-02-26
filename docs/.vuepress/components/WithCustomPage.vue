<template>
  <sliding-pagination
    pageComponent="text-input-custom-page"
    :current="current"
    :total="total"
    @page-change="onPageChange"
  >
  </sliding-pagination>
</template>

<script>
import SlidingPagination from '@/../../../src/SlidingPagination.vue'

export default {
  name: 'WithCustomPage',
  components: {
    SlidingPagination
  },
  data() {
    return {
      current: 1,
      total: 20
    }
  },
  methods: {
    onPageChange (page) {
      this.current = page
    }
  }
}
</script>
