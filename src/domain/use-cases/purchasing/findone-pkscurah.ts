import { AppError } from "@jpj-common/module";
import { ParamsEntity, PksCurahBankEntity, PksCurahEntity } from "../../entity";
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

            if (res != null) {
                const resBank = await this.purchasingRepo.findBankByPksCurahId([id!])
                res.bank = resBank
            }

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}