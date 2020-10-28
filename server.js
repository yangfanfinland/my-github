const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')

const dev = process.env.NODE_ENV === 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = new Koa();
    const router = new Router()

    router.get('/test', (ctx) => {
        ctx.body = '<span>request / test</span>'
    })

    server.use(async (ctx, next) => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })

    server.use(router.routes())

    server.listen(3000, () => {
        console.log('koa server listening on port 3000')
    })
})
