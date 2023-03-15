import { ApiResponse, AppError } from "@jpj-common/module";
import { IPengajuanPksCurahUseCase, PksCurahEntity } from "../../../domain";
import { IPengajuanPksCurahHandler } from "../../interfaces";

export class PengajuanPksCurahHandler implements IPengajuanPksCurahHandler {
    private pengajuanPksCurahUseCase: IPengajuanPksCurahUseCase

    constructor(pengajuanPksCurahUseCase: IPengajuanPksCurahUseCase) {
        this.pengajuanPksCurahUseCase = pengajuanPksCurahUseCase
    }

    async execute(request: any, reply: any): Promise<void> {
        try {
            const data: PksCurahEntity = request.body

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