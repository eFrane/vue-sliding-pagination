import { mount, shallowMount } from '@vue/test-utils'

import SlidingPagination from '@/SlidingPagination.vue'

let basicTestWrapper = null

beforeEach(() => {
  basicTestWrapper = shallowMount(SlidingPagination, {
    props: {
      ariaPageLabel: 'Page',
      total: 10,
      current: 1,
      slidingEndingSize: 2,
      slidingWindowSize: 3
    }
  })
})

afterEach(() => {
  basicTestWrapper = null
})

it('calculates the correct beginning interval', async () => {
  expect(basicTestWrapper.vm.beginningPages).toEqual([1, 2])

  basicTestWrapper.setProps({ current: 2 })
  await basicTestWrapper.vm.$nextTick()

  expect(basicTestWrapper.vm.beginningPages).toEqual([1, 2])

  basicTestWrapper.setProps({ current: 9 })
  await basicTestWrapper.vm.$nextTick()

  expect(basicTestWrapper.vm.beginningPages).toEqual([1, 2])

  basicTestWrapper.setProps({ nonSlidingSize: 10 })
  await basicTestWrapper.vm.$nextTick()

  expect(basicTestWrapper.vm.beginningPages).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  expect(basicTestWrapper.vm.endingPages).toEqual([])
  expect(basicTestWrapper.vm.slidingWindowPages).toEqual([])
})

it('calculates the correct ending interval', async () => {
  expect(basicTestWrapper.vm.endingPages).toEqual([9, 10])

  basicTestWrapper.setProps({ current: 2 })
  await basicTestWrapper.vm.$nextTick()
  expect(basicTestWrapper.vm.endingPages).toEqual([9, 10])

  basicTestWrapper.setProps({ current: 9 })
  await basicTestWrapper.vm.$nextTick()
  expect(basicTestWrapper.vm.endingPages).toEqual([9, 10])
})

it('calculates the correct sliding window half', async () => {
  basicTestWrapper.setProps({ slidingWindowSize: 2 })
  await basicTestWrapper.vm.$nextTick()

  expect(basicTestWrapper.vm.slidingWindowHalf).toEqual(1)

  basicTestWrapper.setProps({ slidingWindowSize: 3 })
  await basicTestWrapper.vm.$nextTick()

  expect(basicTestWrapper.vm.slidingWindowHalf).toEqual(1)

  basicTestWrapper.setProps({ slidingWindowSize: 4 })
  await basicTestWrapper.vm.$nextTick()

  expect(basicTestWrapper.vm.slidingWindowHalf).toEqual(2)

  basicTestWrapper.setProps({ slidingWindowSize: 5 })
  await basicTestWrapper.vm.$nextTick()

  expect(basicTestWrapper.vm.slidingWindowHalf).toEqual(2)
})

it('calculates the correct window interval with an odd sliding window size', async () => {
  // this is just stating the obvious here
  basicTestWrapper.setProps({ current: 1, slidingWindowSize: 3 })
  await basicTestWrapper.vm.$nextTick()

  expect(basicTestWrapper.vm.beginningPages).toEqual([1, 2])
  expect(basicTestWrapper.vm.lastBeginningPage).toEqual(2)
  expect(basicTestWrapper.vm.slidingWindowPages).toEqual([3, 4, 5])
  expect(basicTestWrapper.vm.hasBeginningGap).toBeFalsy()
  expect(basicTestWrapper.vm.hasEndingGap).toBeTruthy()

  basicTestWrapper.setProps({ current: 3 })
  await basicTestWrapper.vm.$nextTick()
  expect(basicTestWrapper.vm.slidingWindowPages).toEqual([3, 4, 5])
  expect(basicTestWrapper.vm.hasBeginningGap).toBeFalsy()
  expect(basicTestWrapper.vm.hasEndingGap).toBeTruthy()

  basicTestWrapper.setProps({ current: 4 })
  await basicTestWrapper.vm.$nextTick()
  expect(basicTestWrapper.vm.slidingWindowPages).toEqual([3, 4, 5])
  expect(basicTestWrapper.vm.hasBeginningGap).toBeFalsy()
  expect(basicTestWrapper.vm.hasEndingGap).toBeTruthy()

  basicTestWrapper.setProps({ current: 7 })
  await basicTestWrapper.vm.$nextTick()
  expect(basicTestWrapper.vm.slidingWindowPages).toEqual([6, 7, 8])
  expect(basicTestWrapper.vm.hasBeginningGap).toBeTruthy()
  expect(basicTestWrapper.vm.hasEndingGap).toBeFalsy()

  basicTestWrapper.setProps({ current: 5 })
  await basicTestWrapper.vm.$nextTick()
  expect(basicTestWrapper.vm.slidingWindowPages).toEqual([4, 5, 6])
  expect(basicTestWrapper.vm.hasBeginningGap).toBeTruthy()
  expect(basicTestWrapper.vm.hasEndingGap).toBeTruthy()

  basicTestWrapper.setProps({ current: 6 })
  await basicTestWrapper.vm.$nextTick()
  expect(basicTestWrapper.vm.slidingWindowPages).toEqual([5, 6, 7])
  expect(basicTestWrapper.vm.hasBeginningGap).toBeTruthy()
  expect(basicTestWrapper.vm.hasEndingGap).toBeTruthy()
})

