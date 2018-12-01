import { range } from '@/components/SlidingPagination.vue'

describe('range', () => {
  it('returns a range from start to end', () => {
    expect(range(1, 4)).toEqual([1, 2, 3, 4])
  })

  it('auto reverses backwards input', () => {
    expect(range(4, 1)).toEqual([1, 2, 3, 4])
  })
})
