module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'sherpany',
      script    : './bin/server.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        "NODE_PATH": "./src",
        "NODE_ENV": "production",
        "PORT": 8080,
        "APIPORT": 3030
      }
    }
  ]
};
