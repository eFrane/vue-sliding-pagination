<script>
import { pageMarkup } from './pageMarkup'

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
    return pageMarkup(
      h,
      this.page,
      this.ariaPageLabel,
      this.pageClass,
      this.goToPage
    )
  }
}
</script>
