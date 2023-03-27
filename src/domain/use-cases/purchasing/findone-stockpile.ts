import { AppError } from "@jpj-common/module";
import { StockpileEntity } from "../../entity";
import { IGetOneStockpileUseCase, IPurchasingRepo } from "../../interfaces";

export class GetOneStockpileUseCase implements IGetOneStockpileUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id?: number): Promise<StockpileEntity | null> {
        try {
            const res = await this.purchasingRepo.findOneStockpile(id)

            if (res == null) {
                return null
            }

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}