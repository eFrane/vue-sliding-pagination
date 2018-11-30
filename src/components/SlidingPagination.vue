<template>
    <nav class="pagination" :aria-label="ariaPaginationLabel">
        <ul>
            <!-- Previous Page -->
            <li
                v-if="showPreviousPageAction"
                :class="(current == 1) ? 'disabled' : ''"
            >
                <a
                    href="#"
                    :aria-label="ariaPreviousPageLabel"
                    :disabled="current == 1"
                    @click.prevent.stop="goToPage(current - 1)"
                >
                    <slot name="previous-page">&laquo;</slot>
                </a>
            </li>

            <!-- Beginning Pages -->
            <li
                v-for="page in (total <= nonSlidingSize) ? total : leftEndingPages"
                :key="page"
                :class="(isCurrentPage(page)) ? 'active' : ''"
            >
                <component
                  :is="pageComponent"
                  :is-current="isCurrentPage(page)"
                  :aria-page-label="pageLabel(page)"
                  :page="page"
                  @page-click="goToPage(page)"
                ></component>
            </li>

            <!-- Gap if slide window > beginning !-->
            <li
                    v-if="total > nonSlidingSize && current > leftGapPages"
                    class="disabled"
                    aria-hidden="true"
            >
                <a href="#" disabled>&hellip;</a>
            </li>

            <!-- Slide window -->
            <li
                v-for="page in slidingWindowPages"
                :key="page"
                :class="(isCurrentPage(page)) ? 'active' : ''"
            >
                <component
                  :is="pageComponent"
                  :is-current="isCurrentPage(page)"
                  :aria-page-label="pageLabel(page)"
                  :page="page"
                  @page-click="goToPage(page)"
                ></component>
            </li>

            <li
                v-if="total > nonSlidingSize && current + rightGapPages < total"
                class="disabled"
                aria-hidden="true"
            >
                <a href="#" disabled>&hellip;</a>
            </li>

            <template v-if="showNextPageAction">
                <li
                    v-for="page in rightEndingPages"
                    :key="page"
                    :class="(isCurrentPage(page)) ? 'active' : ''"
                >
                    <component
                      :is="pageComponent"
                      :is-current="isCurrentPage(page)"
                      :aria-page-label="pageLabel(page)"
                      :page="page"
                      @page-click="goToPage(page)"
                    ></component>
                </li>

                <li :class="(current == total) ? 'disabled' : ''">
                    <a
                        href="#"
                        :aria-label="ariaNextPageLabel"
                        @click.prevent.stop="goToPage(current + 1)"
                        :disabled="current == total"
                    >
                        <slot name="next-page">&raquo;</slot>
                    </a>
                </li>
            </template>
        </ul>
    </nav>
</template>

<script>
import _range from 'lodash/range'
import SlidingPaginationDefaultPage from './SlidingPaginationDefaultPage.vue'

export default {
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
     * @description The page numbers for the ending pages
     * @returns {array|number[]}
     */
    leftEndingPages () {
      return _range(1, this.slidingEndingSize + 1)
    },

    /**
     * @description
     * @returns {array|number[]}
     */
    rightEndingPages () {
      return _range(this.total - this.slidingEndingSize + 1, this.total + 1)
    },

    /**
     * @description
     * @returns {array|number[]}
     */
    slidingWindowPages () {
      if (this.total > this.slidingEndingSize + this.slidingWindowSize) {
        if (this.current <= this.slidingEndingSize + Math.floor(this.slidingWindowSize / 2)) {
          return _range(this.slidingEndingSize + 1, this.slidingWindowSize + this.slidingEndingSize + 1)
        }

        if (this.current >= this.total - this.slidingWindowSize - Math.ceil(this.slidingWindowSize / 2)) {
          return _range(
            this.total - this.slidingWindowSize - this.slidingEndingSize + 1,
            this.total - this.slidingEndingSize + 1
          )
        }

        // floor and ceil make the range work with odd numbers
        return _range(
          this.current - Math.floor(this.slidingWindowSize / 2),
          this.current + Math.ceil(this.slidingWindowSize / 2)
        )
      }

      return []
    },

    /**
     * @description
     * @returns {any}
     */
    showPreviousPageAction () {
      return this.total > this.nonSlidingSize
    },

    /**
     * @description
     * @returns {bool}
     */
    showNextPageAction () {
      return this.total > this.nonSlidingSize
    }
  },

  methods: {
    replaceLabelVars (label, page) {
      return label.replace('%current%', this.current).replace('%total%', this.total).replace('%page%', page)
    },

    isCurrentPage (page) {
      return this.current === page
    },

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
     */
    goToPageLabel (page) {
      return this.replaceLabelVars(this.ariaGotoPageLabel, page)
    },

    pageLabel (page) {
      return (this.isCurrentPage(page)) ? this.currentPageLabel(page) : this.goToPageLabel(page)
    }
  }
}
</script>

<style lang="scss">
@import "styles/sliding-pagination";
</style>
