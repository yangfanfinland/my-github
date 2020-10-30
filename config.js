const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'

const github = {
  request_token_url: 'https://github.com/login/oauth/access_token',
  client_id: 'c4b0b37c22082533da94',
  client_secret: '9987ada7bba62fff1b7204850f73504fc7d14fcc',
}

module.exports = {
  github,
  GITHUB_OAUTH_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${github.client_id}&scope=${SCOPE}`,
}
