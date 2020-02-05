const calculations = require('./calculations')

test('calculate text position', () => {
    expect(calculations.calculateTextPosition(100, 100, 80, 80)).toStrictEqual({
        x: 10,
        y: 90
    });
})

test('calculate text width', () => {
    expect(calculations.calculateTextSize('Agqi97984646864', '100px Arial').height).toBeLessThanOrEqual(100)
})

test('calculate max font size', () => {
    expect(calculations.calculateMaxFontSize("AB", 32, 32, 'Arial')).toBeLessThanOrEqual(40)
    expect(calculations.calculateMaxFontSize("AQq", -50, 32, 'Arial')).toBeLessThanOrEqual(40)
})

test('if is contained', () => {
    expect(calculations.isContained(100, 100, 99, 101)).toBeFalsy()
    expect(calculations.isContained(100, 100, 99, 100)).toBeTruthy()
    expect(calculations.isContained(-1, 100, 999999, 100)).toBeTruthy()
    expect(calculations.isContained(-1, 100, 999999, 101)).toBeFalsy()
})