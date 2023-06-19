import { AppError, getPagination, setPagination } from "@jpj-common/module";
import { ParamsEntity, PkhoaEntity } from "../../entity";
import { IGetAllPkhoaUseCase, IPurchasingRepo } from "../../interfaces";

export class GetAllPkhoaUseCase implements IGetAllPkhoaUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(conf?: ParamsEntity | undefined): Promise<Record<string, any>> {
        try {
            let limitNumber: number = 0

            if (conf!.page || conf!.size) {
                const { limit, offset } = setPagination(conf?.page!, conf?.size!, 100)
                conf = {
                    limit,
                    offset,
                    search: conf?.search,
                    user_id: conf?.user_id
                }
                limitNumber = limit
            }
            const res = await this.purchasingRepo.findAllPkhoa(conf)
            const data = getPagination(res, conf?.page!, limitNumber)

            return data
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}