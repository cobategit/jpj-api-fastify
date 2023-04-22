import { AppError } from "@jpj-common/module";
import { ParamsEntity, PkhoaEntity } from "../../entity";
import { IUpdatePkhoaUseCase, IPurchasingRepo } from "../../interfaces";

export class UpdatePkhoaUseCase implements IUpdatePkhoaUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id: number, user_id: number, data?: PkhoaEntity | undefined): Promise<any> {
        let res: Record<string, any> = {}
        let cantUpdated: boolean = false
        const conf: Pick<ParamsEntity, 'columnKey' | 'columnValue'> = {
            columnKey: 'freight_cost_id',
            columnValue: id
        }

        try {
            const checkInVendorKontrak = await this.purchasingRepo.findOneVendorKontrakDynamic(conf)

            if (checkInVendorKontrak.length > 0) {
                cantUpdated = true
            } else {
                res = await this.purchasingRepo.updatePkhoa(id, user_id, data)
            }

            return { checkUpdated: cantUpdated, update: res }
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}