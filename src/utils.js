const fs = require('fs')
const { registerFont } = require('canvas')
const RandExp = require('randexp')

function storeCanvas(canvas, filename) {
    return new Promise((resolve, reject) => {        
        const out = fs
            .createWriteStream(filename)
            .on('close', () => resolve())

        canvas.createJPEGStream({ bufsize: 2048, quality: 95 })
            .on('end', () => out.close())
            .pipe(out)
    })
}

function checkDirectory(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
    }
}

function countFilesInDirectory(path, pattern) {
    if (!fs.existsSync(path)) {
        return 0
    }

    let files = fs.readdirSync(path)
    let count = 0

    for (let file of files) {
        if (pattern && pattern.test(file)) {
            count++;
        } else if (!pattern) {
            count++;
        }
    }

    return count
}

function generateText(regex) {
    return new RandExp(regex).gen();
}

function loadBackgrounds(path) {
    return readFilesFromDirectory(path, /\.(png|jpg|jpeg|gif|JPG|PNG|JPEG|GIF)$/)
        .then((files) => files.map(file => path + "/" + file))
}

function loadRandomFont(path) {
    return readFilesFromDirectory(path, /\.ttf$/)
        .then((files) => {            
            if (files.length > 0) {
                const index = Math.round(Math.random() * (files.length - 1))
                const match = /^(.*?)\.ttf$/.exec(files[index])
                registerFont(path + "/" + files[index], {family: match[1]})          
                return match[1]   
            } else {
                return 'Sans'
            }                     
        })
}

function readFilesFromDirectory(path, regex) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                reject(err)
            } else {
                let output = []
                for (let file of files) {
                    if (regex.test(file)) {
                        output.push(file)
                    }
                }
                resolve(output)
            }
        })
    })    
}

module.exports = {
    generateText: generateText,
    storeCanvas: storeCanvas,    
    loadRandomFont: loadRandomFont,
    readFilesFromDirectory: readFilesFromDirectory,
    loadBackgrounds: loadBackgrounds,
    checkDirectory: checkDirectory,
    countFilesInDirectory: countFilesInDirectory
}
