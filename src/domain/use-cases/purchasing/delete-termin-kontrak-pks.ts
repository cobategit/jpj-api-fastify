import { HttpResponse, ParamsEntity } from "../../entity";
import { IDeleteTerminKontrakPksUseCase, IPurchasingRepo } from "../../interfaces";


export class DeleteTerminKontrakPksUseCase implements IDeleteTerminKontrakPksUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(id?: number | undefined, user_id?: number | undefined): Promise<any> {
        const result = new Map<string, string | number | boolean | HttpResponse>()
        const paramsAllowDelet = new Map<String, Pick<ParamsEntity, 'columnKey' | 'columnValue'>>()

        paramsAllowDelet.set('data', {
            columnKey: 'purchasing_detail_id',
            columnValue: id!
        })
        const allowDelet = await this.purchasingRepo.findOneDynamicPurchasingDetail(paramsAllowDelet.get('data'))

        if (allowDelet[0].contract_id || allowDelet[0]?.status != 0 || allowDelet[0]?.admin_input_by) {
            result.set('error', true)
            result.set('dataError', {
                status: false,
                message: 'Delete termin tidak bisa, cek kembali status termin, atau tanya kepada HO'
            })
            paramsAllowDelet.delete('data')
            return result
        }

        const delet = await this.purchasingRepo.deleteTerminKontrakPks(id, user_id)

        result.set('dataSuccess', {
            status: true,
            message: 'Delete termin berhasil',
            id: delet[0].changedRows
        })

        return result
    }
}