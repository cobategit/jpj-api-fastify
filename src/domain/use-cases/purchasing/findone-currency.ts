import { AppError } from "@jpj-common/module";
import { CurrencyEntity, StockpileEntity } from "../../entity";
import { IGetOneCurrencyUseCase, IPurchasingRepo } from "../../interfaces";

export class GetOneCurrencyUseCase implements IGetOneCurrencyUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id?: number): Promise<CurrencyEntity | null> {
        try {
            const res = await this.purchasingRepo.findOneCurrency(id)

            if (res == null) {
                return null
            }

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}