import { ApiResponse, AppError, TokenJWt } from '@jpj-common/module'
import { FastifyRequest, FastifyReply } from 'fastify'
import { EntityUser, ILoginUserPurchasingUseCase } from '../../../domain'
import { ILoginUserPurchasingHandler } from '../../interfaces'

export class LoginUserPurchasingHandler implements ILoginUserPurchasingHandler {
  private loginUserPurchasingUseCase: ILoginUserPurchasingUseCase

  constructor(loginUserPurchasingUseCase: ILoginUserPurchasingUseCase) {
    this.loginUserPurchasingUseCase = loginUserPurchasingUseCase
  }

  async execute(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const dataUser: EntityUser = request.body!
      const res = await this.loginUserPurchasingUseCase.execute(dataUser)

      const objectToken: Pick<
        EntityUser,
        'user_id' | 'user_email' | 'deviced_id'
      > = {
        user_id: res?.user_id,
        user_email: res?.user_email,
        deviced_id: res?.deviced_id
      }
      const token = await TokenJWt.generateJwt(objectToken, null)

      if (res === null) throw new AppError(404, false, `Data kosong`, '401')

      if (res.deviced_id == 'Kosong') {
        throw new AppError(404, false, `Data device id anda tidak ada`, '401')
      }

      if (res.deviced_id == 'Tidak cocok') {
        throw new AppError(404, false, `Device id anda tidak cocok`, '401')
      }

      if (res.kode_akses == 'Salah')
        throw new AppError(401, false, `Password anda salah`, '401')

      const user: Pick<
        EntityUser,
        'user_id' | 'user_email' | 'user_name' | 'deviced_id' | 'stockpile_id'
      > = {
        user_id: res.user_id,
        user_email: res.user_email,
        deviced_id: res.deviced_id,
        stockpile_id: res.stockpile_id,
        user_name: res.user_name
      }

      return ApiResponse.created(request, reply, {
        success: true,
        message: 'Login berhasil',
        token,
        user,
      })
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }
}
