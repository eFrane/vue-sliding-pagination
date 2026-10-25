import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'vue-sliding-pagination',
  description: 'ARIA-friendly pagination component with a sliding window.',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Guide',
        link: '/guide'
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/eFrane/vue-sliding-pagination' }
    ],
    editLink: {
      pattern: 'https://github.com/eFrane/vue-sliding-pagination/edit/main/docs/:path'
    },
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Usage', link: '/guide' },
          { text: 'Examples', link: '/examples' }
        ]
      }
    ]
  }
})
