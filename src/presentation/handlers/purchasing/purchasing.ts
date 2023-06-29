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
  IChangedPasswordPurchasingUseCase,
  IForgotPasswordPurchasingUseCase,
  TypePengajuanKontrakPks,
  IUpdateTerminKontrakPksUseCase,
  IDeleteTerminKontrakPksUseCase,
  IAddTerminKontrakPksUseCase,
  IFindTerminByPurchasingIdUseCase,
  IRemindTerminKontrakPksUseCase,
  IFindOneTerminKontrakPksUseCase,
  IReportsPksUseCase,
} from '../../../domain'
import { IPurchasingHandler } from '../../interfaces'

export class PurchasingHandler implements IPurchasingHandler {
  private registerUserPurchasingUseCase: IRegisterUserPurchasingUseCase
  private loginUserPurchasingUseCase: ILoginUserPurchasingUseCase
  private changedPasswordPurchasingUseCase: IChangedPasswordPurchasingUseCase
  private forgotPasswordPurchasingUseCase: IForgotPasswordPurchasingUseCase
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
  private addTerminKontrakPksUseCase: IAddTerminKontrakPksUseCase
  private updateTerminKontrakPksUseCase: IUpdateTerminKontrakPksUseCase
  private deleteTerminKontrakPksUseCase: IDeleteTerminKontrakPksUseCase
  private findTerminByPurchasingIdUseCase: IFindTerminByPurchasingIdUseCase
  private remindTerminKontrakPksUseCase: IRemindTerminKontrakPksUseCase
  private findOneTerminKontrakPksUseCase: IFindOneTerminKontrakPksUseCase

  constructor(
    registerUserPurchasingUseCase: IRegisterUserPurchasingUseCase,
    loginUserPurchasingUseCase: ILoginUserPurchasingUseCase,
    changedPasswordPurchasingUseCase: IChangedPasswordPurchasingUseCase,
    forgotPasswordPurchasingUseCase: IForgotPasswordPurchasingUseCase,
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
    updateFilePurchasingUseCase: IUpdateFilePurchasingUseCase,
    addTerminKontrakPksUseCase: IAddTerminKontrakPksUseCase,
    updateTerminKontrakPksUseCase: IUpdateTerminKontrakPksUseCase,
    deleteTerminKontrakPksUseCase: IDeleteTerminKontrakPksUseCase,
    findTerminByPurchasingIdUseCase: IFindTerminByPurchasingIdUseCase,
    remindTerminKontrakPksUseCase: IRemindTerminKontrakPksUseCase,
    findOneTerminKontrakPksUseCase: IFindOneTerminKontrakPksUseCase,
    private readonly reportsPksUseCase: IReportsPksUseCase
  ) {
    this.registerUserPurchasingUseCase = registerUserPurchasingUseCase
    this.loginUserPurchasingUseCase = loginUserPurchasingUseCase
    this.changedPasswordPurchasingUseCase = changedPasswordPurchasingUseCase
    this.forgotPasswordPurchasingUseCase = forgotPasswordPurchasingUseCase
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
    this.addTerminKontrakPksUseCase = addTerminKontrakPksUseCase
    this.updateTerminKontrakPksUseCase = updateTerminKontrakPksUseCase
    this.deleteTerminKontrakPksUseCase = deleteTerminKontrakPksUseCase
    this.findTerminByPurchasingIdUseCase = findTerminByPurchasingIdUseCase
    this.remindTerminKontrakPksUseCase = remindTerminKontrakPksUseCase
    this.findOneTerminKontrakPksUseCase = findOneTerminKontrakPksUseCase
  }

