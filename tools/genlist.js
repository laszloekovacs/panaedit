// generate an array of paths of all files in the demo directory
import fs from 'fs'
import path from 'path'

const demoDir = './public'

// get the subdirectores into an array
const entries = fs.readdirSync(demoDir, { withFileTypes: true })

let list = []

// for each directory, call a function
entries.forEach((entry) => {
	if (entry.isDirectory()) {
		// push all files in the directory into the list
		const files = fs.readdirSync(path.join(demoDir, entry.name))

		const p = files.map((file) => '/' + entry.name + '/' + file)

		list = [...list, ...p]
	}
})

console.log(list)
console.log(`found ${list.length} files`)

// write the list into a json into public
fs.writeFileSync('./public/filemanifest.json', JSON.stringify(list, null, 2))
