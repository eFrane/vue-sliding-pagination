import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

import SlidingPagination from '@/components/SlidingPagination.vue'
import SlidingPaginationDefaultPage from '@/components/SlidingPaginationDefaultPage.vue'

describe('SlidingPagination.vue', () => {
  it('is named correctly', () => {
    expect(SlidingPagination.name).toBe('SlidingPagination')
  })

  it('requires a current page number', () => {
    expect(SlidingPagination.props).toHaveProperty('current.required')
    expect(SlidingPagination.props.current.required).toBe(true)
    expect(SlidingPagination.props.current.type).toBe(Number)
  })

  it('requires a total page number', () => {
    expect(SlidingPagination.props).toHaveProperty('total.required')
    expect(SlidingPagination.props.total.required).toBe(true)
    expect(SlidingPagination.props.total.type).toBe(Number)
  })

  it('allows overriding the pagination label', () => {
    expect(SlidingPagination.props).toHaveProperty('ariaPaginationLabel.required')
    expect(SlidingPagination.props.ariaPaginationLabel.required).toBe(false)
    expect(SlidingPagination.props.ariaPaginationLabel.type).toBe(String)
  })

  it('allows overriding the go to page label', () => {
    expect(SlidingPagination.props).toHaveProperty('ariaGotoPageLabel.required')
    expect(SlidingPagination.props.ariaGotoPageLabel.required).toBe(false)
    expect(SlidingPagination.props.ariaGotoPageLabel.type).toBe(String)
  })

  it('allows overriding the previous page label', () => {
    expect(SlidingPagination.props).toHaveProperty('ariaPreviousPageLabel.required')
    expect(SlidingPagination.props.ariaPreviousPageLabel.required).toBe(false)
    expect(SlidingPagination.props.ariaPreviousPageLabel.type).toBe(String)
  })

  it('allows overriding the next page label', () => {
    expect(SlidingPagination.props).toHaveProperty('ariaNextPageLabel.required')
    expect(SlidingPagination.props.ariaNextPageLabel.required).toBe(false)
    expect(SlidingPagination.props.ariaNextPageLabel.type).toBe(String)
  })

  it('allows overriding the current page label', () => {
    expect(SlidingPagination.props).toHaveProperty('ariaCurrentPageLabel.required')
    expect(SlidingPagination.props.ariaCurrentPageLabel.required).toBe(false)
    expect(SlidingPagination.props.ariaCurrentPageLabel.type).toBe(String)
  })

  it('allows overriding the sliding ending size', () => {
    expect(SlidingPagination.props).toHaveProperty('slidingEndingSize.required')
    expect(SlidingPagination.props.slidingEndingSize.required).toBe(false)
    expect(SlidingPagination.props.slidingEndingSize.type).toBe(Number)
  })

  it('allows overriding the sliding window size', () => {
    expect(SlidingPagination.props).toHaveProperty('slidingWindowSize.required')
    expect(SlidingPagination.props.slidingWindowSize.required).toBe(false)
    expect(SlidingPagination.props.slidingWindowSize.type).toBe(Number)
  })

  it('allows overriding the non-sliding size', () => {
    expect(SlidingPagination.props).toHaveProperty('nonSlidingSize.required')
    expect(SlidingPagination.props.nonSlidingSize.required).toBe(false)
    expect(SlidingPagination.props.nonSlidingSize.type).toBe(Number)
  })

  it('allows overriding the page display component', () => {
    expect(SlidingPagination.props).toHaveProperty('pageComponent.required')
    expect(SlidingPagination.props.pageComponent.required).toBe(false)
    expect(SlidingPagination.props.pageComponent.type).toBe(String)
  })
})

