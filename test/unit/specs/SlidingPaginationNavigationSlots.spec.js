import { mount } from '@vue/test-utils'
import SlidingPagination from '@/SlidingPagination.vue'

test('renders a text slot for a navigation element', () => {
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

test('previous page emits correct page change', () => {
  const wrapper = mount(SlidingPagination, {
    propsData: {
      total: 12,
      current: 2
    }
  })

  wrapper.find('li a').trigger('click')
  expect(wrapper.emitted('page-change')[0]).toEqual([1])
})

test('next page emits correct page change', () => {
  const wrapper = mount(SlidingPagination, {
    propsData: {
      total: 12,
      current: 11
    }
  })

  const nextPage = wrapper.findAll('li a').at(9)

  nextPage.trigger('click')
  expect(wrapper.emitted('page-change')[0]).toEqual([12])
})
