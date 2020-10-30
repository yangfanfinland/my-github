const axios = require('axios')

const github_base_url = 'https://api.github.com'

const { requestGithub } = require('../lib/api')

module.exports = (server) => {
  server.use(async (ctx, next) => {
    const { path, method } = ctx
    if (path.startsWith('/github/')) {
      const githubAuth = ctx.session.githubAuth
      const { token_type, access_token } = githubAuth || {}
      const headers = {}
      if (access_token) {
        headers['Authorization'] = `${token_type} ${access_token}`
      }
      const result = await requestGithub(
        method,
        ctx.url.replace('/github/', '/'),
        {},
        headers
      )

      ctx.status = result.status
      ctx.body = result.data
    } else {
      await next()
    }
  })
}

// module.exports = server => {
//     server.use(async (ctx, next) => {
//         const path = ctx.path

//         if (path.startsWith('/github/')) {
//             const githubAuth = ctx.session.githubAuth
//             const githubPath = `${github_base_url}${ctx.url.replace('/github/', '/')}`

//             const { access_token, token_type } = githubAuth || {}
//             let headers = {}
//             if (access_token && token_type) {
//                 headers.Authorization = `${token_type} ${access_token}`
//             }

//             try {
//                 const result = await axios({
//                     method: 'GET',
//                     url: githubPath,
//                     headers
//                 })
//                 if (result.status === 200) {
//                     ctx.body = result.data
//                     ctx.set('Content-Type', 'application/json')
//                 } else {
//                     ctx.status = result.status
//                     ctx.body = {
//                         success: false
//                     }
//                     ctx.set('Content-Type', 'application/json')
//                 }
//             } catch (error) {
//                 console.error(error)
//                 ctx.body = {
//                     success: false
//                 }
//                 ctx.set('Content-Type', 'application/json')
//             }
//         } else {
//             await next()
//         }
//     })
// }
