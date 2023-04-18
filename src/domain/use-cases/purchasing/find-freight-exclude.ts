import { AppError } from "@jpj-common/module";
import { IGetPkhoaExcludeUseCase, IPurchasingRepo } from "../../interfaces";

export class GetPkhoaExcludeUseCase implements IGetPkhoaExcludeUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(stockpile_id: number, vendor_id: number, req_payment_date: string): Promise<any> {
        try {
            const res = await this.purchasingRepo.getPkhoaExclude(stockpile_id, vendor_id, req_payment_date)

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}