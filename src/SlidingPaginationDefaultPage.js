import { h } from 'vue'

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
    pageClasses () {
      let res = this.pageClass

      if (this.isCurrent) {
        res += ' c-sliding-pagination__page--current'
      }

      return res
    }
  },

  methods: {
    goToPage (e) {
      e.preventDefault()
      e.stopPropagation()

      this.$emit('page-click', this.page)
    },

    handleKeyDown (e) {
      // Handle Enter and Space for keyboard accessibility
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        this.goToPage(e)
      }
    }
  },

  render () {
    return h('a', {
      class: this.pageClasses,
      href: '#',
      'aria-label': this.ariaPageLabel,
      onClick: this.goToPage,
      onKeydown: this.handleKeyDown
    },
    this.page
    )
  }
}
