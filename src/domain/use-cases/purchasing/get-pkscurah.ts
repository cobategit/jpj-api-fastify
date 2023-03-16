import { AppError } from "@jpj-common/module";
import { PksCurahEntity } from "../../entity";
import { IPengajuanPksCurahUseCase, IPurchasingRepo } from "../../interfaces";

export class GetAllPksCurahUseCase implements IPengajuanPksCurahUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(): Promise<PksCurahEntity[]> {
        try {
            const res = await this.purchasingRepo.getPksCurah()

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}