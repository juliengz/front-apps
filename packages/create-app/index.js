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

const json = `{
    "name": "@sewan/${projectName}",
    "version": "1.0.0",
    "private": true,
    "peerDependencies": {
        "@sewan/core": "^1.0.0"
    },
    "dependencies": {
        "react-scripts": "4.0.3"
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
}`;

async function createReactApp(projectName) {
    return new Promise((resolve, reject) => {
        const templatePath = require('path').resolve(__dirname, './cra-template-foundation');
        const template = `file:${templatePath}`;

        const cra = spawn('npx', ['create-react-app', projectName, '--use-npm', '--template', template], {stdio: 'inherit'})
        cra.on('exit', code => {
            if (code !== 0) {
                reject(new Error('CRA failed'));
            }

            const abspath = resolve(projectName);
            resolve(abspath);
        });
    })
}

async function updateApp(projectName) {
    return new Promise((resolve, reject) => {
        const projectPath = require('path').join('./', projectName);

        // write package.json
        const packageFile = require('path').join(projectPath, '/package.json');

        try {
            fs.writeFileSync(packageFile, json);
        } catch (err) {
            console.log(err);
        }

        // remove node_modules
        const nodeModulesDir = require('path').join(projectPath, '/node_modules');

        // remove package-lock.json
        const packageLockFile = require('path').join(projectPath, '/package-lock.json');
        fs.unlink(packageLockFile, (err) => {
            if (err) {
                console.log(err);
            }
        })

        // Run npm instal from project root
        console.log(require('path').resolve(__dirname, '../../'));
        const cra = spawn('npm', ['install'], {cwd: require('path').resolve(__dirname, '../../')});
        cra.on('exit', code => {
            // if (code !== 0) {
            //     reject(new Error('Install after CRA failed'));
            // }

            resolve(true);
        })
    })
}

async function main() {
    const projectAbsolutePath = await createReactApp(projectName)
    const isUpdated = await updateApp(projectName);
    console.log(`🙌 Project ${projectAbsolutePath} successfully created!`);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
})
