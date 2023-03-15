import { FastifyError, FastifyInstance, FastifyPluginOptions } from 'fastify'
import {
  ILoginUserPurchasingHandler,
  IRegisterUserPurchasingHandler,
} from '../..'
import { EntityUser } from '../../../domain'

export function PurchasingRoute(
  registerUserPurchasingHandler: IRegisterUserPurchasingHandler,
  LoginUserPurchasingHandler: ILoginUserPurchasingHandler
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

    done()
  }

  return purchasingRoute
}
