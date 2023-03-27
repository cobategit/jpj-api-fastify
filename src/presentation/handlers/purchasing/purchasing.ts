import {
  ApiResponse,
  AppError,
  TokenJWt,
  setPagination,
  getPagination,
} from '@jpj-common/module'
import { format } from 'date-fns'
import {
  EntityUser,
  FreightEntity,
  IGetAllCurrencyUseCase,
  IGetAllFreightBankUseCase,
  IGetAllFreightUseCase,
  IGetAllPksCurahUseCase,
  IGetOneFreightUseCase,
  IGetOnePksCurahUseCase,
  ILoginUserPurchasingUseCase,
  IPengajuanFreightUseCase,
  IPengajuanPksCurahUseCase,
  IRegisterUserPurchasingUseCase,
  IUpdateFreightUseCase,
  IUpdatePksCurahUseCase,
  IGetAllStockpileUseCase,
  ParamsEntity,
  PksCurahEntity,
  IGetBankByFreightIdUseCase,
  PkhoaEntity,
  IPengajuanPkhoaUseCase,
  IGetAllPkhoaUseCase,
  IUpdatePkhoaUseCase,
  IGetOnePkhoaUseCase,
} from '../../../domain'
import { IPurchasingHandler } from '../../interfaces'

export class PurchasingHandler implements IPurchasingHandler {
  private registerUserPurchasingUseCase: IRegisterUserPurchasingUseCase
  private loginUserPurchasingUseCase: ILoginUserPurchasingUseCase
  private pengajuanPksCurahUseCase: IPengajuanPksCurahUseCase
  private getAllPksCurahUseCase: IGetAllPksCurahUseCase
  private getOnePksCurahUseCase: IGetOnePksCurahUseCase
  private pengajuanFreightUseCase: IPengajuanFreightUseCase
  private updatePksCurahUseCase: IUpdatePksCurahUseCase
  private getAllFreightUseCase: IGetAllFreightUseCase
  private getOneFreightUseCase: IGetOneFreightUseCase
  private updateFreightUseCase: IUpdateFreightUseCase
  private getAllCurrencyUseCase: IGetAllCurrencyUseCase
  private getAllFreightBankUseCase: IGetAllFreightBankUseCase
  private getAllStockpileUseCase: IGetAllStockpileUseCase
  private getBankByFreightIdUseCase: IGetBankByFreightIdUseCase
  private pengajuanPkhoaUseCase: IPengajuanPkhoaUseCase
  private getAllPkhoaUseCase: IGetAllPkhoaUseCase
  private updatePkhoaUseCase: IUpdatePkhoaUseCase
  private getOnePkhoaUseCase: IGetOnePkhoaUseCase

