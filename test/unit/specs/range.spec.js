import { range } from '@/SlidingPagination.vue'

describe('range', () => {
  it('returns a range from start to end', () => {
    expect(range(1, 4)).toEqual([1, 2, 3, 4])
  })

  it('auto reverses backwards input', () => {
    expect(range(4, 1)).toEqual([1, 2, 3, 4])
  })

  it('works with arbitrary intervals', () => {
    expect(range(3, 5)).toEqual([3, 4, 5])
    expect(range(-7, -10)).toEqual([-10, -9, -8, -7])
  })

  it('return an empty range on non-valid input', () => {
    expect(range()).toEqual([])
    expect(range('a', false)).toEqual([])
  })
})
