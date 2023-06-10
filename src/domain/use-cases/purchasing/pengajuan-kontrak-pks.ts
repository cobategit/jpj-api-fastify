import { AppError } from "@jpj-common/module";
import { format } from "date-fns";
import { TypePengajuanKontrakPks } from "../../entity";
import { IPengajuanKontrakPksUseCase, IPurchasingRepo } from "../../interfaces";

export class PengajuanKontrakPksUseCase implements IPengajuanKontrakPksUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(user_id?: number, data?: TypePengajuanKontrakPks | undefined): Promise<any> {
        try {
            const result = new Map<string, any>()
            data!.entry_by = user_id
            data!.entry_date = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`

            if (data?.isTermin) {
                if (Number(data?.quantity) < Number(data?.quantity_payment)) {
                    return result.set('remainQuantity', true)
                }
            }

            const res = await this.purchasingRepo.pengajuanKontrakPks(user_id, data)
            result.set('id', res[0].insertId)

            return result
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}