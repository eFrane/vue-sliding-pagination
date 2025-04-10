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
    }
  },

  render () {
    return h('a', {
      class: this.pageClasses,
      href: '#',
      'aria-label': this.ariaPageLabel,
      onClick: this.goToPage
    },
    this.page
    )
  }
}
