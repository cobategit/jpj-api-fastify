import { AppError } from "@jpj-common/module";
import { IGetPlanPaymentDateUseCase, IPurchasingRepo } from "../../interfaces";

export class GetPlanPaymentDateUseCase implements IGetPlanPaymentDateUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(): Promise<any> {
        try {
            const res = await this.purchasingRepo.findPlanPaymentDate()

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}