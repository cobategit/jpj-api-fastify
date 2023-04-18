import {
  ApiResponse,
  AppError,
  TokenJWt,
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
  PksCurahEntity,
  IGetBankByFreightIdUseCase,
  PkhoaEntity,
  IPengajuanPkhoaUseCase,
  IGetAllPkhoaUseCase,
  IUpdatePkhoaUseCase,
  IGetOnePkhoaUseCase,
  IGetOneStockpileUseCase,
  IGetOneCurrencyUseCase,
  PurchasingEntity,
  IPengajuanKontrakPksUseCase,
  IGetAllPksCurahBankUseCase,
  IDeletePksCurahUseCase,
  IDeleteFreightUseCase,
  IDeletePkhoaUseCase,
  IGetBankByPksCurahIdUseCase,
  IGetAllKontrakPksUseCase,
  IGetPkhoaExcludeUseCase,
  IGetPlanPaymentDateUseCase,
  IGetOneKontrakPksUseCase,
  IDeletePengajuanKontrakPksUseCase,
  IUpdateFilePurchasingUseCase,
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
  private getOneStockpileUseCase: IGetOneStockpileUseCase
  private getOneCurrencyUseCase: IGetOneCurrencyUseCase
  private pengajuanKontrakPksUseCase: IPengajuanKontrakPksUseCase
  private getAllPksCurahBankUseCase: IGetAllPksCurahBankUseCase
  private deletePksCurahUseCase: IDeletePksCurahUseCase
  private deleteFreightUseCase: IDeleteFreightUseCase
  private deletePkhoaUseCase: IDeletePkhoaUseCase
  private getBankByPksCurahIdUseCase: IGetBankByPksCurahIdUseCase
  private getAllKontrakPksUseCase: IGetAllKontrakPksUseCase
  private getPkhoaExcludeUseCase: IGetPkhoaExcludeUseCase
  private getPlanPaymentDateUseCase: IGetPlanPaymentDateUseCase
  private getOneKontrakPksUseCase: IGetOneKontrakPksUseCase
  private deletePengajuanKontrakPksUseCase: IDeletePengajuanKontrakPksUseCase
  private updateFilePurchasingUseCase: IUpdateFilePurchasingUseCase

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
    getOnePkhoaUseCase: IGetOnePkhoaUseCase,
    getOneStockpileUseCase: IGetOneStockpileUseCase,
    getOneCurrencyUseCase: IGetOneCurrencyUseCase,
    pengajuanKontrakPksUseCase: IPengajuanKontrakPksUseCase,
    getAllPksCurahBankUseCase: IGetAllPksCurahBankUseCase,
    deletePksCurahUseCase: IDeletePksCurahUseCase,
    deleteFreightUseCase: IDeleteFreightUseCase,
    deletePkhoaUseCase: IDeletePkhoaUseCase,
    getBankByPksCurahIdUseCase: IGetBankByPksCurahIdUseCase,
    getAllKontrakPksUseCase: IGetAllKontrakPksUseCase,
    getPkhoaExcludeUseCase: IGetPkhoaExcludeUseCase,
    getPlanPaymentDateUseCase: IGetPlanPaymentDateUseCase,
    getOneKontrakPksUseCase: IGetOneKontrakPksUseCase,
    deletePengajuanKontrakPksUseCase: IDeletePengajuanKontrakPksUseCase,
    updateFilePurchasingUseCase: IUpdateFilePurchasingUseCase

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
    this.getOneStockpileUseCase = getOneStockpileUseCase
    this.getOneCurrencyUseCase = getOneCurrencyUseCase
    this.pengajuanKontrakPksUseCase = pengajuanKontrakPksUseCase
    this.getAllPksCurahBankUseCase = getAllPksCurahBankUseCase
    this.deletePksCurahUseCase = deletePksCurahUseCase
    this.deleteFreightUseCase = deleteFreightUseCase
    this.deletePkhoaUseCase = deletePkhoaUseCase
    this.getBankByPksCurahIdUseCase = getBankByPksCurahIdUseCase
    this.getAllKontrakPksUseCase = getAllKontrakPksUseCase
    this.getPkhoaExcludeUseCase = getPkhoaExcludeUseCase
    this.getPlanPaymentDateUseCase = getPlanPaymentDateUseCase
    this.getOneKontrakPksUseCase = getOneKontrakPksUseCase
    this.deletePengajuanKontrakPksUseCase = deletePengajuanKontrakPksUseCase
    this.updateFilePurchasingUseCase = updateFilePurchasingUseCase
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
        await Promise.all([
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
      data.entry_date = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`
      data.active = 2

      if (request.files['file_npwp']) {
        data!.file_npwp = `${process.env.URL_FILE}/purchasing/${request.files['file_npwp'][0].filename}`
      }
      if (request.files['file_pkp']) {
        data!.file_pkp = `${process.env.URL_FILE}/purchasing/${request.files['file_pkp'][0].filename}`
      }
      if (request.files['file_ktp']) {
        data!.file_ktp = `${process.env.URL_FILE}/purchasing/${request.files['file_ktp'][0].filename}`
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
      const data = await this.getAllPksCurahUseCase.execute(request.query)

      return ApiResponse.ok(request, reply, {
        status: true,
        message: 'Data ditemukan',
        data,
      })
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }

  async findAllPksCurahBank(request: any, reply: any): Promise<void> {
    try {
      const data = await this.getAllPksCurahBankUseCase.execute(request.query)

      return ApiResponse.ok(request, reply, {
        status: true,
        message: 'Data ditemukan',
        data,
      })
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }

  async findBankByPksCurahId(request: any, reply: any): Promise<void> {
    try {
      const res = await this.getBankByPksCurahIdUseCase.execute(
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

      if (request.files['file_npwp']) {
        data!.file_npwp = `${process.env.URL_FILE}/purchasing/${request.files['file_npwp'][0].filename}`
      }
      if (request.files['file_pkp']) {
        data!.file_pkp = `${process.env.URL_FILE}/purchasing/${request.files['file_pkp'][0].filename}`
      }
      if (request.files['file_rekbank']) {
        Promise.all([
          request.files['file_rekbank'].map((val: any, index: number) => {
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

      if (res.checkUpdated || !res?.update[0]?.changedRows) {
        return ApiResponse.ok(request, reply, {
          status: false,
          message: `Updated vendor pkscurah tidak berhasil`,
        })
      }

      return ApiResponse.ok(request, reply, {
        status: true,
        message: `Data update vendor pkscurah berhasil diinput ${data.curah}`,
        id: request.params.vendor_id,
        res
      })
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }

  async deletePksCurah(request: any, reply: any): Promise<void> {
    try {
      const res = await this.deletePksCurahUseCase.execute(
        request.params.vendor_id,
        request.user.user_id,
      )

      if (res.checkDeleted || !res?.delete[0]?.changedRows) {
        return ApiResponse.ok(request, reply, {
          status: false,
          message: `Delete vendor pkscurah tidak berhasil`,
        })
      }

      return ApiResponse.ok(request, reply, {
        status: true,
        message: `Delete vendor pkscurah berhasil`,
      })
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }

  async findAllFreight(request: any, reply: any): Promise<void> {
    try {
      const data = await this.getAllFreightUseCase.execute(request.query)

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
      let dataBank: string[] = []
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
      if (request.files['file_rekbank']) {
        Promise.all([
          request.files['file_rekbank'].map((val: any, index: number) => {
            let file = `${process.env.URL_FILE}/purchasing/${val.filename}`
            dataBank.push(file)
          }),
        ])
      }

      data.file_rekbank = dataBank

      const res = await this.updateFreightUseCase.execute(
        request.params.freight_id,
        request.user.user_id,
        data
      )

      if (res.checkUpdated || !res?.update[0]?.changedRows) {
        return ApiResponse.ok(request, reply, {
          status: false,
          message: `Delete freight  tidak berhasil`,
        })
      }

      return ApiResponse.ok(request, reply, {
        status: true,
        message: `Data update freight berhasil diinput`,
        id: request.params.freight_id,
      })
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }

  async deleteFreight(request: any, reply: any): Promise<void> {
    try {
      const res = await this.deleteFreightUseCase.execute(
        request.params.freight_id,
        request.user.user_id,
      )

      if (res.checkDeleted || !res?.delete[0]?.changedRows) {
        return ApiResponse.ok(request, reply, {
          status: false,
          message: `Delete freight tidak berhasil`,
        })
      }

      return ApiResponse.ok(request, reply, {
        status: true,
        message: `Delete freight berhasil`,
      })
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }

  async findAllFreightBank(request: any, reply: any): Promise<void> {
    try {
      const res = await this.getAllFreightBankUseCase.execute(request.query)

      return ApiResponse.ok(request, reply, {
        status: true,
        message: 'Data ditemukan',
        res,
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

  async findOneStockpile(request: any, reply: any): Promise<void> {
    try {
      const res = await this.getOneStockpileUseCase.execute(
        request.params.stockpile_id
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
      const data = await this.getAllStockpileUseCase.execute(request.query)

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
      const data = await this.getAllCurrencyUseCase.execute(request.query)

      return ApiResponse.ok(request, reply, {
        status: true,
        message: 'Data ditemukan',
        data,
      })
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }

  async findOneCurrency(request: any, reply: any): Promise<void> {
    try {
      const res = await this.getOneCurrencyUseCase.execute(
        request.params.currency_id
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

  async pengajuanPkhoa(request: any, reply: any): Promise<void> {
    try {
      const data: PkhoaEntity = request.body
      data.entry_date = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`
      data.status = 4

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
      const data = await this.getAllPkhoaUseCase.execute(request.query)

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

      if (res.checkUpdated || !res?.update[0]?.changedRows) {
        return ApiResponse.ok(request, reply, {
          status: false,
          message: `Delete pkhoa tidak berhasil`,
        })
      }

      return ApiResponse.ok(request, reply, {
        status: true,
        message: `Data update pkhoa berhasil diinput`,
        id: request.params.freight_cost_id,
      })
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }

  async deletePkhoa(request: any, reply: any): Promise<void> {
    try {
      const res = await this.deletePkhoaUseCase.execute(
        request.params.freight_cost_id,
        request.user.user_id,
      )

      if (res.checkDeleted || !res?.delete[0]?.changedRows) {
        return ApiResponse.ok(request, reply, {
          status: false,
          message: `Delete freight cost tidak berhasil`,
        })
      }

      return ApiResponse.ok(request, reply, {
        status: true,
        message: `Delete freight cost berhasil`,
      })
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }

  async findPkhoaExclude(request: any, reply: any): Promise<void> {
    try {
      const data = await this.getPkhoaExcludeUseCase.execute(request.query.stockpile_id, request.query.vendor_id, request.query.req_payment_date)

      return ApiResponse.ok(request, reply, {
        status: true,
        message: 'Data ditemukan',
        data,
      })
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }

  async pengajuanKontrakPks(request: any, reply: any): Promise<void> {
    try {
      const data: PurchasingEntity = request.body
      data.status = 0

      if (request.files['file_popks1']) {
        data!.upload_file = `${process.env.URL_FILE}/purchasing/${request.files['file_popks1'][0].filename}`
      }
      if (request.files['file_popks2']) {
        data!.approval_file = `${process.env.URL_FILE}/purchasing/${request.files['file_popks2'][0].filename}`
      }
      if (request.files['file_popks3']) {
        data!.upload_file1 = `${process.env.URL_FILE}/purchasing/${request.files['file_popks3'][0].filename}`
      }
      if (request.files['file_popks4']) {
        data!.upload_file2 = `${process.env.URL_FILE}/purchasing/${request.files['file_popks4'][0].filename}`
      }
      if (request.files['file_popks5']) {
        data!.upload_file3 = `${process.env.URL_FILE}/purchasing/${request.files['file_popks5'][0].filename}`
      }
      if (request.files['file_popks6']) {
        data!.upload_file4 = `${process.env.URL_FILE}/purchasing/${request.files['file_popks6'][0].filename}`
      }

      const res = await this.pengajuanKontrakPksUseCase.execute(
        request.user.user_id,
        data
      )

      return ApiResponse.created(request, reply, {
        status: true,
        message: `Data pengajuan kontrak pks`,
        id: res[0].insertId,
      })
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }

  async findAllKontrakPks(request: any, reply: any): Promise<void> {
    try {
      const data = await this.getAllKontrakPksUseCase.execute(request.query)

      return ApiResponse.ok(request, reply, {
        status: true,
        message: 'Data ditemukan',
        data,
      })
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }

  async findOneKontrakPks(request: any, reply: any): Promise<void> {
    try {
      const res = await this.getOneKontrakPksUseCase.execute(
        request.params.purchasing_id
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

  async findPlanPaymentDate(request: any, reply: any): Promise<void> {
    try {
      const data = await this.getPlanPaymentDateUseCase.execute()

      return ApiResponse.ok(request, reply, {
        status: true,
        message: 'Data ditemukan',
        data: `${format(data.tglBayar, 'yyyy-MM-dd')}`,
      })
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }

  async deletePengajuanKontrakPks(request: any, reply: any): Promise<void> {
    try {
      const res = await this.deletePengajuanKontrakPksUseCase.execute(
        request.params.purchasing_id,
        request.user.user_id,
      )

      if (res.checkData) {
        return ApiResponse.ok(request, reply, {
          status: false,
          message: `Data tidak ada, Delete pengajuan kontrak pks tidak berhasil`,
        })
      }

      if (res.checkDeleted || !res?.deletePurchasing[0]?.affectedRows) {
        return ApiResponse.ok(request, reply, {
          status: false,
          message: `Delete pengajuan kontrak pks tidak berhasil`,
        })
      }

      return ApiResponse.ok(request, reply, {
        status: true,
        message: `Delete pengajuan kontrak pks berhasil`,
      })
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }

  async updateFilePurchasing(request: any, reply: any): Promise<void> {
    try {
      const data: PurchasingEntity = request.body

      if (request.files['file_popks1']) {
        data!.upload_file = `${process.env.URL_FILE}/purchasing/${request.files['file_popks1'][0].filename}`
      }
      if (request.files['file_popks2']) {
        data!.approval_file = `${process.env.URL_FILE}/purchasing/${request.files['file_popks2'][0].filename}`
      }
      if (request.files['file_popks3']) {
        data!.upload_file1 = `${process.env.URL_FILE}/purchasing/${request.files['file_popks3'][0].filename}`
      }
      if (request.files['file_popks4']) {
        data!.upload_file2 = `${process.env.URL_FILE}/purchasing/${request.files['file_popks4'][0].filename}`
      }
      if (request.files['file_popks5']) {
        data!.upload_file3 = `${process.env.URL_FILE}/purchasing/${request.files['file_popks5'][0].filename}`
      }
      if (request.files['file_popks6']) {
        data!.upload_file4 = `${process.env.URL_FILE}/purchasing/${request.files['file_popks6'][0].filename}`
      }

      const res = await this.updateFilePurchasingUseCase.execute(
        request.params.purchasing_id,
        request.user.user_id,
        data
      )

      if (res.checkUpdated || !res?.updateFilePurchasing[0]?.changedRows) {
        return ApiResponse.ok(request, reply, {
          status: false,
          message: `Update kontrak pks file purchasing tidak berhasil`,
        })
      }

      return ApiResponse.created(request, reply, {
        status: true,
        message: `UpdateData pengajuan kontrak pks`,
        id: request.params.purchasing_id,
      })
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }

}
