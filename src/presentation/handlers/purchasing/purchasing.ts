import { ApiResponse, AppError, TokenJWt, setPagination, getPagination } from '@jpj-common/module'
import { format } from 'date-fns'
import { EntityUser, FreightEntity, IGetAllPksCurahUseCase, IGetOnePksCurahUseCase, ILoginUserPurchasingUseCase, IPengajuanFreight, IPengajuanPksCurahUseCase, IRegisterUserPurchasingUseCase, IUpdatePksCurahUseCase, ParamsEntity, PksCurahEntity } from '../../../domain'
import { IPurchasingHandler } from '../../interfaces'

export class PurchasingHandler implements IPurchasingHandler {
    private registerUserPurchasingUseCase: IRegisterUserPurchasingUseCase
    private loginUserPurchasingUseCase: ILoginUserPurchasingUseCase
    private pengajuanPksCurahUseCase: IPengajuanPksCurahUseCase
    private getAllPksCurahUseCase: IGetAllPksCurahUseCase
    private getOnePksCurahUseCase: IGetOnePksCurahUseCase
    private pengajuanFreightUseCase: IPengajuanFreight
    private updatePksCurahUseCase: IUpdatePksCurahUseCase


    constructor(registerUserPurchasingUseCase: IRegisterUserPurchasingUseCase, loginUserPurchasingUseCase: ILoginUserPurchasingUseCase, pengajuanPksCurahUseCase: IPengajuanPksCurahUseCase, getAllPksCurahUseCase: IGetAllPksCurahUseCase, getOnePksCurahUseCase: IGetOnePksCurahUseCase, pengajuanFreightUseCase: IPengajuanFreight, updatePksCurahUseCase: IUpdatePksCurahUseCase) {
        this.registerUserPurchasingUseCase = registerUserPurchasingUseCase
        this.loginUserPurchasingUseCase = loginUserPurchasingUseCase
        this.pengajuanPksCurahUseCase = pengajuanPksCurahUseCase
        this.getAllPksCurahUseCase = getAllPksCurahUseCase
        this.pengajuanFreightUseCase = pengajuanFreightUseCase
        this.getOnePksCurahUseCase = getOnePksCurahUseCase
        this.updatePksCurahUseCase = updatePksCurahUseCase
    }
    async register(request: any, reply: any): Promise<void> {
        try {
            const data: EntityUser = request.body
            data!.entry_date = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`

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

            const res = await this.pengajuanPksCurahUseCase.execute(request.user.user_id, data)

            return ApiResponse.created(request, reply, {
                success: true,
                message: `Data pengajuan vendor pkscurah berhasil diinput ${data.curah}`,
                id: res[0].insertId,
            })
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
    async pengajuanFreight(request: any, reply: any): Promise<void> {
        try {
            const data: FreightEntity = request.body
            data.id_user_stockpile = request.user.user_id
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
            if (request.files['file_ktp']) {
                data!.file_ktp = `${process.env.URL_FILE}/purchasing/${request.files['file_rek_bank'][0].filename}`
            }

            const res = await this.pengajuanFreightUseCase.execute(request.user.user_id, data)

            return ApiResponse.created(request, reply, {
                success: true,
                message: `Data pengajuan vendor freight`,
                id: res[0].insertId,
            })
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
    async findAllPksCurah(request: any, reply: any): Promise<void> {
        try {
            const { page, size, search, vendor_type } = request.query
            const { limit, offset } = setPagination(page, size, 20)
            const conf: Pick<ParamsEntity, 'limit' | 'offset' | 'search' | 'vendor_type'> = {
                limit,
                offset,
                search,
                vendor_type
            }
            const res = await this.getAllPksCurahUseCase.execute(conf)
            const data = getPagination(res, page, limit)

            return ApiResponse.created(request, reply, {
                success: true,
                message: 'Data ditemukan',
                data
            })
        } catch (error) {
            throw new AppError(400, false, `${error}`, '401')
        }
    }

    async findOnePksCurah(request: any, reply: any): Promise<void> {
        try {
            console.log(`params ${request.params.vendor_id}`)
            const res = await this.getOnePksCurahUseCase.execute(request.params.vendor_id)

            if (res === null) throw new AppError(404, false, `Data kosong`, '401')

            return ApiResponse.created(request, reply, {
                success: true,
                message: 'Data ditemukan',
                data: res
            })
        } catch (error) {
            throw new AppError(400, false, `${error}`, '401')
        }
    }

    async updatePksCurah(request: any, reply: any): Promise<void> {
        try {
            const data: PksCurahEntity = request.body
            data.stockpile_id = request.user.user_id

            if (request.files['file_npwp']) {
                data!.file_npwp = `${process.env.URL_FILE}/purchasing/${request.files['file_npwp'][0].filename}`
            }
            if (request.files['file_pkp']) {
                data!.file_pkp = `${process.env.URL_FILE}/purchasing/${request.files['file_pkp'][0].filename}`
            }
            if (request.files['file_rek_bank']) {
                data!.file_rek_bank = `${process.env.URL_FILE}/purchasing/${request.files['file_rek_bank'][0].filename}`
            }

            const res = await this.updatePksCurahUseCase.execute(request.params.vendor_id, request.user.user_id, data)

            return ApiResponse.created(request, reply, {
                success: true,
                message: `Data update vendor pkscurah berhasil diinput ${data.curah}`,
                id: res[0].insertId,
            })
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}
