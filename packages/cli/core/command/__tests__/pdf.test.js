const pdf = require('../pdf')

it('Must be function', () => {
  expect(typeof pdf).toBe('function')
})

it('Messages must provided "start" and "end" messages', () => {
  const { start, end } = pdf.messages({}, { file: '' })

  expect(typeof start).toBe('string')
  expect(typeof end).toBe('string')
})
