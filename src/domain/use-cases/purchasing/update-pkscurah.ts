import { AppError } from "@jpj-common/module";
import { ParamsEntity, PksCurahEntity } from "../../entity";
import { IUpdatePksCurahUseCase, IPurchasingRepo } from "../../interfaces";

export class UpdatePksCurahUseCase implements IUpdatePksCurahUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id: number, user_id: number, data?: PksCurahEntity | undefined): Promise<any> {
        let res: Record<string, any> = {}
        let boolCantUpdate: boolean = false
        const conf: Pick<ParamsEntity, 'tableCol1' | 'tableVal1'> = {
            tableCol1: 'vendor_id',
            tableVal1: id
        }

        try {
            const checkInPurchasing = await this.purchasingRepo.findOnePurchasingDynamic(conf)
            const checkInPoPks = await this.purchasingRepo.findOnePoPksDynamic(conf)
            const checkInFreightCost = await this.purchasingRepo.findOnePkhoaDynamic(conf)

            if (checkInPurchasing.length > 0 || checkInPoPks.length > 0 || checkInFreightCost.length > 0) {
                boolCantUpdate = true
            } else {
                res = await this.purchasingRepo.updatePksCurah(id, user_id, data)
            }

            return { checkUpdated: boolCantUpdate, update: res }
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}