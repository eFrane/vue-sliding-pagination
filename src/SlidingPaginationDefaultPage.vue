<template>
  <a
    href="#"
    @click.stop.prevent="goToPage(page)"
    :aria-label="ariaPageLabel"
    :class="pageClass"
  >
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
    },
    pageClass: {
      type: String,
      required: true
    }
  },

  computed: {
    currentClass () {
      return (this.isCurrent) ? 'c-sliding-pagination__page--current' : ''
    }
  },

  methods: {
    goToPage () {
      this.$emit('page-click', this.page)
    }
  }
}
</script>
