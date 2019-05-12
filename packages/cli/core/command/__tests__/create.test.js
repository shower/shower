const { handler: create, messages } = require('../create')

it('Must be function', () => {
  expect(typeof create).toBe('function')
})

it('Messages must provided "end" message', () => {
  const { end } = messages({ directory: '' })

  expect(typeof end).toBe('string')
})