  constructor(
    registerUserPurchasingUseCase: IRegisterUserPurchasingUseCase,
    loginUserPurchasingUseCase: ILoginUserPurchasingUseCase,
    pengajuanPksCurahUseCase: IPengajuanPksCurahUseCase,
    getAllPksCurahUseCase: IGetAllPksCurahUseCase,
    getOnePksCurahUseCase: IGetOnePksCurahUseCase,
    pengajuanFreightUseCase: IPengajuanFreightUseCase,
    updatePksCurahUseCase: IUpdatePksCurahUseCase,
    getAllFreightUseCase: IGetAllFreightUseCase,
    getOneFreightUseCase: IGetOneFreightUseCase,
    updateFreightUseCase: IUpdateFreightUseCase,
    getAllCurrencyUseCase: IGetAllCurrencyUseCase,
    getAllFreightBankUseCase: IGetAllFreightBankUseCase,
    getAllStockpileUseCase: IGetAllStockpileUseCase,
    getBankByFreightIdUseCase: IGetBankByFreightIdUseCase,
    pengajuanPkhoaUseCase: IPengajuanPkhoaUseCase,
    getAllPkhoaUseCase: IGetAllPkhoaUseCase,
    updatePkhoaUseCase: IUpdatePkhoaUseCase,
    getOnePkhoaUseCase: IGetOnePkhoaUseCase

  ) {
    this.registerUserPurchasingUseCase = registerUserPurchasingUseCase
    this.loginUserPurchasingUseCase = loginUserPurchasingUseCase
    this.pengajuanPksCurahUseCase = pengajuanPksCurahUseCase
    this.getAllPksCurahUseCase = getAllPksCurahUseCase
    this.pengajuanFreightUseCase = pengajuanFreightUseCase
    this.getOnePksCurahUseCase = getOnePksCurahUseCase
    this.updatePksCurahUseCase = updatePksCurahUseCase
    this.getAllFreightUseCase = getAllFreightUseCase
    this.getOneFreightUseCase = getOneFreightUseCase
    this.updateFreightUseCase = updateFreightUseCase
    this.getAllCurrencyUseCase = getAllCurrencyUseCase
    this.getAllFreightBankUseCase = getAllFreightBankUseCase
    this.getAllStockpileUseCase = getAllStockpileUseCase
    this.getBankByFreightIdUseCase = getBankByFreightIdUseCase
    this.pengajuanPkhoaUseCase = pengajuanPkhoaUseCase
    this.getAllPkhoaUseCase = getAllPkhoaUseCase
    this.updatePkhoaUseCase = updatePkhoaUseCase
    this.getOnePkhoaUseCase = getOnePkhoaUseCase
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
        status: true,
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
        deviced_id: res?.deviced_id,
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
        user_name: res.user_name,
      }

