import { AppError } from "@jpj-common/module";
import { ParamsEntity } from "../../entity";
import { IDeletePksCurahUseCase, IPurchasingRepo } from "../../interfaces";

export class DeletePksCurahUseCase implements IDeletePksCurahUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id: number, user_id: number): Promise<any> {
        let res: Record<string, any> = {}
        let boolCantDelete: boolean = false
        const conf: Pick<ParamsEntity, 'columnKey' | 'columnValue'> = {
            columnKey: 'vendor_id',
            columnValue: id
        }

        try {
            const checkInPurchasing = await this.purchasingRepo.findOnePurchasingDynamic(conf)
            const checkInPoPks = await this.purchasingRepo.findOnePoPksDynamic(conf)
            const checkInFreightCost = await this.purchasingRepo.findOnePkhoaDynamic(conf)

            if (checkInPurchasing.length > 0 || checkInPoPks.length > 0 || checkInFreightCost.length > 0) {
                boolCantDelete = true
            } else {
                res = await this.purchasingRepo.deletePksCurah(id, user_id)
            }

            return { checkDeleted: boolCantDelete, delete: res }
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}