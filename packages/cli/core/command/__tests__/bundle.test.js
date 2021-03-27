const { handler: bundle, messages } = require('../bundle')

it('Must be function', () => {
  expect(typeof bundle).toBe('function')
})

it('Messages must provided "start" and "end" messages', () => {
  const { start, end } = messages({ output: '' })

  expect(typeof start).toBe('string')
  expect(typeof end).toBe('string')
})
