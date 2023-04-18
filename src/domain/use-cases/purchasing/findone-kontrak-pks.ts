import { AppError } from "@jpj-common/module";
import { PurchasingEntity } from "../../entity";
import { IGetOneKontrakPksUseCase, IPurchasingRepo } from "../../interfaces";

export class GetOneKontrakPksUseCase implements IGetOneKontrakPksUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id?: number | undefined): Promise<PurchasingEntity | null> {
        try {
            const res = await this.purchasingRepo.findOneKontrakPks(id)

            if (res == null) {
                return null
            }

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}