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
import rateLimit from '@fastify/rate-limit'
import {
  DataManipulationLanguage,
  DataQueryLanguage,
  PksCurahDataSource,
  UsersDataSource,
  FreightDataSource,
  HistoryLogDataSource,
  CurrencyDataSource,
  StockpileDataSource,
  PkhoaDataSource,
  PurchasingDataSource,
  PoPksDataSource,
  VendorKontrakDataSource,
  SetupsDataSource,
} from './data'
import { ApiResponse, LoggersApp } from '@jpj-common/module'
import { PurchasingHandler, PurchasingRoute } from './presentation'
import {
  GetAllCurrencyUseCase,
  GetAllFreightBankUseCase,
  GetAllFreightUseCase,
  GetAllPkhoaUseCase,
  GetAllPksCurahBankUseCase,
  GetAllPksCurahUseCase,
  GetAllStockpileUseCase,
  GetBankByFreightIdUseCase,
  GetOneCurrencyUseCase,
  GetOneFreightUseCase,
  GetOnePkhoaUseCase,
  GetOnePksCurahUseCase,
  GetOneStockpileUseCase,
  LoginUserPurchasingUseCase,
  PengajuanFreightUseCase,
  PengajuanKontrakPksUseCase,
  PengajuanPkhoaUseCase,
  PengajuanPksCurahUseCase,
  PurchasingRepository,
  RegisterUserPurchasingUseCase,
  UpdateFreightUseCase,
  UpdatePkhoaUseCase,
  UpdatePksCurahUseCase,
} from './domain'
import cluster from 'cluster'
import os from 'os'

const app = async () => {
  dotenv.config()
  LoggersApp.configureLogger()
  const numCpus = os.cpus().length

  const server = Fastify({
    logger: pino({ level: 'info' }),
  })
  await server.register(express)
  await server.register(rateLimit, {
    max: 10,
    timeWindow: 12000,
    cache: 10000,
    errorResponseBuilder: function (request, context) {
      return {
        code: 429,
        error: 'Too Many Requests Api',
        message: `I only allow ${context.max} requests per ${context.after} to this Website. Try again soon.`,
        date: Date.now(),
        expiresIn: context.ttl // milliseconds
      }
    }
  })

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
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
        )
      ),
      new LoginUserPurchasingUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
        )
      ),
      new PengajuanPksCurahUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
        )
      ),
      new GetAllPksCurahUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
        )
      ),
      new GetOnePksCurahUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
        )
      ),
      new PengajuanFreightUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
        )
      ),
      new UpdatePksCurahUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
        )
      ),
      new GetAllFreightUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
        )
      ),
      new GetOneFreightUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
        )
      ),
      new UpdateFreightUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
        )
      ),
      new GetAllCurrencyUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
        )
      ),
      new GetAllFreightBankUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
        )
      ),
      new GetAllStockpileUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
        )
      ),
      new GetBankByFreightIdUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
        )
      ),
      new PengajuanPkhoaUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
        )
      ),
      new GetAllPkhoaUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
        )
      ),
      new UpdatePkhoaUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
        )
      ),
      new GetOnePkhoaUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
        )
      ),
      new GetOneStockpileUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
        )
      ),
      new GetOneCurrencyUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
        )
      ),
      new PengajuanKontrakPksUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
        )
      ),
      new GetAllPksCurahBankUseCase(
        new PurchasingRepository(
          new UsersDataSource(sourcesDml, sourcesDql),
          new PksCurahDataSource(sourcesDml, sourcesDql),
          new FreightDataSource(sourcesDml, sourcesDql),
          new HistoryLogDataSource(sourcesDml, sourcesDql),
          new CurrencyDataSource(sourcesDml, sourcesDql),
          new StockpileDataSource(sourcesDml, sourcesDql),
          new PkhoaDataSource(sourcesDml, sourcesDql),
          new PurchasingDataSource(sourcesDml, sourcesDql),
          new PoPksDataSource(sourcesDml, sourcesDql),
          new VendorKontrakDataSource(sourcesDml, sourcesDql),
          new SetupsDataSource(sourcesDml, sourcesDql)
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

  if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCpus; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    server.listen({ port: Number(process.env.PORT) }, function (err, address) {
      if (err) {
        server.log.error(err)
        process.exit(1)
      }
      server.log.info(`server listening on ${address}`)
    })

    console.log(`Worker ${process.pid} started`);
  }
}

app()
