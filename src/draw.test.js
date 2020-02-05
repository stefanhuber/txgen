const draw = require('./draw')
const utils = require('./utils')
const { createCanvas, loadImage } = require('canvas')

test('draw smaller background repeatingly onto canvas', async () => {
    return loadImage("./test_data/real_backgrounds/008.png").then(async (background) => {
        const canvas = createCanvas(500, 500)
        draw.drawRepeatableBackground(canvas.getContext('2d'), background, 500, 500)
        await utils.storeCanvas(canvas, "./.tmp/repeatable_background.jpg")            
    })
})


