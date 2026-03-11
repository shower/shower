import { handler as serve } from '../serve.js'

it('Must be function', () => {
  expect(typeof serve).toBe('function')
})
