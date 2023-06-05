import { ParamsEntity } from "../../entity";
import { IDeleteTerminKontrakPksUseCase, IPurchasingRepo } from "../../interfaces";


export class DeleteTerminKontrakPksUseCase implements IDeleteTerminKontrakPksUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id?: number | undefined, user_id?: number | undefined): Promise<any> {
        const result = new Map<string, string | number | boolean>()
        const paramsAllowDelet = new Map<String, Pick<ParamsEntity, 'columnKey' | 'columnValue'>>()

        paramsAllowDelet.set('data', {
            columnKey: 'purchasing_detail_id',
            columnValue: id!
        })
        const allowDelet = await this.purchasingRepo.findOneDynamicPurchasingDetail(paramsAllowDelet.get('data'))

        if (allowDelet.length == 0 || allowDelet[0]?.status != 0) {
            result.set('allowDelet', true)
            paramsAllowDelet.delete('data')
            return result
        }

        const delet = await this.purchasingRepo.deleteTerminKontrakPks(id, user_id)

        result.set('allowDelet', false)
        result.set('dataUpdate', delet[0].changedRows)

        return result
    }
}