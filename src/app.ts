import Fastify from 'fastify'
import pino from 'pino'
import FastifyAccepts from '@fastify/accepts'
import { mysqlConn } from './data/database'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import fastifyStatic from '@fastify/static'
import path from 'path'
import dotenv from 'dotenv'
import express from '@fastify/express'
import xss from 'x-xss-protection'
import multerFastify from 'fastify-multer'
import { format } from 'date-fns'
import {
  DataManipulationLanguage,
  DataQueryLanguage,
  UsersDataSource,
} from './data'
import { ApiResponse, LoggersApp } from '@jpj-common/module'
import { RegisterUserPurchasingHandler, PurchasingRoute } from './presentation'
import {
  LoginUserPurchasingUseCase,
  PurchasingRepository,
  RegisterUserPurchasingUseCase,
} from './domain'
import { LoginUserPurchasingHandler } from './presentation/handlers/purchasing/login-user'

const app = async () => {
  dotenv.config()
  LoggersApp.configureLogger()

  const server = Fastify({
    logger: pino({ level: 'info' }),
  })
  await server.register(express)

  server.register(FastifyAccepts)
  server.use(xss())
  server.register(cors, {})
  server.register(helmet, {
    contentSecurityPolicy: false,
    global: true,
  })
  server.register(fastifyStatic, {
    root: path.join(process.cwd(), 'public'),
    prefix: '/public',
  })
  server.register(multerFastify.contentParser)

  const pool = await mysqlConn()
  const sourcesDml = new DataManipulationLanguage(pool)
  const sourcesDql = new DataQueryLanguage(pool)

  const purchasingRegister = PurchasingRoute(
    new RegisterUserPurchasingHandler(
      new RegisterUserPurchasingUseCase(
        new PurchasingRepository(new UsersDataSource(sourcesDml, sourcesDql))
      )
    ),
    new LoginUserPurchasingHandler(
      new LoginUserPurchasingUseCase(
        new PurchasingRepository(new UsersDataSource(sourcesDml, sourcesDql))
      )
    )
  )

  server.register(purchasingRegister, {
    prefix: `${process.env.PATH_URL}` + '/purchasing',
  })

  server.all('/', (req: any, reply: any) => {
    if (req.accepts('html')) {
      return reply
        .status(404)
        .sendFile(path.join(__dirname, 'views', 'index.html'))
    } else if (req.accepts('json')) {
      return reply.status(404).send('welcome to FASTIFY REST-API')
    } else {
      return reply.type('txt').send('404 not found')
    }
  })

  server.setErrorHandler(ApiResponse.errorCatch)

  server.listen({ port: Number(process.env.PORT) }, function (err, address) {
    if (err) {
      server.log.error(err)
      process.exit(1)
    }
    server.log.info(`server listening on ${address}`)
  })
}

app()
