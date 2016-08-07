# launch-json
Helper library that loads the environment variables from vscode's launch.json so that you can run your node app from the command line.

## Usage
Anywhere in your project, just include the following line:

```javascript
require('launch-json');
```
That's it! This module will then find the .vscode/launch.json file and merge the environment variables with your process.env. This will then allow you to run your node app from the command line without having to manually set the environment variables. 


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
            "name": "Launch",
            "type": "node",
            "request": "launch",
            "program": "${workspaceRoot}/lib/index.js",
            "stopOnEntry": false,
            "args": [],
            "cwd": "${workspaceRoot}",
            "preLaunchTask": null,
            "runtimeExecutable": null,
            "runtimeArgs": [
                "--nolazy"
            ],
            "env": {
                "NODE_ENV": "development",
                "theFox":"red",
                "theDog":"brown"
            }
        }
    ]
}
```

After including the line require('launch-json'), your process.env will now have the additional three variables:
```
"NODE_ENV": "development",
"theFox":"red",
"theDog":"brown"
 ```


