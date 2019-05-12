const { handler: serve } = require('../serve')

it('Must be function', () => {
  expect(typeof serve).toBe('function')
})
