const axios = require('axios')

const github_base_url = 'https://api.github.com'

async function requestGithub(method, url, data, headers) {
    return await axios({
        method,
        url: `${github_base_url}${url}`,
        data,
        headers
    })
}

const isServer = typeof window === 'undefined'
async function request({ method = 'GET', url, data = {}}, req, res) {
    if (!url) {
        throw Error('url must be provided')
    }
    if (isServer) {
        const session = req.session
        const { token_type, access_token } = session.githubAuth || {}
        const headers = {}
        if (access_token) {
            headers['Authorization'] = `${token_type} ${access_token}`
        }
        return await requestGithub(method, url, data, headers)
    } else {
        return await axios({
            method,
            url: `/github${url}`,
            data
        })
    }
}

module.exports = {
    request,
    requestGithub
}