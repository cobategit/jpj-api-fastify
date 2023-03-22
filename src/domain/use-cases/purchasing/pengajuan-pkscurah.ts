import { AppError } from "@jpj-common/module";
import { PksCurahEntity } from "../../entity";
import { IPengajuanPksCurahUseCase, IPurchasingRepo } from "../../interfaces";

export class PengajuanPksCurahUseCase implements IPengajuanPksCurahUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(user_id?: number, data?: PksCurahEntity | undefined): Promise<any> {
        try {
            const res = await this.purchasingRepo.pengajuanPksCurah(user_id, data)

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}