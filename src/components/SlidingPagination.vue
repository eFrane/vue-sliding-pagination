<template>
    <div class="pagination">
        <ul>
            <!-- Previous Page -->
            <li
                v-if="showPreviousPageAction"
                :class="(current == 1) ? 'disabled' : ''"
            >
                <a
                    href="#"
                    aria-label="Previous"
                    :disabled="current == 1"
                    @click="goToPage(current - 1)"
                >
                    <slot name="previous-page">&laquo;</slot>
                </a>
            </li>

            <!-- Beginning Pages -->
            <li
                v-for="page in (total <= nonSlidingSize) ? total : leftEndingPages"
                :key="page"
                :class="(page == current) ? 'active' : ''"
            >
                <a href="#" @click="goToPage(page)" :aria-label="'Page ' + page">{{ page }}</a>
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
                v-for="page in slidingWindow"
                :key="page"
                :class="(page == current) ? 'active' : ''"
            >
                <a href="#" @click="goToPage(page)" :aria-label="'Page ' + page">{{ page }}</a>
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
                    :class="(page == current) ? 'active' : ''"
                >
                    <a href="#" @click="goToPage(page)" :aria-label="'Page ' + page">{{ page }}</a>
                </li>

                <li :class="(current == total) ? 'disabled' : ''">
                    <a
                        href="#"
                        aria-label="Next"
                        @click="goToPage(current + 1)"
                        :disabled="current == total"
                    >
                        <slot name="last-page">&raquo;</slot>
                    </a>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
import _range from 'lodash/range'

export default {
  props: {
    endingSize: {
      required: false,
      type: Number,
      default: 2
    },

    nonSlidingSize: {
      required: false,
      type: Number,
      default: 9
    },

    current: {
      required: true,
      type: Number
    },

    total: {
      required: true,
      type: Number
    },

    slidingWindowSize: {
      required: false,
      type: Number,
      default: 3
    }
  },

  computed: {
    /**
     * @description The page numbers for the ending pages
     * @returns {any}
     */
    leftEndingPages () {
      return _range(1, this.endingSize + 1)
    },

    /**
     * @description The page numbers for the beginning pages
     * @returns {any}
     */
    leftGapPages () {
      return this.endingSize + Math.ceil(this.slidingWindowSize / 2)
    },

    /**
     * @description
     * @returns {any}
     */
    rightEndingPages () {
      return _range(this.total - this.endingSize + 1, this.total + 1)
    },

    /**
     * @description
     * @returns {any}
     */
    rightGapPages () {
      return this.endingSize + Math.floor(this.slidingWindowSize / 2)
    },

    /**
     * @description
     * @returns {any}
     */
    slidingWindow () {
      if (this.total > this.endingSize + this.slidingWindowSize) {
        if (this.current <= this.endingSize + 1) {
          return _range(this.endingSize + 1, this.slidingWindowSize + this.endingSize + 1)
        }

        if (this.current >= this.total - this.slidingWindowSize) {
          return _range(
            this.total - this.slidingWindowSize - this.endingSize + 1,
            this.total - this.endingSize + 1
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
    /**
     * @description
     * @param {number} page
     */
    goToPage (page) {
      this.$emit('page-change', page)
    }
  }
}
</script>

<style lang="scss">
@import "styles/sliding-pagination";
</style>
