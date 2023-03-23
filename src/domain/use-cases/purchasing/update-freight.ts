import { AppError } from "@jpj-common/module";
import { FreightEntity } from "../../entity";
import { IUpdateFreightUseCase, IPurchasingRepo } from "../../interfaces";

export class UpdateFreightUseCase implements IUpdateFreightUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id: number, user_id: number, data?: FreightEntity | undefined): Promise<any> {
        try {
            const res = await this.purchasingRepo.updateFreight(id, user_id, data)

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}