import { AppError } from "@jpj-common/module";
import { ParamsEntity, FreightBankEntity } from "../../entity";
import { IGetAllFreightBankUseCase, IPurchasingRepo } from "../../interfaces";

export class GetAllFreightBankUseCase implements IGetAllFreightBankUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(conf?: Pick<ParamsEntity, 'limit' | 'offset'> | undefined): Promise<{ count: number, rows: FreightBankEntity[] }> {
        try {
            const res = await this.purchasingRepo.findAllFreightBank(conf)

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}