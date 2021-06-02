import { createLocalVue, mount } from '@vue/test-utils'

import SlidingPagination from '@/SlidingPagination.vue'

describe('SlidingPagination.vue-custom', () => {
  const localVue = createLocalVue()

  const TestPageComponent = {
    name: 'TestPageComponent',

    props: {
      page: {
        type: Number,
        required: true
      }
    },

    render (h) {
      const self = this
      return h(
        'a',
        {
          class: `test-page-component-${this.page}`,
          on: {
            click: function () {
              self.$emit('page-click', 42)
            }
          }
        },
        'Test Page ' + this.page
      )
    }
  }

  localVue.component('TestPageComponent', TestPageComponent)

  it('supports replacing the default page component', () => {
    const wrapper = mount(SlidingPagination, {
      localVue,
      propsData: {
        current: 1,
        total: 3,
        pageComponent: TestPageComponent
      }
    })

    expect(wrapper.find('.test-page-component-1').text()).toBe('Test Page 1')
  })

  it('relies on page component arguments for changing page', () => {
    const wrapper = mount(SlidingPagination, {
      localVue,
      propsData: {
        current: 1,
        total: 44,
        pageComponent: TestPageComponent
      }
    })

    wrapper.find('.test-page-component-1').trigger('click')

    expect(wrapper.emitted()['page-change']).toBeTruthy()
    expect(wrapper.emitted()['page-change'].length).toBe(1)
    expect(wrapper.emitted()['page-change'][0]).toEqual([42])
  })
})
