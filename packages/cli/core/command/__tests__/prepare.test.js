const prepare = require('../prepare')

it('Must be function', () => {
  expect(typeof prepare).toBe('function')
})

it('Messages must provided "start" and "end" messages', () => {
  const { start, end } = prepare.messages({}, { output: '' })

  expect(typeof start).toBe('string')
  expect(typeof end).toBe('string')
})
