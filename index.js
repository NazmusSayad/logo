import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const regex = /\.svg$/
const types = ['jpeg', 'png', 'webp', 'tiff']
const sizes = [
  8, 16, 24, 32, 48, 57, 58, 60, 62, 64, 72, 76, 80, 96, 99, 1024, 114, 120,
  128, 144, 152, 173, 180, 192, 200, 256, 384, 512, 640, 768, 800, 1024, 1280,
  1440, 1600, 1920, 2048, 2560, 2880, 3000, 3072, 3200, 3840, 4096, 5120, 6000,
  6144, 8192,
]

const inputDir = path.resolve('./svg')
const outputDir = path.resolve('./images')
cleanDirSync(path.join(outputDir))

fs.readdirSync(inputDir)
  .filter((svg) => regex.test(svg))
  .forEach((svg) => {
    const input = path.join(inputDir, svg)
    fs.copyFileSync(input, outputDir + '/' + svg)

    async function createFile(type, size) {
      const fileName = `${size}.${type}`
      const outputFile = path.join(outputDir, fileName)

      await sharp(input)
        .resize({ width: size })
        [type]({ quality: 100 })
        .toFile(outputFile)

      console.log(fileName)
    }

    types.forEach((type) => sizes.forEach((size) => createFile(type, size)))
  })

function cleanDirSync(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true })
  fs.mkdirSync(dir, { recursive: true })
}
