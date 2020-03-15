// Global server configuration
const config = {
  PORT: process.env.PORT || '3000',
  live: false,
  COMPRESS_VIDEO_URL: 'http://127.0.0.1:8000'
}

module.exports = config
