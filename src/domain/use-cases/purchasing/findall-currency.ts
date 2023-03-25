import { AppError } from "@jpj-common/module";
import { ParamsEntity, CurrencyEntity } from "../../entity";
import { IGetAllCurrencyUseCase, IPurchasingRepo } from "../../interfaces";

export class GetAllCurrencyUseCase implements IGetAllCurrencyUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(conf?: Pick<ParamsEntity, 'limit' | 'offset'> | undefined): Promise<{ count: number, rows: CurrencyEntity[] }> {
        try {
            const res = await this.purchasingRepo.findAllCurrency(conf)

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}