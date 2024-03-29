import { AppError } from "@jpj-common/module";
import { PkhoaEntity } from "../../entity";
import { IPengajuanPkhoaUseCase, IPurchasingRepo } from "../../interfaces";

export class PengajuanPkhoaUseCase implements IPengajuanPkhoaUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(user_id?: number, data?: PkhoaEntity | undefined): Promise<any> {
        try {
            const res = await this.purchasingRepo.pengajuanPkhoa(user_id, data)

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}