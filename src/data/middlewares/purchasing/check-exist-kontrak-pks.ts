import { AppError } from "@jpj-common/module";
import { IPurchasingDataSource } from "../../interfaces";
import { ParamsEntity } from "../../../domain";

export function CheckExistKontrakPks(purchasingDataSource: IPurchasingDataSource, req: any, rep: any, done: any) {
    const check = async (req: any, rep: any, done: any): Promise<void> => {
        let reEntry = req.query.re_entry
        const { stockpile_id, contract_type, vendor_id, type, quantity, price } = req.body
        try {
            const conf: Pick<ParamsEntity, 'whereKey' | 'whereValue'> = {
                whereKey: `where stockpile_id = ? and contract_type = ? and vendor_id = ? and type = ?  and quantity = ? and price = ?`,
                whereValue: [stockpile_id, contract_type, vendor_id, type, quantity, price]
            }

            const checkExistKontrakPks = await purchasingDataSource.selectWhereDynamic(conf)

            if (checkExistKontrakPks && !reEntry) {
                done(new AppError(400, true, 'Data sudah ada, Apa anda ingin melanjutkan input data ini ?', '401'))
            }

        } catch (error) {
            throw new AppError(403, false, `${error}`, '401')
        }
    }

    const result = check(req, rep, done)

    return result
}