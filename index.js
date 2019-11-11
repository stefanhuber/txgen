const fs = require('fs')
const { storeCanvas, generateText, loadRandomFont, loadBackgrounds, checkDirectory, countFilesInDirectory } = require('./src/utils')
const { createEngravedText } = require('./src/create-engraved-text')

async function generateBulk(options) {
    if (options.directory == false) {
        for (let i = 0; i < options.total; i++) {
            if (options.pattern) {
                options.text = generateText(new RegExp(options.pattern))
            }
            await generate(options)
        }
    } else if (options.directory == true) {
        let outputs = {}

        for (let i = 0; i < options.total; i++) {
            if (options.pattern) {
                options.text = generateText(new RegExp(options.pattern))
            }

            let outdir = options.output + '/' + options.text
            outputs[options.text] = countFilesInDirectory(outdir)

            checkDirectory(options.output)
            options.filename = outputs[options.text] + 1
            await generate({...options, output: outdir})
        }
    }
}

async function generate(options) {    
    checkDirectory(options.output)

    return loadBackgrounds(options.backgrounds)
        .then(backgrounds => {
            return loadRandomFont(options.fonts)
                .then(font => createEngravedText({
                    text: options.text,
                    background: backgrounds[Math.round(Math.random() * (backgrounds.length - 1))],
                    font: font,
                    fontSize: (options.fontSize && options.fontSize > 0) ? options.fontSize : 0,
                    shadowColor: options.shadowColor || 'rgba(0,0,0,0.8)',
                    color: options.color || 'rgba(255,255,255,0.45)',
                    textPadding: options.textPadding || 0,
                    height: (options.height && options.height > 0) ? options.height : 0,
                    width: (options.width && options.width > 0) ? options.width : 0
                }))
            })
            .then(canvas => {
                return storeCanvas(canvas, options.output + '/' + (options.filename || options.text) + ".jpg")
            })
}

module.exports = {
    generate: generate,
    generateBulk: generateBulk
}