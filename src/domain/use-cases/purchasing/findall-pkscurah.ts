import { AppError } from "@jpj-common/module";
import { ParamsEntity, PksCurahEntity } from "../../entity";
import { IGetAllPksCurahUseCase, IPurchasingRepo } from "../../interfaces";

export class GetAllPksCurahUseCase implements IGetAllPksCurahUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search' | 'vendor_type'> | undefined): Promise<{ count: number, rows: PksCurahEntity[] }> {
        try {
            const res = await this.purchasingRepo.findAllPksCurah(conf)

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}