import { AppError } from "@jpj-common/module";
import { PksCurahBankEntity } from "../../entity";
import { IGetBankByPksCurahIdUseCase, IPurchasingRepo } from "../../interfaces";

export class GetBankByPksCurahIdUseCase implements IGetBankByPksCurahIdUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id?: number): Promise<PksCurahBankEntity[]> {
        try {
            const res = await this.purchasingRepo.findBankByPksCurahId([id!])

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}