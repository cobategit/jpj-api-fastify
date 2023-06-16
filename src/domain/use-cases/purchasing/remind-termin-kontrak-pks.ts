import { AppError } from "@jpj-common/module";
import { TypePengajuanKontrakPks } from "../../entity";
import { IPurchasingRepo, IRemindTerminKontrakPksUseCase } from "../../interfaces";

export class RemindTerminKontrakPksUseCase implements IRemindTerminKontrakPksUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingR: IPurchasingRepo) {
        this.purchasingRepo = purchasingR
    }

    async execute(id?: number | undefined): Promise<any> {
        try {
            const data = new Map<string, Pick<TypePengajuanKontrakPks, 'purchasing_id'>>()
            data.set('data', {
                purchasing_id: id
            })

            const res = await this.purchasingRepo.checkQuantityTerminKontrakPks(undefined, data.get('data'))

            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }

}