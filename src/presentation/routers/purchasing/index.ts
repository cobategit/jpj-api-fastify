import {
  FastifyError,
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify'
import {
  IPurchasingHandler,
} from '../..'
import { EntityUser, FreightEntity, ParamsEntity, PksCurahEntity } from '../../../domain'
import { CheckAvailableUser, IUsersDataSource, upload } from '../../../data'
import { ApiResponse, reqAuthToken } from '@jpj-common/module'

export function PurchasingRoute(
  purchasingHandler: IPurchasingHandler,
  userDataSource: IUsersDataSource,
) {
  const purchasingRoute = (
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: (error?: FastifyError) => void
  ) => {
    fastify.post<{ Body: EntityUser }>(
      '/register',
      { logLevel: 'info' },
      purchasingHandler.register.bind(purchasingHandler)
    )

    fastify.post<{ Body: EntityUser }>(
      '/login',
      { logLevel: 'info' },
      purchasingHandler.login.bind(purchasingHandler)
    )

    fastify.post<{ Body: PksCurahEntity | FreightEntity, Querystring: ParamsEntity }>(
      '/pengajuan-vendor',
      {
        logLevel: 'info',
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) => CheckAvailableUser(userDataSource, req, rep, done),
          upload.fields([
            { name: 'file_npwp', maxCount: 1 },
            { name: 'file_pkp', maxCount: 1 },
            { name: 'file_rek_bank', maxCount: 1 },
            { name: 'file_ktp', maxCount: 1 }
          ]),
        ],
      },
      (request: any, reply: any) => {
        if (!request.query.vendor_type) {
          return ApiResponse.badRequest(request, reply, {
            success: false,
            message: `Harap masukkan query string 'vendor_type(pkscurah atau freight)'`
          })
        }

        if (request.query.vendor_type == 'pkscurah') purchasingHandler.pengajuanPksCurah(request, reply)

        if (request.query.vendor_type == 'freight') purchasingHandler.pengajuanFreight(request, reply)
      }
    )

    fastify.get<{ Querystring: ParamsEntity }>(
      '/pks-curah',
      {
        logLevel: 'info', preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) => CheckAvailableUser(userDataSource, req, rep, done),

        ],
      },
      purchasingHandler.findAllPksCurah.bind(purchasingHandler)
    ).patch<{ Body: PksCurahEntity, Params: Pick<ParamsEntity, 'vendor_id'> }>(
      '/pks-curah/:vendor_id',
      {
        logLevel: 'info', preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) => CheckAvailableUser(userDataSource, req, rep, done),
          upload.fields([
            { name: 'file_npwp', maxCount: 1 },
            { name: 'file_pkp', maxCount: 1 },
            { name: 'file_rek_bank', maxCount: 1 }
          ]),
        ],
      },
      purchasingHandler.updatePksCurah.bind(purchasingHandler)
    )

    fastify.get<{ Params: Pick<ParamsEntity, 'vendor_id'> }>(
      '/pks-curah/detail/:vendor_id',
      {
        logLevel: 'info', preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) => CheckAvailableUser(userDataSource, req, rep, done)
        ],
      },
      purchasingHandler.findOnePksCurah.bind(purchasingHandler)
    )

    fastify.get<{ Querystring: ParamsEntity }>(
      '/freight',
      {
        logLevel: 'info', preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) => CheckAvailableUser(userDataSource, req, rep, done),

        ],
      },
      purchasingHandler.findAllFreight.bind(purchasingHandler)
    ).patch<{ Body: FreightEntity, Params: Pick<ParamsEntity, 'freight_id'> }>(
      '/freight/:freight_id',
      {
        logLevel: 'info', preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) => CheckAvailableUser(userDataSource, req, rep, done),
          upload.fields([
            { name: 'file_npwp', maxCount: 1 },
            { name: 'file_pkp', maxCount: 1 },
            { name: 'file_rek_bank', maxCount: 1 },
            { name: 'file_ktp', maxCount: 1 }
          ]),
        ],
      },
      purchasingHandler.updateFreight.bind(purchasingHandler)
    )

    fastify.get<{ Params: Pick<ParamsEntity, 'freight_id'> }>(
      '/freight/detail/:freight_id',
      {
        logLevel: 'info', preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) => CheckAvailableUser(userDataSource, req, rep, done)
        ],
      },
      purchasingHandler.findOneFreight.bind(purchasingHandler)
    )


    done()
  }

  return purchasingRoute
}
