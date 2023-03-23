import { AppError } from "@jpj-common/module";
import { PksCurahEntity } from "../../entity";
import { IUpdatePksCurahUseCase, IPurchasingRepo } from "../../interfaces";

export class UpdatePksCurahUseCase implements IUpdatePksCurahUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id: number, user_id: number, data?: PksCurahEntity | undefined): Promise<any> {
        try {
            const res = await this.purchasingRepo.updatePksCurah(id, user_id, data)

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}