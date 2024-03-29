import { AppError } from "@jpj-common/module";
import { FreightEntity } from "../../entity";
import { IPurchasingRepo, IPengajuanFreightUseCase } from "../../interfaces";

export class PengajuanFreightUseCase implements IPengajuanFreightUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(user_id?: number, data?: FreightEntity | undefined): Promise<any> {
        try {
            const res = await this.purchasingRepo.pengajuanFreight(user_id, data)

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}