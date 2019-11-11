#!/usr/bin/env node

const program = require('commander')
const package = require('./../package.json')
const { generateBulk } = require('../index')

program
    .version(package.version)
    .requiredOption('-b, --backgrounds <backgrounds>', 'Path to directory with background image files')
    .requiredOption('-f, --fonts <fonts>', 'Path to directory, which contains .ttf font files')
    .option('-o, --output <output>', 'Output directory of generated files', './')
    .option('-t, --text <text>', 'A text string which should be generated', '')
    .option('-a, --padding <padding>', 'Padding in pixels between image border and generated text', 0)
    .option('-p, --pattern <pattern>', 'A regex pattern which defines strings to be generated', '')
    .option('-n, --number <number>', 'The total number of output images which should be generated', 1)    
    .option('-s, --fontsize <fontsize>', 'The fontsize which should be used in pixels', 0)
    .option('-w, --width <width>', 'The width of the output image in pixels', 0)
    .option('-h, --height <height>', 'The height of the output image in pixels', 0)
    .option('-d, --directory', 'The generated output should be placed in directories with text/pattern name and incremental filenames', false)   
    .parse(process.argv)

try {
    generateBulk({
        backgrounds: program.backgrounds,
        fonts: program.fonts,
        output: program.output,
        text: program.text,
        pattern: program.pattern,
        total: parseFloat(program.number),
        fontSize: parseFloat(program.fontsize),
        directory: program.directory,
        width: parseFloat(program.width),
        height: parseFloat(program.height),
        textPadding: parseFloat(program.padding)
    }).catch(e => {
        throw e.message
    })
} catch (e) {
    console.error("There was an error while processing: " + e.message)
}