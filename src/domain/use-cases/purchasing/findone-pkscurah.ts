import { AppError } from "@jpj-common/module";
import { ParamsEntity, PksCurahEntity } from "../../entity";
import { IGetOnePksCurahUseCase, IPurchasingRepo } from "../../interfaces";

export class GetOnePksCurahUseCase implements IGetOnePksCurahUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id?: number): Promise<PksCurahEntity | null> {
        try {
            const res = await this.purchasingRepo.findOnePksCurah(id)

            if (res == null) {
                return null
            }

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}