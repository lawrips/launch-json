'use strict';
const should = require('should'),
    proxyquire = require('proxyquire'),
    debug = require('debug')('launch-json');

let launchJson = {
    "version": "0.2.0",
    "configurations": [
        {
            "name": "launch",
            "type": "node",
            "request": "launch",
            "program": "${workspaceRoot}/lib/index.js",
            "cwd": "${workspaceRoot}",
            "env": {
                "NODE_ENV": "development",
                "theFox":"red",
                "theDog":"brown"
            }
        }
    ]
};

var stubs = { 
    fs: {
        existsSync : function(filePath) {
            return true;
        },

        readFileSync : function(filePath) {
            return JSON.stringify(launchJson);
        }        
    },

    path: {
        join: (one, two) => {
            return './launch.json';
        }
    }
}

describe('launch json unit tests', () => {
    it('load env that doesnt exist', (done) => {
        var launchJson = proxyquire('../lib/index', stubs)('prod');

        should.not.exist(process.env['theDog']);
        should.not.exist(process.env['theFox']);
        done();
    });    
});