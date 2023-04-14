// generate an array of paths of all files in the demo directory
import fs from 'fs'
import path from 'path'

// list all entries in the public/demo directory
const demoDir = '../public/demo'
const entries = fs.readdirSync(demoDir)

console.log(entries)
