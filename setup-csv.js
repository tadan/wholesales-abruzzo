const fs = require('fs')
const path = require('path')

// Paths
const sourceDir = path.join(__dirname, 'csv')
const targetDir = path.join(__dirname, 'public', 'csv')
const sourceFile = path.join(sourceDir, 'Wholesale Products - Sheet.csv')
const targetFile = path.join(targetDir, 'Wholesale Products - Sheet.csv')

// Create directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
    console.log(`Creating directory: ${targetDir}`)
    fs.mkdirSync(targetDir, { recursive: true })
}

// Copy the file
if (fs.existsSync(sourceFile)) {
    console.log(`Copying file from ${sourceFile} to ${targetFile}`)
    fs.copyFileSync(sourceFile, targetFile)
    console.log('CSV file successfully copied to public folder!')
} else {
    console.error(`Source file not found: ${sourceFile}`)
    console.error('Please make sure the CSV file exists in the csv directory.')
}
