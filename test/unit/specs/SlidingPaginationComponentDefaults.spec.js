import { mount, shallowMount } from '@vue/test-utils'

import SlidingPagination from '@/SlidingPagination.vue'

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
  expect(SlidingPagination.props.pageComponent.type).toBe(Object)
})
