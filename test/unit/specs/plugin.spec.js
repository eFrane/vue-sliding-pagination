import { createApp } from 'vue'
import plugin from '@/plugin'

describe('plugin', () => {
  it('exports a vue plugin', () => {
    expect(typeof plugin).toBe('object')
    expect(Object.hasOwnProperty.call(plugin, 'install')).toBeTruthy()
    expect(typeof plugin.install).toBe('function')
  })

  it('should be used correctly', async () => {
    const App = {
      template: '<div></div>'
    }

    await createApp(App).use(plugin).mount()
  })
})
