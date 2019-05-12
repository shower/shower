const create = require('../create')

it('Must be function', () => {
  expect(typeof create).toBe('function')
})

it('Messages must provided "end" message', () => {
  const { end } = create.messages({}, { directory: '' })

  expect(typeof end).toBe('string')
})
