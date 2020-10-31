module.exports = {
  apps: [
    {
      name: 'github',
      script: './server.js',
      instances: 2,
      autorestart: true,
      watch: false,
      ignore_watch: ['node_modules', 'logs'],
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      max_memory_restart: '1G',
      env: {
          NODE_ENV: 'production'
      }
    },
  ],
}
