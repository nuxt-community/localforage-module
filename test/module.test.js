const { setup, loadConfig, url } = require('@nuxtjs/module-test-utils')

describe('module', () => {
  let nuxt

  beforeAll(async () => {
    ({ nuxt } = (await setup(loadConfig(__dirname))))
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', async () => {
    const window = await nuxt.server.renderAndGetWindow(url('/'))
    const html = window.document.body.innerHTML
    expect(html).toContain('Length: 1')
  })
})
