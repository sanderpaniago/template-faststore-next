module.exports = {
  ci: {
    collect: {
      url: [process.env.BASE_SITE_URL],
      startServerCommand: 'rails server -e production',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
