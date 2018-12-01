<template>
  <nav
    class="c-sliding-pagination"
    :aria-label="ariaPaginationLabel"
  >
    <ul class="c-sliding-pagination__list">
      <!-- Previous Page -->
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
      </li>

      <!-- Beginning Pages -->
      <li
        v-for="page in (total <= nonSlidingSize) ? total : leftEndingPages"
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
      </li>

      <!-- Gap if slide window > beginning -->
      <li
        v-if="total > nonSlidingSize && current > leftGapPages"
        class="c-sliding-pagination__list-element c-sliding-pagination__list-element--disabled"
        aria-hidden="true"
      >
        <slot name="gap-left">
          <a
            href="#"
            class="c-sliding-pagination__page"
            disabled
          >
            &hellip;
          </a>
        </slot>
      </li>

      <!-- Slide window -->
      <li
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
      </li>

      <!-- Gap if slide window < end -->
      <li
        v-if="total > nonSlidingSize && current + rightGapPages < total"
        class="c-sliding-pagination__list-element c-sliding-pagination__list-element--disabled"
        aria-hidden="true"
      >
        <slot name="gap-right">
          <a
            href="#"
            class="c-sliding-pagination__page"
            disabled
          >
            &hellip;
          </a>
        </slot>
      </li>

      <template v-if="showNextPageAction">
        <li
          v-for="page in rightEndingPages"
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
        </li>

        <li
          class="c-sliding-pagination__list-element"
          :class="(current == total) ? 'c-sliding-pagination__list-element--disabled' : ''"
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
      </template>
    </ul>
  </nav>
</template>

<script>
import SlidingPaginationDefaultPage from './SlidingPaginationDefaultPage.vue'

export function range (start, end) {
  let r = [];

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
      default: 'Page %current% of %total%, current page'
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
    /**
     * @description The number of pages in the gap on the left side of the sliding window
     * @returns {number}
     */
    leftGapPages () {
      return this.slidingEndingSize + Math.ceil(this.slidingWindowSize / 2)
    },

    /**
     * @description The number of pages in the gap on the right side of the sliding window
     * @returns {number}
     */
    rightGapPages () {
      return this.slidingEndingSize + Math.floor(this.slidingWindowSize / 2)
    },

    /**
     * @description The page numbers for the left side ending pages (aka the first few pages)
     * @returns {array|number[]}
     */
    leftEndingPages () {
      return range(1, this.slidingEndingSize + 1)
    },

    /**
     * @description The page numbers for the right side ending pages (aka the last few pages)
     * @returns {array|number[]}
     */
    rightEndingPages () {
      return range(this.total - this.slidingEndingSize + 1, this.total + 1)
    },

    /**
     * @description The page numbers for the sliding window
     * @returns {array|number[]}
     */
    slidingWindowPages () {
      if (this.total > this.slidingEndingSize + this.slidingWindowSize) {
        if (this.current <= this.slidingEndingSize + Math.floor(this.slidingWindowSize / 2)) {
          return range(this.slidingEndingSize + 1, this.slidingWindowSize + this.slidingEndingSize + 1)
        }

        if (this.current >= this.total - this.slidingWindowSize - Math.ceil(this.slidingWindowSize / 2)) {
          return range(
            this.total - this.slidingWindowSize - this.slidingEndingSize + 1,
            this.total - this.slidingEndingSize + 1
          )
        }

        // floor and ceil make the range work with odd numbers
        return range(
          this.current - Math.floor(this.slidingWindowSize / 2),
          this.current + Math.ceil(this.slidingWindowSize / 2)
        )
      }

      return []
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
        .replace('%current%', this.current)
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
