import { AppError } from "@jpj-common/module";
import { IChangedPasswordPurchasingUseCase, IPurchasingRepo } from "../../interfaces";
import { IUsersDataSource } from "../../../data";
import bcryptjs from 'bcryptjs'

export class ChangedPasswordPurchasingUseCase implements IChangedPasswordPurchasingUseCase {
    private purchasingRepo: IPurchasingRepo
    private userDataSource: IUsersDataSource

    constructor(purchasingRepo: IPurchasingRepo, userDataSource: IUsersDataSource) {
        this.purchasingRepo = purchasingRepo
        this.userDataSource = userDataSource
    }

    async execute(deviced_id?: string, current_password?: string, new_password?: string | undefined): Promise<any> {
        try {
            let checkDevicedId = await this.userDataSource.selectByDeviceId(deviced_id!);
            let comparePassword = await bcryptjs.compare(
                `${current_password!}`,
                `${checkDevicedId?.kode_akses!}`
            )

            if (checkDevicedId == null || !checkDevicedId) {
                return { checkDevicedId: true }
            }

            if (!comparePassword) {
                return { checkComparePassword: true }
            }

            let saltPass = await bcryptjs.genSalt(5)
            let hashPass = await bcryptjs.hash(new_password!, saltPass)
            const res = await this.purchasingRepo.updateKodeAksesUser(deviced_id!, hashPass!)

            return { updatedPassword: res }
        } catch (error) {
            throw new AppError(500, false, `${error}`, '5001')
        }
    }
}