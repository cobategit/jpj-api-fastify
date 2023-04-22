import { AppError } from "@jpj-common/module";
import { FreightEntity, ParamsEntity } from "../../entity";
import { IUpdateFreightUseCase, IPurchasingRepo } from "../../interfaces";

export class UpdateFreightUseCase implements IUpdateFreightUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id: number, user_id: number, data?: FreightEntity | undefined): Promise<any> {
        let res: Record<string, any> = {}
        let boolCantUpdate: boolean = false
        const conf: Pick<ParamsEntity, 'columnKey' | 'columnValue'> = {
            columnKey: 'freight_id',
            columnValue: id
        }

        try {
            const checkInFreightCost = await this.purchasingRepo.findOnePkhoaDynamic(conf)

            if (checkInFreightCost.length > 0) {
                boolCantUpdate = true
            } else {
                res = await this.purchasingRepo.updateFreight(id, user_id, data)
            }

            return { checkUpdated: boolCantUpdate, update: res }
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}