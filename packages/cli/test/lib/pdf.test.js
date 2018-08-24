const fs = require('fs')
const path = require('path')
const pdfParse = require('pdf-parse')
const { promisify } = require('util')

const pdf = require('../../source/lib/pdf')

it('Must be function', () => {
  expect(typeof pdf).toBe('function')
})

it('Messages must provided "start" and "end" messages', () => {
  const { start, end } = pdf.messages({}, { file: '' })

  expect(typeof start).toBe('string')
  expect(typeof end).toBe('string')
})

it('must generated pdf file', async () => {
  const root = path.join(__dirname, 'fixtures', 'pdf')
  const cases = await promisify(fs.readdir)(root)

  async function readPresentation (file) {
    const presentation = await pdfParse(await promisify(fs.readFile)(file))

    // Skip 'info' key
    delete presentation['info']

    return presentation
  }

  await Promise.all(cases.map(async (file) => {
    const generatedPresentationFile = path.join(__dirname, '..', '..', 'temp', `${file}_presentation.pdf`)
    const canonPresentationFile = path.join(__dirname, 'fixtures', 'pdf', file, 'presentation.pdf')

    await pdf(
      { root: path.join(root, file) },
      { file: generatedPresentationFile }
    )

    const canonPresentation = await readPresentation(canonPresentationFile)
    const generatedPresentation = await readPresentation(generatedPresentationFile)

    expect(canonPresentation).toEqual(generatedPresentation)
  }))
})