describe('SlidingPagination.vue', () => {
  let basicTestWrapper = null

  beforeEach(() => {
    basicTestWrapper = shallowMount(SlidingPagination, {
      propsData: {
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

  it('calculates the correct beginning interval', () => {
    expect(basicTestWrapper.vm.beginningPages).toEqual([1, 2])

    basicTestWrapper.setProps({ current: 2 })

    expect(basicTestWrapper.vm.beginningPages).toEqual([1, 2])

    basicTestWrapper.setProps({ current: 9 })

    expect(basicTestWrapper.vm.beginningPages).toEqual([1, 2])

    basicTestWrapper.setProps({ nonSlidingSize: 10 })

    expect(basicTestWrapper.vm.beginningPages).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(basicTestWrapper.vm.endingPages).toEqual([])
    expect(basicTestWrapper.vm.slidingWindowPages).toEqual([])
  })

  it('calculates the correct ending interval', () => {
    expect(basicTestWrapper.vm.endingPages).toEqual([9, 10])

    basicTestWrapper.setProps({ current: 2 })

    expect(basicTestWrapper.vm.endingPages).toEqual([9, 10])

    basicTestWrapper.setProps({ current: 9 })

    expect(basicTestWrapper.vm.endingPages).toEqual([9, 10])
  })

  it('calculates the correct window interval with an odd sliding window size', () => {
    // this is just stating the obvious here
    basicTestWrapper.setProps({ current: 1, slidingWindowSize: 3 })

    expect(basicTestWrapper.vm.slidingWindowPages).toEqual([3, 4, 5])
    expect(basicTestWrapper.vm.hasBeginningGap).toBeFalsy()
    expect(basicTestWrapper.vm.hasEndingGap).toBeTruthy()

    basicTestWrapper.setProps({ current: 3 })
    expect(basicTestWrapper.vm.slidingWindowPages).toEqual([3, 4, 5])
    expect(basicTestWrapper.vm.hasBeginningGap).toBeFalsy()
    expect(basicTestWrapper.vm.hasEndingGap).toBeTruthy()

    basicTestWrapper.setProps({ current: 4 })
    expect(basicTestWrapper.vm.slidingWindowPages).toEqual([3, 4, 5])
    expect(basicTestWrapper.vm.hasBeginningGap).toBeFalsy()
    expect(basicTestWrapper.vm.hasEndingGap).toBeTruthy()

    basicTestWrapper.setProps({ current: 7 })
    expect(basicTestWrapper.vm.slidingWindowPages).toEqual([6, 7, 8])
    expect(basicTestWrapper.vm.hasBeginningGap).toBeTruthy()
    expect(basicTestWrapper.vm.hasEndingGap).toBeFalsy()

    basicTestWrapper.setProps({ current: 5 })
    expect(basicTestWrapper.vm.slidingWindowPages).toEqual([4, 5, 6])
    expect(basicTestWrapper.vm.hasBeginningGap).toBeTruthy()
    expect(basicTestWrapper.vm.hasEndingGap).toBeTruthy()

    basicTestWrapper.setProps({ current: 6 })
    expect(basicTestWrapper.vm.slidingWindowPages).toEqual([5, 6, 7])
    expect(basicTestWrapper.vm.hasBeginningGap).toBeTruthy()
    expect(basicTestWrapper.vm.hasEndingGap).toBeTruthy()
  })

  it('calculates the correct window interval with an even sliding window size', () => {
    // this is just stating the obvious here
    basicTestWrapper.setProps({ current: 1, slidingWindowSize: 4, slidingEndingSize: 2, total: 20 })

    expect(basicTestWrapper.vm.slidingWindowPages).toEqual([3, 4, 5, 6])
    expect(basicTestWrapper.vm.slidingWindowPages.length).toBe(4)
    expect(basicTestWrapper.vm.hasBeginningGap).toBeFalsy()
    expect(basicTestWrapper.vm.hasEndingGap).toBeTruthy()

    basicTestWrapper.setProps({ current: 3 })
    expect(basicTestWrapper.vm.slidingWindowPages).toEqual([3, 4, 5, 6])
    expect(basicTestWrapper.vm.hasBeginningGap).toBeFalsy()
    expect(basicTestWrapper.vm.hasEndingGap).toBeTruthy()

    basicTestWrapper.setProps({ current: 4 })
    expect(basicTestWrapper.vm.slidingWindowPages).toEqual([3, 4, 5, 6])
    expect(basicTestWrapper.vm.hasBeginningGap).toBeFalsy()
    expect(basicTestWrapper.vm.hasEndingGap).toBeTruthy()

    basicTestWrapper.setProps({ current: 7 })
    expect(basicTestWrapper.vm.slidingWindowPages).toEqual([5, 6, 7, 8])
    expect(basicTestWrapper.vm.slidingWindowPages.length).toBe(4)
    expect(basicTestWrapper.vm.hasBeginningGap).toBeTruthy()
    expect(basicTestWrapper.vm.hasEndingGap).toBeTruthy()

    basicTestWrapper.setProps({ current: 17 })
    expect(basicTestWrapper.vm.slidingWindowPages).toEqual([15, 16, 17, 18])
    expect(basicTestWrapper.vm.slidingWindowPages.length).toBe(4)
    expect(basicTestWrapper.vm.hasBeginningGap).toBeTruthy()
    expect(basicTestWrapper.vm.hasEndingGap).toBeFalsy()

    basicTestWrapper.setProps({ current: 11 })
    expect(basicTestWrapper.vm.slidingWindowPages).toEqual([9, 10, 11, 12])
    expect(basicTestWrapper.vm.slidingWindowPages.length).toBe(4)
    expect(basicTestWrapper.vm.hasBeginningGap).toBeTruthy()
    expect(basicTestWrapper.vm.hasEndingGap).toBeTruthy()
  })

  it('emits a page-change on page activation', () => {
    let eventWrapper = mount(SlidingPagination, {
      propsData: {
        current: 1,
        total: 1
      }
    })

    eventWrapper.find(SlidingPaginationDefaultPage).trigger('click')

    expect(eventWrapper.emitted()['page-change']).toBeTruthy()
    expect(eventWrapper.emitted()['page-change'].length).toBe(1)
    expect(eventWrapper.emitted()['page-change'][0]).toEqual([1])
  })
})

// TODO: Page swap test
describe('SlidingPagination.vue-custom', () => {
  it('supports replacing the default page component', () => {
    let localVue = createLocalVue()

    localVue.component('TestPageComponent', {
      name: 'TestPageComponent',

      props: {
        page: {
          type: Number,
          required: true
        }
      },

      render(h) {
        return h('a', { class: 'test-page-component' }, 'Test Page ' + this.page)
      }
    })

    let wrapper = mount(SlidingPagination, {
      localVue,
      propsData: {
        current: 1,
        total: 3,
        pageComponent: 'TestPageComponent'
      }
    })

    expect(wrapper.find('.test-page-component').text()).toBe('Test Page 1')
  })
})
