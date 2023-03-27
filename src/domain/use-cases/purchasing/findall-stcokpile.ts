import { AppError } from "@jpj-common/module";
import { ParamsEntity, CurrencyEntity, StockpileEntity } from "../../entity";
import { IGetAllStockpileUseCase, IPurchasingRepo } from "../../interfaces";

export class GetAllStockpileUseCase implements IGetAllStockpileUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(conf?: Pick<ParamsEntity, 'limit' | 'offset'> | undefined): Promise<{ count: number, rows: StockpileEntity[] }> {
        try {
            const res = await this.purchasingRepo.findAllStockpile(conf)

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}