      return ApiResponse.ok(request, reply, {
        status: true,
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
      let dataBank: string[] = []
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
      if (request.files['file_rekbank']) {
        Promise.all([
          request.files['file_rekbank'].forEach((val: any) => {
            let file = `${process.env.URL_FILE}/purchasing/${val.filename}`
            dataBank.push(file)
          }),
        ])
      }

      data.file_rekbank = dataBank

      const res = await this.pengajuanPksCurahUseCase.execute(
        request.user.user_id,
        data
      )

      return ApiResponse.created(request, reply, {
        status: true,
        message: `Data pengajuan vendor pkscurah berhasil diinput ${data.curah}`,
        id: res[0].insertId,
      })
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }
  async pengajuanFreight(request: any, reply: any): Promise<void> {
    try {
      let dataBank: string[] = []
      const data: FreightEntity = request.body
      data.id_user_stockpile = request.user.user_id
      data.active = 2

      if (request.files['file_npwp']) {
        data!.file_npwp = `${process.env.URL_FILE}/purchasing/${request.files['file_npwp'][0].filename}`
      }
      if (request.files['file_pkp']) {
        data!.file_pkp = `${process.env.URL_FILE}/purchasing/${request.files['file_pkp'][0].filename}`
      }
      if (request.files['file_ktp']) {
        data!.file_ktp = `${process.env.URL_FILE}/purchasing/${request.files['file_rekbank'][0].filename}`
      }
      if (request.files['file_rekbank']) {
        Promise.all([
          request.files['file_rekbank'].forEach((val: any) => {
            let file = `${process.env.URL_FILE}/purchasing/${val.filename}`
            dataBank.push(file)
          }),
        ])
      }

      data.file_rekbank = dataBank

      const res = await this.pengajuanFreightUseCase.execute(
        request.user.user_id,
        data
      )

      return ApiResponse.created(request, reply, {
        status: true,
        message: `Data pengajuan vendor freight`,
        id: res[0].insertId,
      })
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }
  async findAllPksCurah(request: any, reply: any): Promise<void> {
    try {
      let conf: Pick<
        ParamsEntity,
        'limit' | 'offset' | 'search' | 'vendor_type'
      > = {}
      let limitNumber: number = 0
      const { page, size, search, vendor_type } = request.query

      if (page || size) {
        const { limit, offset } = setPagination(page, size, 100)
        conf = {
          limit,
          offset,
          search,
          vendor_type,
        }
        limitNumber = limit
      }

      const res = await this.getAllPksCurahUseCase.execute(conf)
      const data = getPagination(res, page, limitNumber)

      return ApiResponse.ok(request, reply, {
        status: true,
        message: 'Data ditemukan',
        data,
      })
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }

  async findOnePksCurah(request: any, reply: any): Promise<void> {
    try {
      const res = await this.getOnePksCurahUseCase.execute(
        request.params.vendor_id
      )

      if (res === null) throw new AppError(404, false, `Data kosong`, '401')

      return ApiResponse.ok(request, reply, {
        status: true,
        message: 'Data ditemukan',
        data: res,
      })
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }

  async updatePksCurah(request: any, reply: any): Promise<void> {
    try {
      let dataBank: string[] = []
      const data: PksCurahEntity = request.body
      data.stockpile_id = request.user.user_id

      if (request.files['file_npwp']) {
        data!.file_npwp = `${process.env.URL_FILE}/purchasing/${request.files['file_npwp'][0].filename}`
      }
      if (request.files['file_pkp']) {
        data!.file_pkp = `${process.env.URL_FILE}/purchasing/${request.files['file_pkp'][0].filename}`
      }
      if (request.files['file_rekbank']) {
        Promise.all([
          request.files['file_rekbank'].forEach((val: any) => {
            let file = `${process.env.URL_FILE}/purchasing/${val.filename}`
            dataBank.push(file)
          }),
        ])
      }

      data.file_rekbank = dataBank

      const res = await this.updatePksCurahUseCase.execute(
        request.params.vendor_id,
        request.user.user_id,
        data
      )

      return ApiResponse.ok(request, reply, {
        status: true,
        message: `Data update vendor pkscurah berhasil diinput ${data.curah}`,
        id: res[0].insertId,
      })
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }

  async findAllFreight(request: any, reply: any): Promise<void> {
    try {
      let conf: Pick<ParamsEntity, 'limit' | 'offset' | 'search'> = {}
      let limitNumber: number = 0
      const { page, size, search } = request.query

      if (page || size) {
        const { limit, offset } = setPagination(page, size, 100)
        conf = {
          limit,
          offset,
          search,
        }
        limitNumber = limit
      }
      const res = await this.getAllFreightUseCase.execute(conf)
      const data = getPagination(res, page, limitNumber)

      return ApiResponse.ok(request, reply, {
        status: true,
        message: 'Data ditemukan',
        data,
      })
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }

  async findOneFreight(request: any, reply: any): Promise<void> {
    try {
      const res = await this.getOneFreightUseCase.execute(
        request.params.freight_id
      )

      if (res === null) throw new AppError(404, false, `Data kosong`, '401')

      return ApiResponse.ok(request, reply, {
        status: true,
        message: 'Data ditemukan',
        data: res,
      })
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }

  async updateFreight(request: any, reply: any): Promise<void> {
    try {
      const data: FreightEntity = request.body
      data.id_user_stockpile = request.user.user_id

      if (request.files['file_npwp']) {
        data!.file_npwp = `${process.env.URL_FILE}/purchasing/${request.files['file_npwp'][0].filename}`
      }
      if (request.files['file_pkp']) {
        data!.file_pkp = `${process.env.URL_FILE}/purchasing/${request.files['file_pkp'][0].filename}`
      }
      if (request.files['file_ktp']) {
        data!.file_ktp = `${process.env.URL_FILE}/purchasing/${request.files['file_ktp'][0].filename}`
      }

      const res = await this.updateFreightUseCase.execute(
        request.params.freight_id,
        request.user.user_id,
        data
      )

      return ApiResponse.ok(request, reply, {
        status: true,
        message: `Data update vendor freight berhasil diinput`,
        id: res[0].insertId,
      })
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }

  async findAllFreightBank(request: any, reply: any): Promise<void> {
    try {
      let conf: Pick<ParamsEntity, 'limit' | 'offset'> = {}
      let limitNumber: number = 0
      const { page, size } = request.query

      if (page || size) {
        const { limit, offset } = setPagination(page, size, 100)
        conf = {
          limit,
          offset
        }
        limitNumber = limit
      }
      const res = await this.getAllFreightBankUseCase.execute(conf)
      const data = getPagination(res, page, limitNumber)

      return ApiResponse.ok(request, reply, {
        status: true,
        message: 'Data ditemukan',
        data,
      })
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }

  async findBankByFreightId(request: any, reply: any): Promise<void> {
    try {
      const res = await this.getBankByFreightIdUseCase.execute(
        request.params.freight_id
      )

      if (res === null) throw new AppError(404, false, `Data kosong`, '401')

      return ApiResponse.ok(request, reply, {
        status: true,
        message: 'Data ditemukan',
        data: res,
      })
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }

  async findAllStockpile(request: any, reply: any): Promise<void> {
    try {
      let conf: Pick<ParamsEntity, 'limit' | 'offset'> = {}
      let limitNumber: number = 0
      const { page, size } = request.query

      if (page || size) {
        const { limit, offset } = setPagination(page, size, 100)
        conf = {
          limit,
          offset
        }
        limitNumber = limit
      }

      const res = await this.getAllStockpileUseCase.execute(conf)
      const data = getPagination(res, page, limitNumber)

      return ApiResponse.ok(request, reply, {
        status: true,
        message: 'Data ditemukan',
        data,
      })
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }

  async findAllCurrency(request: any, reply: any): Promise<void> {
    try {
      const { page, size } = request.query
      const { limit, offset } = setPagination(page, size, 100)
      const conf: Pick<ParamsEntity, 'limit' | 'offset'> = {
        limit,
        offset,
      }
      const res = await this.getAllCurrencyUseCase.execute(conf)
      const data = getPagination(res, page, limit)

      return ApiResponse.ok(request, reply, {
        status: true,
        message: 'Data ditemukan',
        data,
      })
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }

  async pengajuanPkhoa(request: any, reply: any): Promise<void> {
    try {
      const data: PkhoaEntity = request.body
      data.status = 2

      if (request.files['file_pkhoa']) {
        data!.file = `${process.env.URL_FILE}/purchasing/${request.files['file_pkhoa'][0].filename}`
      }

      const res = await this.pengajuanPkhoaUseCase.execute(
        request.user.user_id,
        data
      )

      return ApiResponse.created(request, reply, {
        status: true,
        message: `Data pengajuan pkhoa`,
        id: res[0].insertId,
      })
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }

  async findAllPkhoa(request: any, reply: any): Promise<void> {
    try {
      let conf: Pick<ParamsEntity, 'limit' | 'offset' | 'search'> = {}
      let limitNumber: number = 0
      const { page, size } = request.query

      if (page || size) {
        const { limit, offset } = setPagination(page, size, 100)
        conf = {
          limit,
          offset
        }
        limitNumber = limit
      }

      const res = await this.getAllPkhoaUseCase.execute(conf)
      const data = getPagination(res, page, limitNumber)

      return ApiResponse.ok(request, reply, {
        status: true,
        message: 'Data ditemukan',
        data,
      })
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }

  async findOnePkhoa(request: any, reply: any): Promise<void> {
    try {
      const res = await this.getOnePkhoaUseCase.execute(
        request.params.freight_cost_id
      )

      if (res === null) throw new AppError(404, false, `Data kosong`, '401')

      return ApiResponse.ok(request, reply, {
        status: true,
        message: 'Data ditemukan',
        data: res,
      })
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }

  async updatePkhoa(request: any, reply: any): Promise<void> {
    try {
      const data: PkhoaEntity = request.body

      if (request.files['file_pkhoa']) {
        data!.file = `${process.env.URL_FILE}/purchasing/${request.files['file_pkhoa'][0].filename}`
      }

      const res = await this.updatePkhoaUseCase.execute(
        request.params.freight_cost_id,
        request.user.user_id,
        data
      )

      return ApiResponse.ok(request, reply, {
        status: true,
        message: `Data update pkhoa berhasil diinput`,
        id: res[0].insertId,
      })
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }

}
