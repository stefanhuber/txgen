const utils = require('./utils')

test('loading files from folder', async () => {
    let files = await utils.readFilesFromDirectory('./test_data/fonts', /\.ttf$/)
    expect(files.length).toBe(2)
})

test('loading backgrounds from folder', async () => {
    let backgrounds = await utils.loadBackgrounds('./test_data/backgrounds')
    expect(backgrounds.length).toBe(3)    
})