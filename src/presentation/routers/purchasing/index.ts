import { FastifyError, FastifyInstance, FastifyPluginOptions } from 'fastify'
import {
  ILoginUserPurchasingHandler,
  IPengajuanPksCurahHandler,
  IRegisterUserPurchasingHandler,
} from '../..'
import { EntityUser } from '../../../domain'
import { upload } from '../../../external'
import { } from '@jpj-common/module'

export function PurchasingRoute(
  registerUserPurchasingHandler: IRegisterUserPurchasingHandler,
  LoginUserPurchasingHandler: ILoginUserPurchasingHandler,
  pengjuanPksCurahHandler: IPengajuanPksCurahHandler
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

    fastify.post<{ Body: EntityUser }>(
      '/pengajuan-vendor',
      { logLevel: 'info', preHandler: [upload.fields([{ name: 'file_npwp', maxCount: 1 }, { name: 'file_pkp', maxCount: 1 }, { name: 'file_rek_bank', maxCount: 1 }])] },
      pengjuanPksCurahHandler.execute.bind(pengjuanPksCurahHandler)
    )

    done()
  }

  return purchasingRoute
}
