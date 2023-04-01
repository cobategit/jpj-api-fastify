import { AppError, getPagination, setPagination } from "@jpj-common/module";
import { FreightBankEntity, ParamsEntity, PksCurahBankEntity, PksCurahEntity } from "../../entity";
import { IGetAllPksCurahUseCase, IPurchasingRepo } from "../../interfaces";

export class GetAllPksCurahUseCase implements IGetAllPksCurahUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(conf?: ParamsEntity | undefined): Promise<Record<string, any>> {
        try {
            let tmpVendorId: number[] = []
            let limitNumber: number = 0

            if (conf!.page || conf!.size) {
                const { limit, offset } = setPagination(conf?.page!, conf?.size!, 100)
                conf = {
                    limit,
                    offset,
                    search: conf?.search,
                    vendor_type: conf?.vendor_type,
                }
                limitNumber = limit
            }
            const res = await this.purchasingRepo.findAllPksCurah(conf)

            await Promise.all(
                res.rows.map(async (val: PksCurahEntity) => {
                    tmpVendorId.push(val.vendor_id!)
                })
            )

            const resBank = await this.purchasingRepo.findBankByPksCurahId(tmpVendorId)

            await Promise.all(
                res.rows.map((val1: PksCurahEntity) => {
                    const arr: Record<string, any>[] = []
                    resBank.map((val2: PksCurahBankEntity) => {
                        if (val1.vendor_id === val2.vendor_id) {
                            let obj: Pick<PksCurahBankEntity, 'file_rekbank'> = {
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