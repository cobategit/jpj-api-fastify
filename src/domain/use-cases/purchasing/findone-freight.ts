import { AppError } from "@jpj-common/module";
import { FreightEntity } from "../../entity";
import { IGetOneFreightUseCase, IPurchasingRepo } from "../../interfaces";

export class GetOneFreightUseCase implements IGetOneFreightUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id?: number): Promise<FreightEntity | null> {
        try {
            const res = await this.purchasingRepo.findOneFreight(id)

            if (res == null) {
                return null
            }

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}