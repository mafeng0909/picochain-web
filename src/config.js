const baseUrl = 'http://api.picochain.com'
const config = {
  locale: 'zh-CN', // en-US, zh-CN
  url: baseUrl,
  debug: {
    http: false // http request log
  },
  api: `${baseUrl}/api`,
}

export default config
