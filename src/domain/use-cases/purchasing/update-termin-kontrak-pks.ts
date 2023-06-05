import { ParamsEntity, PurchasingDetailEntity } from "../../entity";
import { IPurchasingRepo, IUpdateTerminKontrakPksUseCase } from "../../interfaces";

export class UpdateTerminKontrakPksUseCase implements IUpdateTerminKontrakPksUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id?: number | undefined, user_id?: number, data?: PurchasingDetailEntity | undefined): Promise<any> {
        const result = new Map<string, string | number | boolean>()
        const paramsAllowUpdate = new Map<String, Pick<ParamsEntity, 'columnKey' | 'columnValue'>>()

        paramsAllowUpdate.set('data', {
            columnKey: 'purchasing_detail_id',
            columnValue: id!
        })
        const allowUpdate = await this.purchasingRepo.findOneDynamicPurchasingDetail(paramsAllowUpdate.get('data'))

        if (allowUpdate.length == 0 || allowUpdate[0]?.status != 0) {
            result.set('allowUpdate', true)
            paramsAllowUpdate.delete('data')
            return result
        }

        const update = await this.purchasingRepo.updateTerminKontrakPks(id, user_id, data)

        result.set('allowUpdate', false)
        result.set('dataUpdate', update[0].changedRows)

        return result
    }

}