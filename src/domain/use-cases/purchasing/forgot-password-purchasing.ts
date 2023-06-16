import { AppError, sendEmail } from "@jpj-common/module";
import { IForgotPasswordPurchasingUseCase, IPurchasingRepo } from "../../interfaces";
import { IUsersDataSource } from "../../../data";
import bcryptjs from 'bcryptjs'
import { generatePassword } from "../../../external";
import { HttpResponse, OptionsEmail, TranspoterOptions } from "../../entity";

export class ForgotPasswordPurchasingUseCase implements IForgotPasswordPurchasingUseCase {
    private purchasingRepo: IPurchasingRepo
    private userDataSource: IUsersDataSource

    constructor(purchasingRepo: IPurchasingRepo, userDataSource: IUsersDataSource) {
        this.purchasingRepo = purchasingRepo
        this.userDataSource = userDataSource
    }

    async execute(deviced_id?: string, email?: string): Promise<any> {
        try {
            const result = new Map<string, boolean | HttpResponse>()
            const checkDevicedId = await this.userDataSource.selectByDeviceId(deviced_id!);
            const checkEmail = await this.userDataSource.selectByEmail(email!);

            if (!checkDevicedId) {
                result.set('error', true)
                result.set('dataError', {
                    status: false,
                    message: 'Data deviced id tidak ada'
                })
                return result
            }

            if (!checkEmail) {
                result.set('error', true)
                result.set('dataError', {
                    status: false,
                    message: 'Data email tidak ada'
                })
                return result
            }

            let genPass = await generatePassword();

            let topsEmail: TranspoterOptions = {
                host: process.env.EMAIL_HOST,
                port: Number(process.env.EMAIL_PORT),
                auth: {
                    user: process.env.EMAIL_USER_AUTH,
                    pass: process.env.EMAIL_PASS_AUTH
                }
            }
            let optsEmail: OptionsEmail = {
                from: process.env.EMAIL_USER_AUTH,
                to: email,
                subject: 'Perubahan Password By System Automation',
                html: `<p>Berikut password baru anda: <b>${genPass}</b></p>`
            }

            await sendEmail(optsEmail, topsEmail)

            let saltPass = await bcryptjs.genSalt(5)
            let hashPass = await bcryptjs.hash(genPass, saltPass)
            const res = await this.purchasingRepo.updateKodeAksesUser(deviced_id!, hashPass!)

            result.set('dataSuccess', {
                status: true,
                message: 'Cek email anda untuk melakukan perubahan password',
                data: res
            })
            return result
        } catch (error) {
            throw new AppError(500, false, `${error}`, '5001')
        }
    }
}