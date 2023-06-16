import { AppError } from "@jpj-common/module";
import { ParamsEntity, PurchasingDetailEntity } from "../../entity";
import { IFindOneTerminKontrakPksUseCase, IPurchasingRepo } from "../../interfaces";

export class FindOneTerminKontrakPksUseCase implements IFindOneTerminKontrakPksUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id?: number | undefined): Promise<PurchasingDetailEntity[] | []> {
        try {
            const obj = new Map<string, Pick<ParamsEntity, 'columnKey' | 'columnValue'>>()
            obj.set('data', {
                columnKey: 'purchasing_detail_id',
                columnValue: id
            })
            const res = await this.purchasingRepo.findOneDynamicPurchasingDetail(obj.get('data'))
            return res
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}