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
        },
        {
            "name": "dev",
            "type": "node",
            "request": "launch",
            "program": "${workspaceRoot}/lib/index.js",
            "cwd": "${workspaceRoot}",
            "env": {
                "NODE_ENV": "development",
                "theFox":"quick",
                "theDog":"lazy"
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
    it('require library', (done) => {
        var launchJson = proxyquire('../lib/index', stubs);

        done();
    });

    it('check env params loaded for default launch configuration', (done) => {
        var launchJson = proxyquire('../lib/index', stubs);

        process.env['theDog'].should.be.equal('brown');
        process.env['theFox'].should.be.equal('red');
        done();
    });

    it('check env params loaded for default launch configuration', (done) => {
        var launchJson = proxyquire('../lib/index', stubs)('dev');

        process.env['theDog'].should.be.equal('lazy');
        process.env['theFox'].should.be.equal('quick');
        done();
    });    
});