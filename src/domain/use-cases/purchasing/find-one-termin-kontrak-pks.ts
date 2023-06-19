import { AppError } from "@jpj-common/module";
import { HttpResponse, ParamsEntity, PurchasingDetailEntity } from "../../entity";
import { IFindOneTerminKontrakPksUseCase, IPurchasingRepo } from "../../interfaces";

export class FindOneTerminKontrakPksUseCase implements IFindOneTerminKontrakPksUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id?: number | undefined): Promise<Map<string, HttpResponse>> {
        try {
            const result = new Map<string, HttpResponse>()
            const obj = new Map<string, Pick<ParamsEntity, 'columnKey' | 'columnValue'>>()
            obj.set('data', {
                columnKey: 'purchasing_detail_id',
                columnValue: id
            })
            const res = await this.purchasingRepo.findOneDynamicPurchasingDetail(obj.get('data'))

            if (res.length == 0) {
                result.set('dataError', {
                    status: false,
                    message: "Data kosong"
                })
                return result
            }

            result.set('dataSuccess', {
                status: true,
                message: "Data ditemukan",
                data: res[0]
            })
            return result
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}