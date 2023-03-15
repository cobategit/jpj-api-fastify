import { FastifyError, FastifyInstance, FastifyPluginOptions } from 'fastify'
import {
  ILoginUserPurchasingHandler,
  IPengajuanPksCurahHandler,
  IRegisterUserPurchasingHandler,
} from '../..'
import { EntityUser } from '../../../domain'
import { upload } from '../../../external'

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
      { logLevel: 'info', preHandler: [upload.single('file_npwp'), upload.single('file_pkp'), upload.single('file_rek_bank')] },
      pengjuanPksCurahHandler.execute.bind(pengjuanPksCurahHandler)
    )

    done()
  }

  return purchasingRoute
}
