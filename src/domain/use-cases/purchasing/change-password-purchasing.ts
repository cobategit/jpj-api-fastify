import { AppError } from "@jpj-common/module";
import { IChangedPasswordPurchasingUseCase, IPurchasingRepo } from "../../interfaces";
import { IUsersDataSource } from "../../../data";
import bcryptjs from 'bcryptjs'
import { HttpResponse } from "../../entity";

export class ChangedPasswordPurchasingUseCase implements IChangedPasswordPurchasingUseCase {
    private purchasingRepo: IPurchasingRepo
    private userDataSource: IUsersDataSource

    constructor(purchasingRepo: IPurchasingRepo, userDataSource: IUsersDataSource) {
        this.purchasingRepo = purchasingRepo
        this.userDataSource = userDataSource
    }

    async execute(deviced_id?: string, current_password?: string, new_password?: string | undefined): Promise<any> {
        try {
            const result = new Map<string, boolean | HttpResponse>()
            let checkDevicedId = await this.userDataSource.selectByDeviceId(deviced_id!);
            let comparePassword = await bcryptjs.compare(
                `${current_password!}`,
                `${checkDevicedId?.kode_akses!}`
            )

            if (!checkDevicedId) {
                result.set('error', true)
                result.set('dataError', {
                    status: false,
                    message: 'Data deviced id anda tidak terdaftar'
                })
                return result
            }

            if (!comparePassword) {
                result.set('error', true)
                result.set('dataError', {
                    status: false,
                    message: 'Password yang dimasukkan salah'
                })
                return result
            }

            let saltPass = await bcryptjs.genSalt(5)
            let hashPass = await bcryptjs.hash(new_password!, saltPass)
            const res = await this.purchasingRepo.updateKodeAksesUser(deviced_id!, hashPass!)

            result.set('dataSuccess', {
                status: true,
                message: 'Update password berhasil',
                data: res
            })
            return result
        } catch (error) {
            return new AppError(500, false, `${error}`, '5001')
        }
    }
}