import { AppError } from "@jpj-common/module";
import { PkhoaEntity } from "../../entity";
import { IUpdatePkhoaUseCase, IPurchasingRepo } from "../../interfaces";

export class UpdatePkhoaUseCase implements IUpdatePkhoaUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id: number, user_id: number, data?: PkhoaEntity | undefined): Promise<any> {
        try {
            const res = await this.purchasingRepo.updatePkhoa(id, user_id, data)

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}