import { mount } from '@vue/test-utils'
import SlidingPagination from '@/SlidingPagination.vue'

it('renders a text slot for a navigation element', () => {
  const slot = '<span class="test-slot-class">Slot Content</span>'

  const wrapper = mount(SlidingPagination, {
    propsData: {
      total: 12,
      current: 5
    },
    slots: {
      previousPage: slot,
      nextPage: slot,
      gapRight: slot,
      gapLeft: slot
    }
  })

  expect(wrapper.findAll('.test-slot-class').length).toBe(4)
})
