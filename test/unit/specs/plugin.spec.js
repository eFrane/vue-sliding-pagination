import { createLocalVue } from '@vue/test-utils'

import plugin from '@/plugin'

describe('plugin', () => {
  it('exports a vue plugin', () => {
    expect(typeof plugin).toBe('object')
    expect(plugin.hasOwnProperty('install')).toBeTruthy()
    expect(typeof plugin.install).toBe('function')
  })

  it('registers SlidingPagination as component', () => {
    let localVue = createLocalVue()
    localVue.use(plugin)

    expect(localVue.options.components).toHaveProperty('SlidingPagination')
  })
})