  async register(request: any, reply: any): Promise<void> {
    try {
      const data: EntityUser = request.body
      data!.entry_date = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`

      const res = await this.registerUserPurchasingUseCase.execute(data)

      if (res.get('error'))
        throw new AppError(404, false, `${res.get('dataError').message}`, '401')

      return ApiResponse.created(request, reply, res.get('dataSuccess'))
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
        user_id: res.get('dataSuccess')['data']['user_id'],
        user_email: res.get('dataSuccess')['data']['user_email'],
        deviced_id: res.get('dataSuccess')['data']['deviced_id'],
      }
      const token = await TokenJWt.generateJwt(objectToken, null)

      if (res?.get('error'))
        throw new AppError(404, false, `${res.get('dataError').message}`, '401')

      const user: Pick<
        EntityUser,
        'user_id' | 'user_email' | 'user_name' | 'deviced_id' | 'stockpile_id'
      > = {
        user_id: res.get('dataSuccess')['data']['user_id'],
        user_email: res.get('dataSuccess')['data']['user_email'],
        deviced_id: res.get('dataSuccess')['data']['deviced_id'],
        stockpile_id: res.get('dataSuccess')['data']['stockpile_id'],
        user_name: res.get('dataSuccess')['data']['user_name'],
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

  async changedPassword(request: any, reply: any): Promise<void> {
    try {
      const { deviced_id, current_password, new_password, confirm_password } = request.body

      if (new_password != confirm_password) {
        throw new AppError(406, false, 'New password dan confirm password tidak cocok', '406')
      }

      const res = await this.changedPasswordPurchasingUseCase.execute(deviced_id, current_password, new_password);

      if (res.get('error')) {
        throw new AppError(400, false, `${res.get('dataError')['message']}`, '401')
      }

      return ApiResponse.ok(request, reply, res.get('dataSuccess'))
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }

  async forgotPassword(request: any, reply: any): Promise<void> {
    try {
      const { deviced_id, email } = request.body

      const res = await this.forgotPasswordPurchasingUseCase.execute(deviced_id, email);

      if (res.get('error')) {
        throw new AppError(404, false, `${res.get('dataError')['message']}`, '401')
      }

      return ApiResponse.ok(request, reply, res.get('dataSuccess'))
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

      if (res.checkUpdated) {
        return ApiResponse.ok(request, reply, {
          status: false,
          message: `Updated vendor pkscurah tidak berhasil, karena vendor sedang terpakai`,
        })
      }

      if (!res?.update[0]?.changedRows) {
        return ApiResponse.ok(request, reply, {
          status: true,
          message: `Updated vendor pkscurah tidak ada perubahan`,
          id: request.params.vendor_id,
        })
      }

      return ApiResponse.ok(request, reply, {
        status: true,
        message: `Data update vendor pkscurah berhasil diinput ${data.curah}`,
        id: request.params.vendor_id,
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

      if (res.checkUpdated) {
        return ApiResponse.ok(request, reply, {
          status: false,
          message: `Updated freight tidak berhasil, karena freight sedang terpakai`,
        })
      }

      if (!res?.update[0]?.changedRows) {
        return ApiResponse.ok(request, reply, {
          status: false,
          message: `Updated freight tidak ada perubahan`,
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
      request.query.user_id = request.user.user_id
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
      request.query.user_id = request.user.user_id
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
      const data: TypePengajuanKontrakPks = request.body
      data.status = 0

      if (request.files['upload_file']) {
        data!.upload_file = `${process.env.URL_FILE}/purchasing/${request.files['upload_file'][0].filename}`
      }
      if (request.files['approval_file']) {
        data!.approval_file = `${process.env.URL_FILE}/purchasing/${request.files['approval_file'][0].filename}`
      }
      if (request.files['upload_file1']) {
        data!.upload_file1 = `${process.env.URL_FILE}/purchasing/${request.files['upload_file1'][0].filename}`
      }
      if (request.files['upload_file2']) {
        data!.upload_file2 = `${process.env.URL_FILE}/purchasing/${request.files['upload_file2'][0].filename}`
      }
      if (request.files['upload_file3']) {
        data!.upload_file3 = `${process.env.URL_FILE}/purchasing/${request.files['upload_file3'][0].filename}`
      }
      if (request.files['upload_file4']) {
        data!.upload_file4 = `${process.env.URL_FILE}/purchasing/${request.files['upload_file4'][0].filename}`
      }

      const res = await this.pengajuanKontrakPksUseCase.execute(
        request.user.user_id,
        data
      )

      if (res.get('error')) {
        throw new AppError(400, false, `${res.get('dataError')['message']}`, '401')
      }

      return ApiResponse.created(request, reply, res.get('dataSuccess'))
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }

  async findAllKontrakPks(request: any, reply: any): Promise<void> {
    try {
      request.query.user_id = request.user.user_id
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

      if (request.files['upload_file']) {
        data!.upload_file = `${process.env.URL_FILE}/purchasing/${request.files['upload_file'][0].filename}`
      }
      if (request.files['import2']) {
        data!.import2 = `${process.env.URL_FILE}/purchasing/${request.files['import2'][0].filename}`
      }
      if (request.files['approval_file']) {
        data!.approval_file = `${process.env.URL_FILE}/purchasing/${request.files['approval_file'][0].filename}`
      }
      if (request.files['upload_file1']) {
        data!.upload_file1 = `${process.env.URL_FILE}/purchasing/${request.files['upload_file1'][0].filename}`
      }
      if (request.files['upload_file2']) {
        data!.upload_file2 = `${process.env.URL_FILE}/purchasing/${request.files['upload_file2'][0].filename}`
      }
      if (request.files['upload_file3']) {
        data!.upload_file3 = `${process.env.URL_FILE}/purchasing/${request.files['upload_file3'][0].filename}`
      }
      if (request.files['upload_file4']) {
        data!.upload_file4 = `${process.env.URL_FILE}/purchasing/${request.files['upload_file4'][0].filename}`
      }

      const res = await this.updateFilePurchasingUseCase.execute(
        request.params.purchasing_id,
        request.user.user_id,
        request.query.status,
        request.query.final_status,
        data
      )

      if (res.checkData) {
        return ApiResponse.ok(request, reply, {
          status: false,
          message: `Data tidak ada, Update pengajuan kontrak pks tidak berhasil`,
        })
      }

      if (res.checkUpdated || !res?.updateFilePurchasing[0]?.changedRows) {
        return ApiResponse.ok(request, reply, {
          status: false,
          message: `Update kontrak pks file purchasing tidak berhasil`,
        })
      }

      return ApiResponse.ok(request, reply, {
        status: true,
        message: `UpdateData pengajuan kontrak pks`,
        id: request.params.purchasing_id,
      })
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }

  async findTerminByPurchasingId(request: any, reply: any): Promise<void> {
    try {
      const res = await this.findTerminByPurchasingIdUseCase.execute(
        request.params.purchasing_id
      )

      return ApiResponse.ok(request, reply, {
        status: true,
        message: 'Data ditemukan',
        data: res,
      })
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }

  async findOneTerminKontrakPks(request: any, reply: any): Promise<void> {
    try {
      const res = await this.findOneTerminKontrakPksUseCase.execute(request.params.purchasing_detail_id)

      if (!res.get('dataError')!['status']) {
        throw new AppError(400, false, `${res.get('dataError')!['message']}`, '401')
      }

      return ApiResponse.ok(request, reply, res.get('dataSuccess'))
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }

  async remindTerminKontrakPks(request: any, reply: any): Promise<void> {
    try {
      const res = await this.remindTerminKontrakPksUseCase.execute(
        request.params.purchasing_id
      )

      return ApiResponse.ok(request, reply, {
        status: true,
        message: 'Data ditemukan',
        data: res,
      })
    } catch (error) {
      throw new AppError(400, false, `${error}`, '401')
    }
  }

  async addTerminKontrakPks(request: any, reply: any): Promise<void> {
    try {
      const data: TypePengajuanKontrakPks = request.body
      data.status = 0
      const insert = await this.addTerminKontrakPksUseCase.execute(data)

      if (insert?.get('error')) {
        throw new AppError(404, false, `${insert.get('dataError')['message']}`, '401')
      }

      return ApiResponse.ok(request, reply, insert.get('dataSuccess'))
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }

  async updateTerminKontrakPks(request: any, reply: any): Promise<void> {
    try {
      const update = await this.updateTerminKontrakPksUseCase.execute(request.params.purchasing_detail_id, request.user.user_id, request.body)

      if (update?.get('error')) {
        throw new AppError(404, false, `${update.get('dataError')['message']}`, '401')
      }

      return ApiResponse.ok(request, reply, update?.get('dataSuccess'))
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }

  async deleteTerminKontrakPks(request: any, reply: any): Promise<void> {
    try {
      const delet = await this.deleteTerminKontrakPksUseCase.execute(request.params.purchasing_detail_id, request.user.user_id)

      if (delet.get('error')) {
        throw new AppError(404, false, `${delet.get('dataError')['message']}`, '401')
      }

      return ApiResponse.ok(request, reply, delet.get('dataSuccess'))
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }

  async reportsPks(request: any, reply: any): Promise<void> {
    try {
      if (!request.body) {
        throw new AppError(500, false, `Required body: period_from and period_to, stockpile_name, vendor_name`, '501')
      }

      const data = await this.reportsPksUseCase.execute(request.body, request.query)

      return ApiResponse.ok(request, reply, {
        status: true,
        message: 'Data ditemukan',
        data,
      })
    } catch (error) {
      throw new AppError(500, false, `${error}`, '501')
    }
  }

}
