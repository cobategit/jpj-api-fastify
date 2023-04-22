import { AppError } from "@jpj-common/module";
import { ParamsEntity } from "../../entity";
import { IDeletePkhoaUseCase, IPurchasingRepo } from "../../interfaces";

export class DeletePkhoaUseCase implements IDeletePkhoaUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id: number, user_id: number): Promise<any> {
        let res: Record<string, any> = {}
        let boolCantDelete: boolean = false
        const conf: Pick<ParamsEntity, 'columnKey' | 'columnValue'> = {
            columnKey: 'freight_cost_id',
            columnValue: id
        }

        try {
            const checkInVendorKontrakCost = await this.purchasingRepo.findOneVendorKontrakDynamic(conf)

            if (checkInVendorKontrakCost.length > 0) {
                boolCantDelete = true
            } else {
                res = await this.purchasingRepo.deletePkhoa(id, user_id)
            }

            return { checkDeleted: boolCantDelete, delete: res }
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}