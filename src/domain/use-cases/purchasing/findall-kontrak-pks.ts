import { AppError, getPagination, setPagination } from "@jpj-common/module";
import { PaginationEntity, ParamsEntity } from "../../entity";
import { IGetAllKontrakPksUseCase, IPurchasingRepo } from "../../interfaces";

export class GetAllKontrakPksUseCase implements IGetAllKontrakPksUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(conf?: ParamsEntity | undefined): Promise<PaginationEntity> {
        try {
            let limitNumber: number = 0

            if (conf!.page || conf!.size) {
                const { limit, offset } = setPagination(conf?.page!, conf?.size!, 100)
                conf = {
                    limit,
                    offset,
                    search: conf?.search,
                }
                limitNumber = limit
            }
            const res = await this.purchasingRepo.findAllKontrakPks(conf)
            const data = getPagination(res, conf?.page!, limitNumber)

            return data
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}