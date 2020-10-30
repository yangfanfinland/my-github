const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const session = require('koa-session')
const koaBody = require('koa-body')
const RedisSessionStore = require('./server/session-store')
const Redis = require('ioredis')
const auth = require('./server/auth')
const api = require('./server/api')

const dev = process.env.NODE_ENV === 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const redis = new Redis()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  server.use(koaBody())

  server.keys = ['Yang Fan Github App']
  const SESSION_CONFIG = {
    key: 'jid',
    store: new RedisSessionStore(redis),
  }
  server.use(session(SESSION_CONFIG, server))

  auth(server)
  api(server)

  router.get('/test/a/:id', async (ctx) => {
    const id = ctx.params.id
    await handle(ctx.req, ctx.res, {
      pathname: '/test/a',
      query: { id },
    })
    ctx.respond = false
  })

  router.get('/api/user/info', async (ctx) => {
    const user = ctx.session.userInfo
    if (!user) {
      ctx.status = 401
      ctx.body = 'Need Login'
    } else {
      ctx.body = user
      ctx.set('Content-Type', 'application/json')
    }

    ctx.body = ctx.session.userInfo
  })

  server.use(router.routes())

  server.use(async (ctx, next) => {
    ctx.cookies.set('id', 'userid:xxxxxx')
    ctx.req.session = ctx.session
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.status = 200
    await next()
  })

  server.listen(3000, () => {
    console.log('koa server listening on port 3000')
  })
})
