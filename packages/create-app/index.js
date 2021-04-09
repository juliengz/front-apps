#!/usr/bin/env node

const minimist = require('minimist')

// const {promisify} = require('util')
const {spawn} = require('child_process')
// const exec2 = promisify(exec)

const {readFileSync} = require('fs')
const {resolve} = require('path')

const argv = minimist(process.argv.slice(2));
// console.log(argv)

function help() {
  const man = readFileSync(resolve(__dirname, './man.txt'), {encoding: 'utf-8'});
  console.log(man);
}
//
// // --help
// if (argv.help) {
//   help()
//   process.exit(0);
// }
//
// // function generateProjectName() {
// //   return generateName({number: true}).dashed
// // }
//
// let projectName = argv._[0]
// if (!projectName) {
//   // projectName = generateProjectName()
//   help()
//   process.exit(1)
// }
// console.log(projectName)
//
// async function createReactApp(projectName) {
//   return new Promise((resolve, reject) => {
//     const templatePath = require('path').resolve(__dirname, './cra-template-foundation')
//     const template = `file:${templatePath}`
//     console.log('template=', template)
//
//     const cra = spawn('npx', ['create-react-app', projectName, '--template',template], { stdio: 'inherit' })
//     cra.on('exit', code => {
//       if (code !== 0) {
//         reject(new Error('CRA failed'))
//       }
//
//       const abspath = resolve(projectName)
//       resolve(abspath)
//     })
//   })
// }
//
// async function main() {
//   const projectAbsolutePath = await createReactApp(projectName)
//   console.log(`🙌 Project ${projectAbsolutePath} successfully created!`)
// }
//
// main().catch(err => {
//   console.error(err)
//   process.exit(1)
// })
