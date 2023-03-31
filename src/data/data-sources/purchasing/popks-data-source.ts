import { DataManipulationLanguage, DataQueryLanguage } from "../..";
import { PoPksEntity } from "../../../domain";
import { IPoPksDataSource } from "../../interfaces/purchasing";

export class PoPksDataSource implements IPoPksDataSource {
    private dml: DataManipulationLanguage
    private dql: DataQueryLanguage

    constructor(dml: DataManipulationLanguage, dql: DataQueryLanguage) {
        this.dml = dml
        this.dql = dql
    }

    async count(): Promise<any> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select count(1) as count from ${process.env.TABLE_POPKS}`,
            []
        )

        return rows[0]
    }

    async insert(data?: PoPksEntity | undefined): Promise<any> {
        const res = await this.dml.dataManipulation(
            `insert purchasing`,
            `insert into ${process.env.TABLE_POPKS} 
            (contract_no, spb_no, stockpile_id, vendor_id, currency_id, exchange_rate, price, price_converted, quantity, po_status, lock_contract, notes, company_id, entry_by, entry_date, purchasing_id, final_status, notes2) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [data?.contract_no, data?.spb_no, data?.stockpile_id, data?.vendor_id, data?.currency_id, data?.exchange_rate, data?.price, data?.price_converted, data?.quantity, data?.po_status, data?.lock_contract, data?.notes, data?.company_id, data?.entry_by, data?.entry_date, data?.purchasing_id, data?.final_status, data?.notes2]
        )

        return res
    }

    async update(id?: number | undefined, data?: PoPksEntity | undefined): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async selectAll(conf: any): Promise<PoPksEntity[]> {
        let limit = ''

        if (conf.offset || conf.limit) limit = `limit ${conf.offset}, ${conf.limit}`
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_POPKS} ${limit}`, []
        )

        return rows
    }

    async selectOne(id?: number | undefined): Promise<PoPksEntity> {
        const [rows, fileds] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_POPKS} where po_pks_id = ?`,
            [id]
        )

        return rows[0]
    }

}