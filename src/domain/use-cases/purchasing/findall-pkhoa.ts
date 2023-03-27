import { AppError } from "@jpj-common/module";
import { ParamsEntity, PkhoaEntity } from "../../entity";
import { IGetAllPkhoaUseCase, IPurchasingRepo } from "../../interfaces";

export class GetAllPkhoaUseCase implements IGetAllPkhoaUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search'> | undefined): Promise<{ count: number, rows: PkhoaEntity[] }> {
        try {
            const res = await this.purchasingRepo.findAllPkhoa(conf)

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}