import { ParamsEntity, PurchasingDetailEntity, TypePengajuanKontrakPks } from "../../entity";
import { IPurchasingRepo, IUpdateTerminKontrakPksUseCase } from "../../interfaces";

export class UpdateTerminKontrakPksUseCase implements IUpdateTerminKontrakPksUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id?: number | undefined, user_id?: number, data?: TypePengajuanKontrakPks | undefined): Promise<any> {
        const result = new Map<string, string | number | boolean>()
        const paramsAllowUpdate = new Map<string, Pick<ParamsEntity, 'columnKey' | 'columnValue'>>()
        const dataCheckQuantityTermin = new Map<string, Pick<TypePengajuanKontrakPks, 'purchasing_id' | 'purchasing_detail_id'>>()

        dataCheckQuantityTermin.set('data', {
            purchasing_id: data?.purchasing_id,
            purchasing_detail_id: id!
        })
        const checkQuantityTermin = await this.purchasingRepo.checkQuantityTerminKontrakPks('update', dataCheckQuantityTermin.get('data'))
        const selisihQuantityTermin = Number(checkQuantityTermin.remain_quantity_termin) - Number(data?.quantity_payment)

        if (selisihQuantityTermin < 0) {
            result.set('remainQuantity', true)
            return result
        }

        paramsAllowUpdate.set('data', {
            columnKey: 'purchasing_detail_id',
            columnValue: id!
        })
        const allowUpdate = await this.purchasingRepo.findOneDynamicPurchasingDetail(paramsAllowUpdate.get('data'))

        if (!allowUpdate[0].contract_id || allowUpdate[0]?.status != 0) {
            result.set('allowUpdate', true)
            paramsAllowUpdate.delete('data')
            return result
        }

        const update = await this.purchasingRepo.updateTerminKontrakPks(id, user_id, data)

        result.set('remainQuantity', false)
        result.set('allowUpdate', false)
        result.set('dataUpdate', update[0].changedRows)
        return result
    }

}