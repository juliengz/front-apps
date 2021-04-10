#!/usr/bin/env node

const minimist = require('minimist')
const fs = require('fs')

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

// --help
if (argv.help) {
    help()
    process.exit(0);
}

// function generateProjectName() {
//   return generateName({number: true}).dashed
// }

let projectName = argv._[0]
if (!projectName) {
    // projectName = generateProjectName()
    help()
    process.exit(1)
}
console.log(projectName)

const json = {
    "name": projectName,
    "version": "1.0.0",
    "private": true,
    "dependencies": {
        "react-scripts": "4.0.3",
    },
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    },
    "eslintConfig": {
        "extends": [
            "react-app",
            "react-app/jest"
        ]
    },
    "browserslist": {
        "production": [
            ">0.2%",
            "not dead",
            "not op_mini all"
        ],
        "development": [
            "last 1 chrome version",
            "last 1 firefox version",
            "last 1 safari version"
        ]
    }
};

const storeData = (data, path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}

async function createReactApp(projectName) {
    return new Promise((resolve, reject) => {
        const templatePath = require('path').resolve(__dirname, './cra-template-foundation')
        const template = `file:${templatePath}`
        console.log('template=', template)

        const cra = spawn('npx', ['create-react-app', projectName, '--use-npm', '--template', template], {stdio: 'inherit'})
        cra.on('exit', code => {
            if (code !== 0) {
                reject(new Error('CRA failed'))
            }

            const packageFile = require('path').join('./', projectName, '/package.json')
            storeData(json, packageFile);

            const dir = require('path').join('./', projectName, '/node_modules')
            fs.rmdirSync(dir, { recursive: true });

            const packageLockFile = require('path').join('./', projectName, '/package-lock.json')

            fs.unlink(packageLockFile, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })

            const abspath = resolve(projectName)
            resolve(abspath)
        })
    })
}

async function installApp(projectName) {
    return new Promise((resolve, reject) => {
        const cra = spawn('npm', ['install'], {cwd: require('path').resolve(__dirname, '../')})
        cra.on('exit', code => {
            resolve(true)
        })
    })
}

async function main() {
    const projectAbsolutePath = await createReactApp(projectName)
    const isInstalled = await installApp(projectName)
    console.log(`🙌 Project ${projectAbsolutePath} successfully created!`)
}

main().catch(err => {
    console.error(err)
    process.exit(1)
})
