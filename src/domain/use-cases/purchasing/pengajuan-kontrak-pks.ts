import { AppError } from "@jpj-common/module";
import { format } from "date-fns";
import { PurchasingEntity } from "../../entity";
import { IPengajuanKontrakPksUseCase, IPurchasingRepo } from "../../interfaces";

export class PengajuanKontrakPksUseCase implements IPengajuanKontrakPksUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(user_id?: number, data?: PurchasingEntity | undefined): Promise<any> {
        try {
            data!.entry_by = user_id
            data!.entry_date = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`
            const res = await this.purchasingRepo.pengajuanKontrakPks(user_id, data)

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}