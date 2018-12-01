<template>
  <a
    href="#"
    @click.stop.prevent="goToPage(page)"
    :aria-label="ariaPageLabel"
    class="c-sliding-pagination__page">
    {{ page }}
  </a>
</template>

<script>
export default {
  name: 'SlidingPaginationDefaultPage',

  props: {
    ariaPageLabel: {
      type: String,
      required: true
    },
    isCurrent: {
      type: Boolean,
      required: true
    },
    page: {
      type: Number,
      required: true
    }
  },

  methods: {
    goToPage () {
      this.$emit('page-click', this.page)
    }
  }
}
</script>
