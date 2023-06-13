import { format } from "date-fns";
import { HttpResponse, ParamsEntity, TypePengajuanKontrakPks } from "../../entity";
import { IAddTerminKontrakPksUseCase, IPurchasingRepo } from "../../interfaces";

export class AddTerminKontrakPksUseCase implements IAddTerminKontrakPksUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(data?: TypePengajuanKontrakPks | undefined): Promise<any> {
        const result = new Map<string, string | number | boolean | HttpResponse>()
        const dataCheckQuantityTermin = new Map<string, Pick<TypePengajuanKontrakPks, 'purchasing_id'>>()
        const paramsLastDataTermin = new Map<string, Pick<ParamsEntity, 'columnKey' | 'columnValue' | 'options'>>()

        paramsLastDataTermin.set('data', {
            columnKey: 'purchasing_id',
            columnValue: data?.purchasing_id,
            options: 'order by purchasing_detail_id desc limit 1'
        })
        const lastDataTermin = await this.purchasingRepo.findOneDynamicPurchasingDetail(paramsLastDataTermin.get('data'))
        if (!lastDataTermin) {
            result.set('error', true)
            result.set('dataError', {
                status: false,
                message: 'Maaf tidak ada data purchasing, anda tidak bisa menambahkan termin'
            })
        }
        if (lastDataTermin.length > 0 && !lastDataTermin[0]?.admin_input_by) {
            result.set('error', true)
            result.set('dataError', {
                message: 'Maaf tidak bisa buat termin, termin terakhir belum di approved',
                status: false
            })
            return result
        }
        data!.termin = lastDataTermin[0]?.termin! + 1

        dataCheckQuantityTermin.set('data', {
            purchasing_id: data?.purchasing_id
        })
        const checkQuantityTermin = await this.purchasingRepo.checkQuantityTerminKontrakPks(undefined, dataCheckQuantityTermin.get('data'))
        const selisihQuantityTermin = Number(checkQuantityTermin.remain_quantity_termin) - Number(data?.quantity_payment)

        if (selisihQuantityTermin < 0) {
            result.set('error', true)
            result.set('dataError', {
                message: 'Quantity melebihi dari ketentuan',
                status: false
            })
            return result
        }

        data!.entry_date = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`
        const insert = await this.purchasingRepo.addTerminKontrakPks(data!)

        result.set('dataSuccess', {
            status: true,
            message: 'Insert termin kontrak pks berhasil',
            data: insert[0].insertId
        })
        return result
    }
}