import {
  FastifyError,
  FastifyInstance,
  FastifyPluginOptions,
} from 'fastify'
import {
  ILoginUserPurchasingHandler,
  IPengajuanPksCurahHandler,
  IRegisterUserPurchasingHandler,
} from '../..'
import { EntityUser, PksCurahEntity } from '../../../domain'
import { CheckAvailableUser, IUsersDataSource, upload } from '../../../data'
import { reqAuthToken } from '@jpj-common/module'

export function PurchasingRoute(
  registerUserPurchasingHandler: IRegisterUserPurchasingHandler,
  LoginUserPurchasingHandler: ILoginUserPurchasingHandler,
  pengjuanPksCurahHandler: IPengajuanPksCurahHandler,
  userDataSource: IUsersDataSource
) {
  const purchasingRoute = (
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: (error?: FastifyError) => void
  ) => {
    fastify.post<{ Body: EntityUser }>(
      '/register',
      { logLevel: 'info' },
      registerUserPurchasingHandler.execute.bind(registerUserPurchasingHandler)
    )

    fastify.post<{ Body: EntityUser }>(
      '/login',
      { logLevel: 'info' },
      LoginUserPurchasingHandler.execute.bind(LoginUserPurchasingHandler)
    )

    fastify.post<{ Body: PksCurahEntity }>(
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
      pengjuanPksCurahHandler.execute.bind(pengjuanPksCurahHandler)
    )

    done()
  }

  return purchasingRoute
}
