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
import {
  DataManipulationLanguage,
  DataQueryLanguage,
  PksCurahDataSource,
  UsersDataSource,
  FreightDataSource,
  HistoryLogDataSource,
  CurrencyDataSource,
} from './data'
import { ApiResponse, LoggersApp } from '@jpj-common/module'
import { PurchasingHandler, PurchasingRoute } from './presentation'
import {
  GetAllCurrencyUseCase,
  GetAllFreightBankUseCase,
  GetAllFreightUseCase,
  GetAllPksCurahUseCase,
  GetOneFreightUseCase,
  GetOnePksCurahUseCase,
  LoginUserPurchasingUseCase,
  PengajuanFreightUseCase,
  PengajuanPksCurahUseCase,
  PurchasingRepository,
  RegisterUserPurchasingUseCase,
  UpdateFreightUseCase,
  UpdatePksCurahUseCase,
} from './domain'

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
    new PurchasingHandler(
      new RegisterUserPurchasingUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql)
        )
      ),
      new LoginUserPurchasingUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql)
        )
      ),
      new PengajuanPksCurahUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql)
        )
      ),
      new GetAllPksCurahUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql)
        )
      ),
      new GetOnePksCurahUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql)
        )
      ),
      new PengajuanFreightUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql)
        )
      ),
      new UpdatePksCurahUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql)
        )
      ),
      new GetAllFreightUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql)
        )
      ),
      new GetOneFreightUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql)
        )
      ),
      new UpdateFreightUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql)
        )
      ),
      new GetAllCurrencyUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql)
        )
      ),
      new GetAllFreightBankUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql)
        )
      )
    ),
    new UsersDataSource(sourcesDml, sourcesDql)
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
