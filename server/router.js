import Router from "@koa/router"

export const router = new Router()

router.get('/', async ctx => {
    ctx.body = { ola: "mundo"}
  })

router.get('/users', async ctx => {
ctx.body = { ola: "users"}
})
  