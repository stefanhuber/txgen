const { createEngravedText } = require('./create-engraved-text')
const { loadBackgrounds, loadRandomFont, storeCanvas } = require('./utils')

test('create engraved text', async () => {
    return Promise.all([
        loadBackgrounds('./test_data/real_backgrounds'),
        loadRandomFont('./test_data/real_fonts')
    ]).then(results => {
        return createEngravedText({
            text: "ABC DEF 123 456",
            background: results[0][0],
            font: results[1],
            shadowColor: 'rgba(0,0,0,0.8)',
            color: 'rgba(255,255,255,0.45)',
            textPadding: 10,
            height: 80,
            width: 600
        })
    }).then(canvas => {
        return storeCanvas(canvas, "./.tmp/engraved_text.jpg")
    })   
})


