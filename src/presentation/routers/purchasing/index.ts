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
import { reqAuthToken } from '@jpj-common/module'

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
        if (request.query.vendor_type == 'pkscurah') purchasingHandler.pengajuanPksCurah(request, reply)

        if (request.query.vendor_type == 'freight') purchasingHandler.pengajuanPksCurah(request, reply)
      }
    )

    fastify.get(
      '/pks-curah',
      {
        logLevel: 'info', preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) => CheckAvailableUser(userDataSource, req, rep, done),

        ],
      },
      purchasingHandler.findAllPksCurah.bind(purchasingHandler)
    )

    done()
  }

  return purchasingRoute
}
