'use strict';

const path = require('path'),
    fs = require('fs'),
    debug = require('debug')('launch-json');

let FILENAME = '/.vscode/launch.json';

var PATHS = [
    // the directory that the process was started within    
    process.cwd(),
    path.join(__dirname, '..') 
];

// first time this is called, make a copy of the original process.env
let originalProcessEnv = JSON.parse(JSON.stringify(process.env));

// on require, load 'launch' from launch.json into memory
module.exports = loadLaunchJson();

function loadLaunchJson() {
    // if the module is required via like this:
    // require('launch-json');
    // then the launch.json will get loaded automatically by this line
    _loadIt();

    // this function is returned so that the module can be required like this:
    // require('launch-json')('dev');
    // so that the environment is specified
    return (env) => {
        _loadIt(env)
    }
}

function _loadIt(env) {

    // default is "launch"
    if (!env) {
        env = 'launch';
    }

    // require the launch.json
    let requiredLaunchJson = _loadLaunchJson();;
    if (!requiredLaunchJson) {
        return debug(`Couldn't find .vscode/launch.json. Directories searched are:\n${PATHS.map((dir) => dir + FILENAME).join('\n')}`);
    }
    let loadedEnv;
    // find the environment specified (either "launch" by default or user specified)
    requiredLaunchJson.configurations.forEach((configuration) => {
        if (configuration.name.toLowerCase() == env) {
            loadedEnv = configuration.env;
        }
    });
    if (loadedEnv) {
        // before assigning, first reset the process.env to what it originally was
        process.env = JSON.parse(JSON.stringify(originalProcessEnv));

        // now merge the original process.env with loaded launch.json 
        process.env = Object.assign(process.env, loadedEnv);
        debug(`Successfully loaded ${env} from launch.json`)
    }
    else {
        debug(`Error! Didn't find configuration "${env}" in launch.json`)        
        process.env = JSON.parse(JSON.stringify(originalProcessEnv));
    }
}

function _loadLaunchJson() {
    let filePath;

    for (var i = 0; i < PATHS.length; i++) {
        filePath = path.join(path.resolve(PATHS[i]), FILENAME);
        if (!fs.existsSync(filePath)) continue;

        debug(`Found launch.json file: ${filePath}`);
        return JSON.parse(fs.readFileSync(path.resolve(filePath)));
    }
}