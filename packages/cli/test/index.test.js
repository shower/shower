const index = require('../index')

it('Must be a object', () => {
  expect(typeof index === 'object' && index !== null).toBe(true)
})

it('Must contain libs', () => {
  const keys = Object.keys(index)

  expect(keys.sort()).toEqual(['archive', 'create', 'pdf', 'serve', 'prepare'].sort())
})

it('Libs must be functions', () => {
  for (const lib in index) {
    if (!index.hasOwnProperty(lib)) {
      continue
    }

    expect(typeof index[lib]).toBe('function')
  }
})
