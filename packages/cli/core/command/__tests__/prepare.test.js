const { handler: prepare, messages } = require('../prepare')

it('Must be function', () => {
  expect(typeof prepare).toBe('function')
})

it('Messages must provided "start" and "end" messages', () => {
  const { start, end } = messages({ output: '' })

  expect(typeof start).toBe('string')
  expect(typeof end).toBe('string')
})
