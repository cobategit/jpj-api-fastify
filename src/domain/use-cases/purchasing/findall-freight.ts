import { AppError } from "@jpj-common/module";
import { ParamsEntity, FreightEntity } from "../../entity";
import { IGetAllFreightUseCase, IPurchasingRepo } from "../../interfaces";

export class GetAllFreightUseCase implements IGetAllFreightUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search'> | undefined): Promise<{ count: number, rows: FreightEntity[] }> {
        try {
            const res = await this.purchasingRepo.findAllFreight(conf)

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}