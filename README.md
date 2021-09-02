# KebumianBot
A custom bot to learn bot building in Discord.

## Prerequisites
Node 16.0.0

## Modules
- dotenv => environment variables
- axios  => http promises

## How to Setup
1. Create .env file with KebumianBot directory
2. Copy env.sample contents to a new .env file
3. Adjust the environment variables according to your machine (ask admin for token)

## How to Run in Local
Run in terminal:
```node index.js```

## How to Debug in VSCode
Add this configuration in the launch.json
```
"configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "runtimeVersion": "16.0.0",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/index.js"
        }
    ]
```
