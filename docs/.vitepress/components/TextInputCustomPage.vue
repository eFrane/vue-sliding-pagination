<template>
  <div>
    <input
      v-if="isCurrent"
      type="text"
      v-model="pageInput"
      class="page-input"
      :aria-label="ariaPageLabel"
      @change="jumpToPageInput"
    />
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
  background: white;
  color: black;
}
</style>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
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
})

const emit = defineEmits(['page-click'])

const pageInput = ref(props.page)

watch(() => props.page, (newVal) => {
  pageInput.value = newVal
})

const goToPage = (e) => {
  e.preventDefault()
  e.stopPropagation()
  emit('page-click', props.page)
}

const jumpToPageInput = () => {
  emit('page-click', parseInt(pageInput.value))
}
</script>
