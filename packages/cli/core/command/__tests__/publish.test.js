const publish = require('../publish')

it('Must be function', () => {
  expect(typeof publish).toBe('function')
})

it('Messages must provided "end" message', () => {
  const { end } = publish.messages({}, {})

  expect(typeof end).toBe('string')
})
