const { handler: publish, messages } = require('../publish')

it('Must be function', () => {
  expect(typeof publish).toBe('function')
})

it('Messages must provided "end" message', () => {
  const { end } = messages({})

  expect(typeof end).toBe('string')
})
