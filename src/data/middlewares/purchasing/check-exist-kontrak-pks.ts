import { AppError } from "@jpj-common/module";
import { IPurchasingDataSource } from "../../interfaces";
import { ParamsEntity } from "../../../domain";

export function CheckExistKontrakPks(purchasingDataSource: IPurchasingDataSource, req: any, rep: any, done: any) {
    const check = async (req: any, rep: any, done: any): Promise<void> => {
        const reEntry: boolean = Boolean(req.query.re_entry) || false
        try {
            const conf: Pick<ParamsEntity, 'whereKey' | 'whereValue'> = {
                whereKey: `where stockpile_id = ? and contract_type = ? and vendor_id = ? and type = ? and payment_type = ? and quantity = ? and price = ?`,
                whereValue: [req.body.stockpile_id, req.body.contract_type, req.body.vendor_id, req.body.type, req.body.payment_type, req.body.quantity, req.body.price]
            }

            const checkExistKontrakPks = await purchasingDataSource.selectWhereDynamic(conf)

            if (checkExistKontrakPks && !reEntry) {
                done(new AppError(400, false, 'Data sudah ada, Apa anda ingin melanjutkan input data ini ?', '401'))
            }
        } catch (error) {
            throw new AppError(403, false, `${error}`, '401')
        }
    }

    const result = check(req, rep, done)

    return result
}