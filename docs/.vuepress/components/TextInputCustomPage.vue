<template>
  <div>
    <input
      v-if="isCurrent"
      type="text"
      v-model="pageInput"
      class="page-input"
      :aria-label="ariaPageLabel"
      @change="jumpToPageInput"
    ></ts-input>
    <a
      v-else
      :class="pageClass"
      href="#"
      :aria-label="ariaPageLabel"
      @click="goToPage"
    >{{ page }}</a>
  </div>
</template>

<style scoped>
.page-input {
  width: 20px;
  font-size: 16px;
  text-align: center;
}
</style>

<script>
export default {
  name: 'TextInputCustomPage',
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
  data() {
    return {
      pageInput: this.page
    };
  },
  methods: {
    goToPage(e) {
      e.preventDefault();
      e.stopPropagation();
      this.$emit('page-click', this.page);
    },
    jumpToPageInput() {
      this.$emit('page-click', parseInt(this.pageInput));
    }
  }
};
</script>
