import { ApiResponse, AppError, TokenJWt } from '@jpj-common/module'
import { format } from 'date-fns'
import { EntityUser, IGetAllPksCurahUseCase, ILoginUserPurchasingUseCase, IPengajuanPksCurahUseCase, IRegisterUserPurchasingUseCase, PksCurahEntity } from '../../../domain'
import { IPurchasingHandler } from '../../interfaces'

export class PurchasingHandler implements IPurchasingHandler {
    private registerUserPurchasingUseCase: IRegisterUserPurchasingUseCase
    private loginUserPurchasingUseCase: ILoginUserPurchasingUseCase
    private pengajuanPksCurahUseCase: IPengajuanPksCurahUseCase
    private getAllPksCurahUseCase: IGetAllPksCurahUseCase

    constructor(registerUserPurchasingUseCase: IRegisterUserPurchasingUseCase, loginUserPurchasingUseCase: ILoginUserPurchasingUseCase, pengajuanPksCurahUseCase: IPengajuanPksCurahUseCase, getAllPksCurahUseCase: IGetAllPksCurahUseCase) {
        this.registerUserPurchasingUseCase = registerUserPurchasingUseCase
        this.loginUserPurchasingUseCase = loginUserPurchasingUseCase
        this.pengajuanPksCurahUseCase = pengajuanPksCurahUseCase
        this.getAllPksCurahUseCase = getAllPksCurahUseCase
    }
    async register(request: any, reply: any): Promise<void> {
        try {
            const data: EntityUser = request.body

            const res = await this.registerUserPurchasingUseCase.execute(data)

            if (res.invalidEmail)
                throw new AppError(404, false, `Email tidak terdaftar`, '401')

            if (res.existDeviceId)
                throw new AppError(404, false, `DeviceId anda sudah terdaftar`, '401')

            return ApiResponse.created(request, reply, {
                success: true,
                message: 'Data deviced id berhasil diinput',
                changed: res[0].changedRows,
            })
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
    async login(request: any, reply: any): Promise<void> {
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
    async pengajuanPksCurah(request: any, reply: any): Promise<void> {
        try {
            const data: PksCurahEntity = request.body
            data.stockpile_id = request.user.user_id
            data.entry_date = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`
            data.active = 2

            if (request.files['file_npwp']) {
                data!.file_npwp = `${process.env.URL_FILE}/purchasing/${request.files['file_npwp'][0].filename}`
            }
            if (request.files['file_pkp']) {
                data!.file_pkp = `${process.env.URL_FILE}/purchasing/${request.files['file_pkp'][0].filename}`
            }
            if (request.files['file_rek_bank']) {
                data!.file_rek_bank = `${process.env.URL_FILE}/purchasing/${request.files['file_rek_bank'][0].filename}`
            }

            const res = await this.pengajuanPksCurahUseCase.execute(data)

            return ApiResponse.created(request, reply, {
                success: true,
                message: `Data pengajuan vendor berhasil diinput ${data.curah}`,
                id: res[0].insertId,
            })
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
    async findAllPksCurah(request: any, reply: any): Promise<void> {
        try {
            const data = await this.getAllPksCurahUseCase.execute()

            return ApiResponse.created(request, reply, {
                success: true,
                message: 'Data ditemukan',
                data
            })
        } catch (error) {
            throw new AppError(400, false, `${error}`, '401')
        }
    }
}
