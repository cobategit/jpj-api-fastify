import { AppError, getPagination, setPagination } from "@jpj-common/module";
import { FreightBankEntity, FreightEntity, ParamsEntity } from "../../entity";
import { IGetAllFreightUseCase, IPurchasingRepo } from "../../interfaces";

export class GetAllFreightUseCase implements IGetAllFreightUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(conf?: ParamsEntity | undefined): Promise<Record<string, any>> {
        try {
            let tmpFreightId: number[] = []
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
            const res = await this.purchasingRepo.findAllFreight(conf)
            await Promise.all(
                res.rows.map((val: FreightEntity) => {
                    tmpFreightId.push(val.freight_id!)
                })
            )

            const resBank = await this.purchasingRepo.findBankByFreightId(tmpFreightId)
            await Promise.all(
                res.rows.map((val1: FreightEntity) => {
                    let arr: Record<string, any>[] = []
                    resBank.map((val2: FreightBankEntity) => {
                        if (val1.freight_id == val2.freight_id) {
                            let obj: Pick<FreightBankEntity, 'file_rekbank'> = {
                                file_rekbank: val2.file_rekbank
                            }
                            arr.push(obj)
                        }
                    })
                    val1.bank = arr
                })
            )
            const data = getPagination(res, conf?.page!, limitNumber)

            return data
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}