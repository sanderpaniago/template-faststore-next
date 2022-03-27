const { lighthouse: lh } = require('./store.config')

module.exports = {
  ci: {
    collect: {
      url: [lh.server],
      startServerCommand: 'yarn serve',
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 1 }],
        'categories:accessibility': ['error', { minScore: 1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
