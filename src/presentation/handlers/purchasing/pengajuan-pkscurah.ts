import { ApiResponse, AppError } from "@jpj-common/module";
import { IPengajuanPksCurahUseCase, PksCurahEntity } from "../../../domain";
import { IPengajuanPksCurahHandler } from "../../interfaces";
import { format } from 'date-fns'
import path from 'path'

export class PengajuanPksCurahHandler implements IPengajuanPksCurahHandler {
    private pengajuanPksCurahUseCase: IPengajuanPksCurahUseCase

    constructor(pengajuanPksCurahUseCase: IPengajuanPksCurahUseCase) {
        this.pengajuanPksCurahUseCase = pengajuanPksCurahUseCase
    }

    async execute(request: any, reply: any): Promise<void> {
        try {
            const data: PksCurahEntity = request.body!

            if ((request).files['file_npwp']) {
                const fileName = 'npwp' + data?.vendor_code + '-' + `${format(new Date(), 'MMmmss')}` + path.extname(request.files[0].originalname)
                data!.file_npwp = `${process.env.URL_FILE}/purchasing/${data?.kategori_file}/${data?.type_file}/${fileName}`
            }
            if (request.files['file_pkp']!) {
                const fileName = 'pkp-' + data?.vendor_code + '-' + `${format(new Date(), 'MMmmss')}` + path.extname(request.files[0].originalname)
                data!.file_pkp = `${process.env.URL_FILE}/purchasing/${data?.kategori_file}/${data?.type_file}/${fileName}`
            }
            if (request.files['file_npwp']) {
                const fileName = 'rek-bank-' + data?.vendor_code + '-' + `${format(new Date(), 'MMmmss')}` + path.extname(request.files[0].originalname)
                data!.file_rek_bank = `${process.env.URL_FILE}/purchasing/${data?.kategori_file}/${data?.type_file}/${fileName}`
            }

            const res = await this.pengajuanPksCurahUseCase.execute(data)

            return ApiResponse.created(request, reply, {
                success: true,
                message: `Data pengajuan vendor berhasil diinput ${data.curah}`,
                changed: res[0].insertId,
            })
        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }
}