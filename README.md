# launch-json
Helper library that loads the environment variables from Visual Studio Code's ([vscode](https://code.visualstudio.com)) launch.json into process.env.

## Usage
In your startup file (e.g. server.js, index.js or app.js), just include the following line:

```javascript
require('launch-json');
```
That's it! This module will then find the .vscode/launch.json file in your project and merge the environment variables into your process.env.

This will then allow you to run your node app from the command line without having to manually set the environment variables in your launch.json. 


## Why launch-json? 
This library is designed specifically for users of vscode who store environment variables in their project's launch.json. There's a few scenarios where using this library might be useful: 
* You want to make sure your code runs the same outside of vscode (which starts node processes by default with --debug enabled)
* You have Mocha tests (or tests from another test framework) which rely on environment variables
* Your environment variables have colon's in them. These are a pain to export into environment variables on macos

## Options
When required as above, this will load the default "launch" configuration from the .vscode/launch.json file. To choose a specific configuration, simply:

```javascript
require('launch-json')('myconfig');
```

## Example
Assume you have the following launch.json:
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "launch",
            "type": "node",
            "request": "launch",
            "program": "${workspaceRoot}/lib/index.js",
            "cwd": "${workspaceRoot}",
            "env": {
                "NODE_ENV": "local",
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
}
```

The following will work:
```javascript
require('launch-json'); // launch is selected by default
process.env['NODE_ENV']; // local
process.env['theFox']; // red
process.env['theDog']; // brown
```

The following will work:
```javascript
require('launch-json')('dev'); // dev will load
process.env['NODE_ENV']; // development
process.env['theFox']; // quick
process.env['theDog']; // lazy
```

