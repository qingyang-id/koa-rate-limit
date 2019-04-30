module.exports = {
  appenders: {
    console: {
      type: 'console',
      layout: {
        type: 'basic'
      }
    },
    out: {
      type: 'file',
      filename: './logs/out.log',
      maxLogSize: 50 * 1024 * 1024,
      layout: {
        type: 'basic'
      },
      backups: 5,
    },
    error: {
      type: 'file',
      filename: './logs/error.log',
      maxLogSize: 50 * 1024 * 1024,
      layout: {
        type: 'basic'
      },
      backups: 5,
    },
    monitor: {
      type: 'file',
      filename: './logs/monitor.log',
      // 50M 单文件大小，单位字节
      maxLogSize: 50 * 1024 * 1024,
      backups: 5,
      layout: {
        type: 'basic'
      },
    },
  },
  categories: {
    default: { appenders: ['console', 'out'], level: 'info' },
    error: { appenders: ['console', 'out', 'monitor', 'error'], level: 'debug' },
    monitor: { appenders: ['monitor'], level: 'info' },
  },
  pm2: true,
  disableClustering: true
};
