import { ApiResponse, AppError } from '@jpj-common/module'
import { IPengajuanPksCurahUseCase, PksCurahEntity } from '../../../domain'
import { IPengajuanPksCurahHandler } from '../../interfaces'
import { format } from 'date-fns'
import path from 'path'

export class PengajuanPksCurahHandler implements IPengajuanPksCurahHandler {
    private pengajuanPksCurahUseCase: IPengajuanPksCurahUseCase

    constructor(pengajuanPksCurahUseCase: IPengajuanPksCurahUseCase) {
        this.pengajuanPksCurahUseCase = pengajuanPksCurahUseCase
    }

    async execute(request: any, reply: any): Promise<void> {
        try {
            const data: PksCurahEntity = request.body
            data.stockpile_id = request.user.user_id
            data.entry_date = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`
            data.active = 2

            if (request.files['file_npwp']) {
                data!.file_npwp = `${process.env.URL_FILE}/purchasing/${request.files['file_npwp'][0].filename}`
            }
            if (request.files['file_pkp']) {
                data!.file_pkp = `${process.env.URL_FILE}/purchasing/${request.files['file_pkp'][0].filename}`
            }
            if (request.files['file_rek_bank']) {
                data!.file_rek_bank = `${process.env.URL_FILE}/purchasing/${request.files['file_rek_bank'][0].filename}`
            }

            const res = await this.pengajuanPksCurahUseCase.execute(data)

            return ApiResponse.created(request, reply, {
                success: true,
                message: `Data pengajuan vendor berhasil diinput ${data.curah}`,
                id: res[0].insertId,
            })
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}
