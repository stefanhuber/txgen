const { createCanvas } = require('canvas')

function calculateDrawingParamsByFontsize(text, font, fontSize, textPadding) {
    const textSize = calculateTextSize(text, fontSize + 'px ' + font)
    const width = textSize.width + (textPadding * 2)
    const height = textSize.height + (textPadding * 2)
    const textPosition = calculateTextPosition(width, height, textSize.width, textSize.height)

    return {
        fontSize: fontSize,
        width: width,
        height: height,
        textX: textPosition.x,
        textY: textPosition.y
    }
}

function calculateDrawingParamsBySize(text, font, width, height, textPadding) {
    const fontSize = calculateMaxFontSize(text, width - (textPadding * 2), height - (textPadding * 2), font)         
    const textSize = calculateTextSize(text, fontSize + 'px ' + font)
    const calculatedWidth = width > 0 ? width : (textSize.width + (textPadding * 2))
    const textPosition = calculateTextPosition(calculatedWidth, height, textSize.width, textSize.height)

    return {
        fontSize: fontSize,
        width: calculatedWidth,
        height: height,
        textX: textPosition.x,
        textY: textPosition.y
    }
}

function calculateTextPosition(width, height, textWidth, textHeight) {
    let textX = 0
    let textY = height

    if (textWidth < width) {
        textX = (width - textWidth) / 2
    }
    if (textHeight < height) {
        textY = height - ((height - textHeight)/2)
    }

    return {
        x: textX,
        y: textY
    }
}

function calculateTextSize(text, font) { 
    const canvas = createCanvas(10, 10)     
    const ctx = canvas.getContext('2d')
    ctx.font = font
    const result = ctx.measureText(text)

    return {
        width: result.width,
        height: result.actualBoundingBoxAscent + result.actualBoundingBoxDescent
    }
}

function isContained(maxWidth, maxHeight, width, height) {
    if (maxWidth <= 0 && (height == maxHeight || height == maxHeight-1)) { // ignore width
        return true
    } else if ((width <= maxWidth && (height == maxHeight || height == maxHeight-1)) ||
               (height <= maxHeight && (width == maxWidth || width == maxWidth-1))) {
        return true        
    } else {
        return false
    }
}

function calculateMaxFontSize(text, width, height, font, fontSize) {
    fontSize = (fontSize <= 0 || !fontSize) ? height : fontSize
    const textSize = calculateTextSize(text, fontSize + 'px ' + font)

    if (isContained(width, height, textSize.width, textSize.height)) {
        return fontSize
    } else if ((textSize.width < width && textSize.height < height) || (width <= 0 && textSize.height < height)) {
        return calculateMaxFontSize(text, width, height, font, fontSize+1)
    } else if (textSize.width > width || textSize.height > height) {
        if (fontSize <= 1) {
            return 1
        } else {
            return calculateMaxFontSize(text, width, height, font, fontSize-1)
        }           
    }
}

module.exports = {
    isContained: isContained,
    calculateTextSize: calculateTextSize,    
    calculateMaxFontSize: calculateMaxFontSize,
    calculateTextPosition: calculateTextPosition,
    calculateDrawingParamsByFontsize: calculateDrawingParamsByFontsize,
    calculateDrawingParamsBySize: calculateDrawingParamsBySize
}