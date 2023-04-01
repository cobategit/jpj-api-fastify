import { AppError } from "@jpj-common/module";
import { FreightBankEntity, FreightEntity } from "../../entity";
import { IGetBankByFreightIdUseCase, IPurchasingRepo } from "../../interfaces";

export class GetBankByFreightIdUseCase implements IGetBankByFreightIdUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id?: number): Promise<FreightBankEntity[]> {
        try {
            const res = await this.purchasingRepo.findBankByFreightId([id!])

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}