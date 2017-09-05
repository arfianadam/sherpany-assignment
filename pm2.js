module.exports = {
  apps : [
    {
      name: "sherpany",
      script: "./bin/server.js",
      env: {
        "NODE_PATH": "./src",
        "NODE_ENV": "production",
        "PORT": 8080,
        "APIPORT": 3030
      }
    }
  ]
}