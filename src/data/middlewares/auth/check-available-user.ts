import { AppError } from "@jpj-common/module";
import { IUsersDataSource } from "../..";
import { EntityUser } from "../../../domain";

export function CheckAvailableUser(userDataSource: IUsersDataSource, req: any, res: any, done: any) {
    const checkUser = async (req: any, res: any, done: any): Promise<void> => {
        try {
            const dataToken: EntityUser = req.user!
            const checkAvailableUser = await userDataSource.selectByEmail(dataToken.user_email!)

            if (checkAvailableUser == null || checkAvailableUser?.deviced_id == null) {
                done(new AppError(404, false, `Data anda tidak ada`, '401'))
            }
        } catch (error) {
            throw new AppError(403, false, `${error}`, '401')
        }
    }

    const result = checkUser(req, res, done)

    return result
}