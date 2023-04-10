/*
 *
 * Line count, call with file extensions for example:
 *       node linecount.js .js .html .css
 *
 */

import fs from 'fs'
import path from 'path'

// Get the list of file extensions to search for from the command-line argument
const extensions = ['.js', '.ts', '.jsx', '.tsx', '.scss', '.css']

// Define the starting directory to scan for files
const startDir = './src'

// Create an object to store the total line count for each file extension
const lineCounts = {}

// Recursively scan the directory and its subdirectories for files
function scanDirectory(dir) {
	fs.readdirSync(dir).forEach((file) => {
		const filePath = path.join(dir, file)
		if (fs.statSync(filePath).isDirectory()) {
			// If the file is a directory, recursively scan it
			scanDirectory(filePath)
		} else {
			// If the file matches one of the specified extensions, count its lines and add to the lineCounts object
			const ext = path.extname(filePath).toLowerCase()
			if (extensions.includes(ext)) {
				const content = fs.readFileSync(filePath, 'utf8')
				const lines = content.split('\n').length
				if (!lineCounts[ext]) {
					lineCounts[ext] = lines
				} else {
					lineCounts[ext] += lines
				}
			}
		}
	})
}

// Call the scanDirectory function with the starting directory
scanDirectory(startDir)

let sum = 0
// Output the line counts for each file extension
for (const ext in lineCounts) {
	console.log(`.${ext}: ${lineCounts[ext]}`)
	sum += lineCounts[ext]
}

console.log(`Total: ${sum}`)
