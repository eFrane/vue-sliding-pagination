import { mount } from '@vue/test-utils'
import SlidingPaginationDefaultPage from '@/SlidingPaginationDefaultPage.vue'

describe('SlidingPaginationDefaultPage.vue', () => {
  it('is named correctly', () => {
    expect(SlidingPaginationDefaultPage.name).toEqual('SlidingPaginationDefaultPage')
  })

  it('requires a page label', () => {
    expect(SlidingPaginationDefaultPage.props).toHaveProperty('ariaPageLabel.required')
    expect(SlidingPaginationDefaultPage.props.ariaPageLabel.required).toBe(true)
    expect(SlidingPaginationDefaultPage.props.ariaPageLabel.type).toBe(String)
  })

  it('requires a page class', () => {
    expect(SlidingPaginationDefaultPage.props).toHaveProperty('pageClass.required')
    expect(SlidingPaginationDefaultPage.props.ariaPageLabel.required).toBe(true)
    expect(SlidingPaginationDefaultPage.props.ariaPageLabel.type).toBe(String)
  })

  it('requires a page number', () => {
    expect(SlidingPaginationDefaultPage.props).toHaveProperty('page.required')
    expect(SlidingPaginationDefaultPage.props.page.required).toBe(true)
    expect(SlidingPaginationDefaultPage.props.page.type).toBe(Number)
  })

  it('requires a current toggle', () => {
    expect(SlidingPaginationDefaultPage.props).toHaveProperty('isCurrent.required')
    expect(SlidingPaginationDefaultPage.props.isCurrent.required).toBe(true)
    expect(SlidingPaginationDefaultPage.props.isCurrent.type).toBe(Boolean)
  })

  it('renders a link', () => {
    const wrapper = mount(SlidingPaginationDefaultPage, {
      propsData: {
        ariaPageLabel: 'Page label',
        isCurrent: false,
        page: 1,
        pageClass: 'c-sliding-pagination__page'
      }
    })

    expect(wrapper.find('a').attributes('aria-label')).toBe('Page label')
    expect(wrapper.find('a').classes('c-sliding-pagination__page')).toBeTruthy()
    expect(wrapper.text()).toBe('1')
  })

  it('changes currentClass modifier class on change of isCurrent', () => {
    const wrapper = mount(SlidingPaginationDefaultPage, {
      propsData: {
        ariaPageLabel: 'Page label',
        isCurrent: false,
        page: 1,
        pageClass: 'c-sliding-pagination__page'
      }
    })

    expect(wrapper.vm.currentClasses).toBe('c-sliding-pagination__page')
    expect(wrapper.element).toMatchSnapshot()

    wrapper.setProps({ isCurrent: true })

    expect(wrapper.vm.currentClasses).toBe('c-sliding-pagination__page c-sliding-pagination__page--current')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('emits a page-click on link activation', () => {
    const wrapper = mount(SlidingPaginationDefaultPage, {
      propsData: {
        ariaPageLabel: 'Page label',
        isCurrent: false,
        page: 1,
        pageClass: 'c-sliding-pagination__page'
      }
    })

    wrapper.find('a').trigger('click')
    expect(wrapper.emitted()['page-click']).toBeTruthy()
    expect(wrapper.emitted()['page-click'].length).toBe(1)
    expect(wrapper.emitted()['page-click'][0]).toEqual([1])
  })
})
