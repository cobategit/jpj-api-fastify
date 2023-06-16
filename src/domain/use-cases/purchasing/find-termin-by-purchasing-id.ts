import { AppError } from "@jpj-common/module";
import { ParamsEntity, PurchasingDetailEntity } from "../../entity";
import { IFindTerminByPurchasingIdUseCase, IPurchasingRepo } from "../../interfaces";

export class FindTerminByPurchasingIdUseCase implements IFindTerminByPurchasingIdUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id?: number | undefined): Promise<PurchasingDetailEntity[]> {
        try {
            const conf = new Map<string, Pick<ParamsEntity, 'columnKey' | 'columnValue'>>()
            conf.set('data', {
                columnKey: 'purchasing_id',
                columnValue: id
            })
            const res = await this.purchasingRepo.findOneDynamicPurchasingDetail(conf.get('data'))

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}