const { createCanvas } = require('canvas')

function drawRepeatableBackground(context, background, width, height) {
    const patternCanvas = createRepeatablePatternCanvas(background)
    const pattern = context.createPattern(patternCanvas, 'repeat')
    context.fillStyle = pattern
    context.fillRect(0, 0, width, height)
}

function createRepeatablePatternCanvas(background) {
    const canvas = createCanvas(background.width * 2, background.height * 2)
    const context = canvas.getContext('2d')

    context.save()
    context.translate(0, 0)
    context.drawImage(background, 0, 0)
    context.restore()

    context.save()
    context.translate(0, background.height * 2)
    context.scale(1, -1)
    context.drawImage(background, 0, 0)
    context.restore()
   
    context.save()
    context.translate(background.width * 2, background.height * 2)
    context.scale(-1, -1)
    context.drawImage(background, 0, 0)
    context.restore()
        
    context.save()
    context.translate(background.width * 2, 0)
    context.scale(-1, 1)
    context.drawImage(background, 0, 0)
    context.restore()

    return canvas
}

module.exports = {
    drawRepeatableBackground: drawRepeatableBackground
}