it('calculates the correct window interval with an even sliding window size', async () => {
  // this is just stating the obvious here
  basicTestWrapper.setProps({ current: 1, slidingWindowSize: 4, slidingEndingSize: 2, total: 20 })
  await basicTestWrapper.vm.$nextTick()

  expect(basicTestWrapper.vm.slidingWindowPages).toEqual([3, 4, 5, 6])
  expect(basicTestWrapper.vm.slidingWindowPages.length).toBe(4)
  expect(basicTestWrapper.vm.hasBeginningGap).toBeFalsy()
  expect(basicTestWrapper.vm.hasEndingGap).toBeTruthy()

  basicTestWrapper.setProps({ current: 3 })
  await basicTestWrapper.vm.$nextTick()
  expect(basicTestWrapper.vm.slidingWindowPages).toEqual([3, 4, 5, 6])
  expect(basicTestWrapper.vm.hasBeginningGap).toBeFalsy()
  expect(basicTestWrapper.vm.hasEndingGap).toBeTruthy()

  basicTestWrapper.setProps({ current: 4 })
  await basicTestWrapper.vm.$nextTick()
  expect(basicTestWrapper.vm.slidingWindowPages).toEqual([3, 4, 5, 6])
  expect(basicTestWrapper.vm.hasBeginningGap).toBeFalsy()
  expect(basicTestWrapper.vm.hasEndingGap).toBeTruthy()

  basicTestWrapper.setProps({ current: 7 })
  await basicTestWrapper.vm.$nextTick()
  expect(basicTestWrapper.vm.slidingWindowPages).toEqual([5, 6, 7, 8])
  expect(basicTestWrapper.vm.slidingWindowPages.length).toBe(4)
  expect(basicTestWrapper.vm.hasBeginningGap).toBeTruthy()
  expect(basicTestWrapper.vm.hasEndingGap).toBeTruthy()

  basicTestWrapper.setProps({ current: 17 })
  await basicTestWrapper.vm.$nextTick()
  expect(basicTestWrapper.vm.slidingWindowPages).toEqual([15, 16, 17, 18])
  expect(basicTestWrapper.vm.slidingWindowPages.length).toBe(4)
  expect(basicTestWrapper.vm.hasBeginningGap).toBeTruthy()
  expect(basicTestWrapper.vm.hasEndingGap).toBeFalsy()

  basicTestWrapper.setProps({ current: 11 })
  await basicTestWrapper.vm.$nextTick()
  expect(basicTestWrapper.vm.slidingWindowPages).toEqual([9, 10, 11, 12])
  expect(basicTestWrapper.vm.slidingWindowPages.length).toBe(4)
  expect(basicTestWrapper.vm.hasBeginningGap).toBeTruthy()
  expect(basicTestWrapper.vm.hasEndingGap).toBeTruthy()
})

it('does not suddenly change number of pages in the sliding window', async () => {
  // historical note: there was a bug in this package which made the window size jump back to three
  // on some page switches even though it's configuration wasn't change, this test was written to
  // cure that bug

  basicTestWrapper.setProps({ current: 4, slidingWindowSize: 5, slidingEndingSize: 3, total: 20 })
  await basicTestWrapper.vm.$nextTick()

  expect(basicTestWrapper.vm.slidingWindowPages.length).toBe(5)

  basicTestWrapper.setProps({ current: 6 })
  await basicTestWrapper.vm.$nextTick()

  expect(basicTestWrapper.vm.slidingWindowPages.length).toBe(5)
})

it('emits a page-change on page activation', () => {
  const eventWrapper = mount(SlidingPagination, {
    props: {
      ariaPageLabel: 'Page 2',
      current: 1,
      total: 1
    }
  })

  const element = eventWrapper.find('.c-sliding-pagination__page--current')
  element.trigger('click')

  expect(eventWrapper.emitted()).toHaveProperty('page-change')

  expect(eventWrapper.emitted()['page-change'].length).toBe(1)
  expect(eventWrapper.emitted()['page-change'][0]).toEqual([1])
})
