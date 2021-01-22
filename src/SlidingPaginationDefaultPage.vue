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
    goToPage (e) {
      e.preventDefault()
      e.stopPropagation()

      this.$emit('page-click', this.page)
    }
  },

  render (h) {
    return h('a', {
      class: this.pageClass,
      attrs: {
        href: '#',
        'aria-label': this.ariaPageLabel
      },
      on: {
        click: this.goToPage
      }
    },
    this.page
    )
  }
}
</script>
