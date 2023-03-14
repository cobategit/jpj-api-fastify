import { FastifyError, FastifyInstance, FastifyPluginOptions } from 'fastify'
import { RegisterUserPurchasingHandler } from '../..'
import { EntityUser } from '../../../domain'

export function UserRoute(
  registerUserPurchasingHandler: RegisterUserPurchasingHandler
) {
  const userRoute = (
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: (error?: FastifyError) => void
  ) => {
    fastify.post<{ Body: EntityUser }>(
      '/register-purchasing',
      { logLevel: 'info' },
      registerUserPurchasingHandler.executed.bind(registerUserPurchasingHandler)
    )

    done()
  }

  return userRoute
}
