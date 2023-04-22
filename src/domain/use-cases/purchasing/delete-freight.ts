import { AppError } from "@jpj-common/module";
import { ParamsEntity } from "../../entity";
import { IDeleteFreightUseCase, IPurchasingRepo } from "../../interfaces";

export class DeleteFreightUseCase implements IDeleteFreightUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id: number, user_id: number): Promise<any> {
        let res: Record<string, any> = {}
        let boolCantDelete: boolean = false
        const conf: Pick<ParamsEntity, 'columnKey' | 'columnValue'> = {
            columnKey: 'freight_id',
            columnValue: id
        }

        try {
            const checkInFreightCost = await this.purchasingRepo.findOnePkhoaDynamic(conf)

            if (checkInFreightCost.length > 0) {
                boolCantDelete = true
            } else {
                res = await this.purchasingRepo.deleteFreight(id, user_id)
            }

            return { checkDeleted: boolCantDelete, delete: res }
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}