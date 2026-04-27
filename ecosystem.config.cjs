module.exports = {
  apps: [
    {
      name: 'personalcard-contact',
      script: 'server-dist/server/prod-server.js',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        HOST: '127.0.0.1',
        PORT: 8787,
      },
    },
  ],
}
