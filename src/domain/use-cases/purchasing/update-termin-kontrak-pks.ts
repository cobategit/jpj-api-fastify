import { HttpResponse, ParamsEntity, PurchasingDetailEntity, TypePengajuanKontrakPks } from "../../entity";
import { IPurchasingRepo, IUpdateTerminKontrakPksUseCase } from "../../interfaces";

export class UpdateTerminKontrakPksUseCase implements IUpdateTerminKontrakPksUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id?: number | undefined, user_id?: number, data?: TypePengajuanKontrakPks | undefined): Promise<any> {
        const result = new Map<string, string | number | boolean | HttpResponse>()
        const paramsAllowUpdate = new Map<string, Pick<ParamsEntity, 'columnKey' | 'columnValue'>>()
        const dataCheckQuantityTermin = new Map<string, Pick<TypePengajuanKontrakPks, 'purchasing_id' | 'purchasing_detail_id'>>()

        dataCheckQuantityTermin.set('data', {
            purchasing_id: data?.purchasing_id,
            purchasing_detail_id: id!
        })
        const checkQuantityTermin = await this.purchasingRepo.checkQuantityTerminKontrakPks('update', dataCheckQuantityTermin.get('data'))
        const selisihQuantityTermin = Number(checkQuantityTermin.remain_quantity_termin) - Number(data?.quantity_payment)

        if (selisihQuantityTermin < 0) {
            result.set('error', true)
            result.set('dataError', {
                status: false,
                message: 'Quantity melebihi dari ketentuan'
            })
            return result
        }

        paramsAllowUpdate.set('data', {
            columnKey: 'purchasing_detail_id',
            columnValue: id!
        })
        const allowUpdate = await this.purchasingRepo.findOneDynamicPurchasingDetail(paramsAllowUpdate.get('data'))

        if (allowUpdate[0].contract_id || allowUpdate[0]?.status != 0 || allowUpdate[0]?.admin_input_by) {
            result.set('error', true)
            result.set('dataError', {
                status: false,
                message: 'Update termin tidak bisa, cek kembali status termin, atau tanya kepada HO'
            })
            paramsAllowUpdate.delete('data')
            return result
        }

        const update = await this.purchasingRepo.updateTerminKontrakPks(id, user_id, data)

        result.set('dataSuccess', {
            status: true,
            message: 'Update termin berhasil',
            id: id
        })
        return result
    }

}