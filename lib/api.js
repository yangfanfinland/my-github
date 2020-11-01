const axios = require('axios')

const github_base_url = 'https://api.github.com'

async function requestGithub(method, url, data, headers) {
    try {
        const result = await axios({
            method,
            url: `${github_base_url}${url}`,
            data,
            headers
        })
        return result;
    } catch (error) {
        console.error("Request github result: " + error)
        return { data: {} }
    }
}

const isServer = typeof window === 'undefined'
async function request({ method = 'GET', url, data = {}}, req, res) {
    if (!url) {
        throw Error('url must be provided')
    }
    if (isServer) {
        const { session } = req
        const { githubAuth } = session || {}
        const { token_type, access_token } = githubAuth || {}
        const headers = {}
        if (access_token) {
            headers.Authorization = `${token_type} ${access_token}`
        }
        return await requestGithub(method, url, data, headers)
    } else {
        try {
            const result = await axios({
                method,
                url: `/github${url}`,
                data
            })
            return result;
        } catch (error) {
            console.log("Request result: " + error)
            return { data: {} }
        }
    }
}

module.exports = {
    request,
    requestGithub
}