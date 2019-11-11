const { createCanvas, loadImage } = require('canvas')
const { calculateDrawingParamsByFontsize, calculateDrawingParamsBySize } = require('./calculations')

function createEngravedText(options) {
    return new Promise((resolve, reject) => {        
        loadImage(options.background).then((background) => {
            try {   
                const params = options.fontSize > 0 ?
                    calculateDrawingParamsByFontsize(options.text, options.font, options.fontSize, options.textPadding) :
                    calculateDrawingParamsBySize(options.text, options.font, options.width, options.height, options.textPadding)

                const canvas = createCanvas(params.width, params.height)
                const ctx = canvas.getContext('2d')
                const backgroundX = Math.random() * (background.width - params.width)
                const backgroundY = Math.random() * (background.height - params.height)

                ctx.drawImage(background, backgroundX, backgroundY, params.width, params.height, 0, 0, params.width, params.height)
                ctx.font = params.fontSize + 'px ' + options.font
                
                ctx.fillStyle = options.color
                ctx.strokeStyle = 'rgba(0,0,0,1)'
                ctx.lineWidth = 2
                ctx.shadowOffsetX = -params.width + params.textX
                ctx.shadowOffsetY = 1.5
                ctx.shadowBlur = 2.5
                ctx.shadowColor = options.shadowColor
                ctx.strokeText(options.text, params.width, params.textY);
                
                ctx.globalCompositeOperation='destination-in'
                ctx.shadowColor='rgba(255,255,255,0)'
                ctx.fillText(options.text, params.textX, params.textY)

                ctx.shadowColor = 'transparent';
                ctx.globalCompositeOperation='destination-over';
                ctx.drawImage(background, backgroundX, backgroundY, params.width, params.height, 0, 0, params.width, params.height)

                resolve(canvas)
            } catch(e) {
                reject(e)
            }
        })
    })
}
    
module.exports = {
    createEngravedText: createEngravedText
}