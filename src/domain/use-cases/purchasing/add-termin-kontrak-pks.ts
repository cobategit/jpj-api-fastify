import { ParamsEntity, TypePengajuanKontrakPks } from "../../entity";
import { IAddTerminKontrakPksUseCase, IPurchasingRepo } from "../../interfaces";

export class AddTerminKontrakPksUseCase implements IAddTerminKontrakPksUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(data?: TypePengajuanKontrakPks | undefined): Promise<any> {
        const result = new Map<string, string | number | boolean>()
        const dataCheckQuantityTermin = new Map<string, Pick<TypePengajuanKontrakPks, 'purchasing_id'>>()

        dataCheckQuantityTermin.set('data', {
            purchasing_id: data?.purchasing_id
        })
        const checkQuantityTermin = await this.purchasingRepo.checkQuantityTerminKontrakPks(undefined, dataCheckQuantityTermin.get('data'))
        const selisihQuantityTermin = Number(checkQuantityTermin.remain_quantity_termin) - Number(data?.quantity_payment)

        if (selisihQuantityTermin < 0) {
            result.set('remainQuantity', true)
            return result
        }

        const insert = await this.purchasingRepo.addTerminKontrakPks(data!)

        result.set('remainQuantity', false)
        result.set('dataInsert', insert[0].insertId)
        return result
    }
}