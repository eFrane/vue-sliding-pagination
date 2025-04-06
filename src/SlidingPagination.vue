<script>
import defaultClassMap from './defaultClassMap.json'
import { h } from 'vue'
import SlidingPaginationDefaultPage from './SlidingPaginationDefaultPage'

export function range (start, end) {
  const r = []

  if (typeof start !== 'number' || typeof end !== 'number') {
    return r
  }

  if (start > end) {
    const temp = start
    start = end
    end = temp
  }

  for (let i = start; i <= end; i++) {
    r.push(i)
  }

  return r
}

export default {
  name: 'SlidingPagination',

  props: {
    ariaPaginationLabel: {
      type: String,
      required: false,
      default: 'Pagination Navigation'
    },

    ariaGotoPageLabel: {
      type: String,
      required: false,
      default: 'Go to page %page% of %total%'
    },

    ariaPreviousPageLabel: {
      type: String,
      required: false,
      default: 'Go to previous page'
    },

    ariaNextPageLabel: {
      type: String,
      required: false,
      default: 'Go to next page'
    },

    ariaCurrentPageLabel: {
      type: String,
      required: false,
      default: 'Page %page% of %total%, current page'
    },

    classMap: {
      type: Object,
      required: false,
      default: () => {
        return defaultClassMap
      }
    },

    current: {
      required: true,
      type: Number
    },

    total: {
      required: true,
      type: Number
    },

    slidingEndingSize: {
      required: false,
      type: Number,
      default: 2
    },

    slidingWindowSize: {
      required: false,
      type: Number,
      default: 3
    },

    nonSlidingSize: {
      required: false,
      type: Number,
      default: 9
    },

    pageComponent: {
      required: false,
      type: Object,
      default: () => SlidingPaginationDefaultPage
    }
  },

  components: {
    SlidingPaginationDefaultPage
  },

  computed: {
    isSliding () {
      return this.total > this.nonSlidingSize
    },

    hasBeginningGap () {
      if (!this.isSliding) {
        return false
      }

      return this.lastBeginningPage + 1 !== this.firstWindowPage
    },

    hasEndingGap () {
      if (!this.isSliding) {
        return false
      }

      return this.lastWindowPage + 1 !== this.firstEndingPage
    },

    /**
     * @description The page numbers for the left side ending pages (aka the first few pages)
     * @returns {array|number[]}
     */
    beginningPages () {
      return range(1, (this.isSliding) ? this.slidingEndingSize : this.total)
    },

    lastBeginningPage () {
      return this.beginningPages[this.beginningPages.length - 1]
    },

    /**
     * @description The page numbers for the right side ending pages (aka the last few pages)
     * @returns {array|number[]}
     */
    endingPages () {
      if (!this.isSliding) {
        return []
      }

      return range(this.total - this.slidingEndingSize + 1, this.total)
    },

    firstEndingPage () {
      return this.endingPages[0]
    },

    slidingWindowHalf () {
      let half = this.slidingWindowSize / 2

      if (this.slidingWindowSize % 2 === 1) {
        half -= 0.5
      }

      return half
    },

    /**
     * @description The page numbers for the sliding window
     * @returns {array|number[]}
     */
    slidingWindowPages () {
      if (!this.isSliding) {
        return []
      }

      const startOffset = this.lastBeginningPage + this.slidingWindowHalf
      const endOffset = this.firstEndingPage - this.slidingWindowHalf

      if (this.current <= startOffset) {
        return range(this.lastBeginningPage + 1, this.lastBeginningPage + this.slidingWindowSize)
      }

      if (this.current > startOffset && this.current < endOffset) {
        let upperHalfForEvenWindowSizes = this.slidingWindowHalf
        if (this.slidingWindowSize % 2 === 0) {
          upperHalfForEvenWindowSizes /= 2
        }

        return range(-this.slidingWindowHalf + this.current, upperHalfForEvenWindowSizes + this.current)
      }

      return range(this.firstEndingPage - this.slidingWindowSize, this.firstEndingPage - 1)
    },

    firstWindowPage () {
      return this.slidingWindowPages[0]
    },

    lastWindowPage () {
      return this.slidingWindowPages[this.slidingWindowPages.length - 1]
    },

    /**
     * @description Is it possible to go to the previous page?
     * @returns {bool}
     */
    showPreviousPageAction () {
      return this.total > this.nonSlidingSize
    },

    /**
     * @description Is it possible to go to the next page?
     * @returns {bool}
     */
    showNextPageAction () {
      return this.total > this.nonSlidingSize
    }
  },

  methods: {
    /**
     * @description Dead-simple template "engine" for aria labels
     * @param {string} label
     * @param {number} page
     * @returns {string}
     */
    replaceLabelVars (label, page) {
      return label
        .replace('%total%', this.total)
        .replace('%page%', page)
    },

    /**
     * @description Is this page the current page?
     * @param {number} page
     * @returns {bool}
     */
    isCurrentPage (page) {
      return this.current === page
    },

    /**
     * @description ARIA label for the current page
     * @param {number} page
     * @returns {string}
     */
    currentPageLabel (page) {
      return this.replaceLabelVars(this.ariaCurrentPageLabel, page)
    },

    /**
     * @description The `page-change` is fired on every page click and emits the clicked page's number
     * @param {number} page
     */
    goToPage (page) {
      this.$emit('page-change', page)
    },

    /**
     * Advance a page.
     *
     * It is not necessary to check for any boundaries as the navigation element is disabled
     * if advancing is impossible.
     */
    goToNextPage () {
      this.goToPage(this.current + 1)
    },

    /**
     * Go back a page.
     *
     * It is not necessary to check for any boundaries as the navigation element is disabled
     * if moving backwards is impossible.
     */
    goToPreviousPage () {
      this.goToPage(this.current - 1)
    },

    /**
     * @description ARIA label for page selection
     * @param {number} page
     * @returns {string}
     */
    goToPageLabel (page) {
      return this.replaceLabelVars(this.ariaGotoPageLabel, page)
    },

    /**
     * @description ARIA label for a page, returns either selection or current page label
     * @param {number} page
     * @returns {string}
     */
    pageLabel (page) {
      return (this.isCurrentPage(page)) ? this.currentPageLabel(page) : this.goToPageLabel(page)
    },

    slotOrDefault (slot, _default) {
      if (this.$slots[slot]) {
        return this.$slots[slot]()
      }

      return _default
    },

    navigationElement (position, offset, ariaLabel, label) {
      return h(
        'li', {
          class: [
            this.classMap.element,
            (this.current === position) ? this.classMap.elementDisabled : ''
          ],
          key: position
        },
        [h(
          'a',
          {
            class: this.classMap.page,
            href: '#',
            ariaLabel: ariaLabel,
            disabled: this.current === 1,
            onClick: (position === this.total) ? this.goToNextPage : this.goToPreviousPage
          },
          label
        )]
      )
    },

    pageListPage (page) {
      return h(
        'li',
        {
          class: [
            this.classMap.element,
            this.isCurrentPage(page)
              ? this.classMap.elementActive
              : ''
          ]
        },
        [h(this.pageComponent, {
          isCurrent: this.isCurrentPage(page),
          ariaPageLabel: this.pageLabel(page),
          page: page,
          pageClass: this.classMap.page,
          onPageClick: this.goToPage
        })]
      )
    },

    gap (label) {
      return h('li',
        {
          ariaHidden: true,
          class: [
            this.classMap.element,
            this.classMap.elementDisabled
          ]
        },
        [h('a',
          {
            class: this.classMap.page,
            href: '#',
            disabled: true
          },
          label
        )]
      )
    }
  },

  render () {
    let listElements = []

    if (this.showPreviousPageAction) {
      listElements.push(
        this.navigationElement(
          1,
          -1,
          this.ariaPreviousPageLabel,
          this.slotOrDefault('previousPage', '«')
        )
      )
    }

    listElements = listElements.concat(this.beginningPages.map((page) => { return this.pageListPage(page) }))

    if (this.hasBeginningGap) {
      listElements.push(this.gap(this.slotOrDefault('gapLeft', '…')))
    }

    listElements = listElements.concat(this.slidingWindowPages.map((page) => { return this.pageListPage(page) }))

    if (this.hasEndingGap) {
      listElements.push(this.gap(this.slotOrDefault('gapRight', '…')))
    }

    listElements = listElements.concat(this.endingPages.map((page) => { return this.pageListPage(page) }))

    if (this.showNextPageAction) {
      listElements.push(
        this.navigationElement(
          this.total,
          1,
          this.ariaNextPageLabel,
          this.slotOrDefault('nextPage', '»')
        )
      )
    }

    return h(
      'nav', {
        ariaLabel: this.ariaPaginationLabel,
        class: this.classMap.component
      },
      [h(
        'ul',
        {
          class: this.classMap.list
        },
        listElements
      )]
    )
  }
}
</script>

<style lang="scss">
@import "styles/sliding-pagination";
</style>
