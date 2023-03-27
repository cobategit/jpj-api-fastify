import { AppError } from "@jpj-common/module";
import { PkhoaEntity } from "../../entity";
import { IGetOnePkhoaUseCase, IPurchasingRepo } from "../../interfaces";

export class GetOnePkhoaUseCase implements IGetOnePkhoaUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id?: number): Promise<PkhoaEntity | null> {
        try {
            const res = await this.purchasingRepo.findOnePkhoa(id)

            if (res == null) {
                return null
            }

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}