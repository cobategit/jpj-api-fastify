import { AppError } from "@jpj-common/module";
import { ParamsEntity, PurchasingEntity } from "../../entity";
import { IUpdateFilePurchasingUseCase, IPurchasingRepo } from "../../interfaces";

export class UpdateFilePurchasingUseCase implements IUpdateFilePurchasingUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id?: number | undefined, user_id?: number | undefined, data?: Pick<PurchasingEntity, "upload_file" | "approval_file" | "upload_file1" | "upload_file2" | "upload_file3" | "upload_file4"> | undefined): Promise<any> {
        let boolCantUpdate: boolean = false
        const conf: Pick<ParamsEntity, 'columnKey' | 'columnValue'> = {
            columnKey: 'purchasing_id',
            columnValue: id
        }

        try {
            const findPurchasingInPoPks = await this.purchasingRepo.findOnePoPksDynamic(conf)

            if (findPurchasingInPoPks.length == 0) {
                boolCantUpdate = true
                return { checkData: boolCantUpdate }
            }

            if (findPurchasingInPoPks[0]?.final_status != 2 && findPurchasingInPoPks[0]?.final_status != 3 && findPurchasingInPoPks[0]?.final_status != 4) {
                boolCantUpdate = true
                return { checkUpdated: boolCantUpdate }
            }

            const updateFilePurchasing = await this.purchasingRepo.updateFilePurchasing(id, user_id, data)

            return { checkUpdated: boolCantUpdate, updateFilePurchasing }
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }

}