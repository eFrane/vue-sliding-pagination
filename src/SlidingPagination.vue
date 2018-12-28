<template>
  <nav
    class="c-sliding-pagination"
    :aria-label="ariaPaginationLabel"
  >
    <ul class="c-sliding-pagination__list">
      <li
        v-if="showPreviousPageAction"
        class="c-sliding-pagination__list-element"
        :class="(current == 1) ? 'c-sliding-pagination__list-element--disabled' : ''"
      >
        <a
          href="#"
          :aria-label="ariaPreviousPageLabel"
          :disabled="current == 1"
          @click.prevent.stop="goToPage(current - 1)"
          class="c-sliding-pagination__page"
        >
          <slot name="previous-page">&laquo;</slot>
        </a>
      </li><!--
      --><li
        v-for="page in beginningPages"
        :key="page"
        class="c-sliding-pagination__list-element"
        :class="(isCurrentPage(page)) ? 'c-sliding-pagination__list-element--active' : ''"
      >
        <component
          :is="pageComponent"
          :is-current="isCurrentPage(page)"
          :aria-page-label="pageLabel(page)"
          :page="page"
          @page-click="goToPage(page)"
        />
      </li><!--
      --><li
        v-if="hasBeginningGap"
        class="c-sliding-pagination__list-element c-sliding-pagination__list-element--disabled"
        aria-hidden="true"
      >
        <a
          href="#"
          class="c-sliding-pagination__page"
          disabled
        >
          <slot name="gap-left">&hellip;</slot>
        </a>
      </li><!--
      --><li
        v-for="page in slidingWindowPages"
        :key="page"
        class="c-sliding-pagination__list-element"
        :class="(isCurrentPage(page)) ? 'c-sliding-pagination__list-element--active' : ''"
      >
        <component
          :is="pageComponent"
          :is-current="isCurrentPage(page)"
          :aria-page-label="pageLabel(page)"
          :page="page"
          @page-click="goToPage(page)"
        />
      </li><!--
      --><li
        v-if="hasEndingGap"
        class="c-sliding-pagination__list-element c-sliding-pagination__list-element--disabled"
        aria-hidden="true"
      >
        <a
          href="#"
          class="c-sliding-pagination__page"
          disabled
        >
          <slot name="gap-right">&hellip;</slot>
        </a>
      </li><!--
      --><li
        v-for="page in endingPages"
        :key="page"
        class="c-sliding-pagination__list-element"
        :class="(isCurrentPage(page)) ? 'c-sliding-pagination__list-element--active' : ''"
      >
        <component
          :is="pageComponent"
          :is-current="isCurrentPage(page)"
          :aria-page-label="pageLabel(page)"
          :page="page"
          @page-click="goToPage(page)"
        />
      </li><!--
      --><li
        class="c-sliding-pagination__list-element"
        :class="(current == total) ? 'c-sliding-pagination__list-element--disabled' : ''"
        v-if="showNextPageAction"
      >
        <a
          href="#"
          :aria-label="ariaNextPageLabel"
          @click.prevent.stop="goToPage(current + 1)"
          :disabled="current == total"
          class="c-sliding-pagination__page"
        >
          <slot name="next-page">&raquo;</slot>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import SlidingPaginationDefaultPage from './SlidingPaginationDefaultPage.vue'

export function range (start, end) {
  let r = []

  if (typeof start !== 'number' || typeof end !== 'number') {
    return r
  }

  if (start > end) {
    let temp = start
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
      type: String,
      default: 'sliding-pagination-default-page'
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

      let startOffset = this.lastBeginningPage + this.slidingWindowHalf
      let endOffset = this.firstEndingPage - this.slidingWindowHalf

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
    }
  }
}
</script>

<style lang="scss">
@import "styles/sliding-pagination";
</style>
