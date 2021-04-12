#!/usr/bin/env node
const minimist = require('minimist');
const fs = require('fs');
const {spawn} = require('child_process');
const {readFileSync} = require('fs');
const {resolve} = require('path');
const argv = minimist(process.argv.slice(2));
const path = require('path');

function help() {
    const man = readFileSync(resolve(__dirname, './man.txt'), {encoding: 'utf-8'});
    console.log(man);
}

if (argv.help) {
    help()
    process.exit(0);
}

let projectName = argv._[0]
if (!projectName || path.basename(path.resolve()) !== 'apps') {
    help()
    process.exit(1)
}

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
        const packageFile = require('path').join(projectPath, '/package.json');
        const nodeModulesDir = require('path').join(projectPath, '/node_modules');
        const packageLockFile = require('path').join(projectPath, '/package-lock.json');

        try {
            // Write package.json
            fs.writeFileSync(packageFile, json);

            // Remove node_modules
            fs.rmdirSync(nodeModulesDir, {recursive: true});

            // Remove package-lock.json
            fs.unlinkSync(packageLockFile)
        } catch (err) {
            console.log(err);
        }

        // Run npm install from project root
        const cra = spawn('npm', ['install'], {cwd: require('path').resolve(__dirname, '../../')});
        cra.on('exit', code => {
            if (code !== 0) {
                reject(new Error('Post create react app task (npm install from the root) failed'));
            }

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
