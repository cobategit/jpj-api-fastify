import { AppError } from "@jpj-common/module";
import { ParamsEntity } from "../../entity";
import { IDeletePengajuanKontrakPksUseCase, IPurchasingRepo } from "../../interfaces";

export class DeletePengajuanKontrakPksUseCase implements IDeletePengajuanKontrakPksUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id: number, user_id: number): Promise<any> {
        let boolCantDelete: boolean = false
        const conf: Pick<ParamsEntity, 'tableCol1' | 'tableVal1'> = {
            tableCol1: 'purchasing_id',
            tableVal1: id
        }

        try {
            const findPurchasingInPoPks = await this.purchasingRepo.findOnePoPksDynamic(conf)

            if (findPurchasingInPoPks.length == 0) {
                boolCantDelete = true
                return { checkData: boolCantDelete }
            }

            if (findPurchasingInPoPks[0]?.final_status != 4) {
                boolCantDelete = true
                return { checkDeleted: boolCantDelete }
            }

            const [deleteVendorKontrak, deletePurchasingFreightCost, deletePopks, deletePurchasing] = await Promise.all([
                this.purchasingRepo.deleteVendorKontrak(findPurchasingInPoPks[0].po_pks_id, user_id),
                this.purchasingRepo.deletePurchasingFreightCost(id, user_id),
                this.purchasingRepo.deletePopks(id, user_id),
                this.purchasingRepo.deletePurchasing(id, user_id)
            ])

            return { checkDeleted: boolCantDelete, deletePurchasing, deletePopks, deletePurchasingFreightCost, deleteVendorKontrak }
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}