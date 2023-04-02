import { DataManipulationLanguage, DataQueryLanguage } from "../..";
import { ParamsEntity, PurchasingEntity } from "../../../domain";
import { IPurchasingDataSource } from "../../interfaces/purchasing";

export class PurchasingDataSource implements IPurchasingDataSource {
    private dml: DataManipulationLanguage
    private dql: DataQueryLanguage

    constructor(dml: DataManipulationLanguage, dql: DataQueryLanguage) {
        this.dml = dml
        this.dql = dql
    }

    async count(): Promise<any> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select count(1) as count from ${process.env.TABLE_PURCHASING}`,
            []
        )

        return rows[0]
    }

    async insert(data?: PurchasingEntity | undefined): Promise<any> {
        const res = await this.dml.dataManipulation(
            `insert purchasing`,
            `insert into ${process.env.TABLE_PURCHASING} 
            (stockpile_id, contract_type, vendor_id, upload_file, approval_file, upload_file1, upload_file2, upload_file3, upload_file4, entry_by, entry_date, quantity, price, ppn, freight, freight_cost_id, admin_input, status, company, ho, link, payment_id, payment_type, plan_payment_date, type, logbook_status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [data?.stockpile_id, data?.contract_type, data?.vendor_id, data?.upload_file, data?.approval_file, data?.upload_file1, data?.upload_file2, data?.upload_file3, data?.upload_file4, data?.entry_by, data?.entry_date, data?.quantity, data?.price, data?.ppn, data?.freight, data?.freight_cost_id, data?.admin_input, data?.status, data?.company, data?.ho, data?.link, data?.payment_id, data?.payment_type, data?.plan_payment_date, data?.type, data?.logbook_status]
        )

        return res
    }

    async update(id?: number | undefined, data?: PurchasingEntity | undefined): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async selectAll(conf: any): Promise<PurchasingEntity[]> {
        let limit = ''

        if (conf.offset || conf.limit) limit = `limit ${conf.offset}, ${conf.limit}`
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_PURCHASING} ${limit}`, []
        )

        return rows
    }

    async selectOne(id?: number | undefined): Promise<PurchasingEntity> {
        const [rows, fileds] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_PURCHASING} where purchasing_id = ?`,
            [id]
        )

        return rows[0]
    }

    async selectOneDynamic(conf?: Pick<ParamsEntity, 'tableCol1' | 'tableVal1'> | undefined): Promise<PurchasingEntity[]> {
        const [rows, fileds] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_PURCHASING} where ${conf?.tableCol1} = ?`,
            [conf?.tableVal1]
        )

        return rows
    }

}