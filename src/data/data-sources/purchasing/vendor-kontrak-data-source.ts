import { DataManipulationLanguage, DataQueryLanguage } from "../..";
import { ParamsEntity, VendorKontrakEntity } from "../../../domain";
import { IVendorKontrakDataSource } from "../../interfaces/purchasing";

export class VendorKontrakDataSource implements IVendorKontrakDataSource {
    private dml: DataManipulationLanguage
    private dql: DataQueryLanguage

    constructor(dml: DataManipulationLanguage, dql: DataQueryLanguage) {
        this.dml = dml
        this.dql = dql
    }

    async count(): Promise<any> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select count(1) as count from ${process.env.TABLE_VENDOR_KONTRAK}`,
            []
        )

        return rows[0]
    }

    async insert(data?: VendorKontrakEntity | undefined): Promise<any> {
        const res = await this.dml.dataManipulation(
            `insert purchasing`,
            `insert into ${process.env.TABLE_VENDOR_KONTRAK} 
            (freight_cost_id, po_pks_id, stockpile_contract_id, quantity, stockpile_quantity, status, entry_by, entry_date) 
            VALUES (?,?,?,?,?,?,?,?)`,
            [data?.freight_cost_id, data?.po_pks_id, data?.stockpile_contract_id, data?.quantity, data?.stockpile_quantity, data?.status, data?.entry_by, data?.entry_date]
        )

        return res
    }

    async bulkInsert(data?: VendorKontrakEntity[] | undefined): Promise<any> {
        const res = await this.dml.dataManipulation(
            `insert purchasing`,
            `insert into ${process.env.TABLE_VENDOR_KONTRAK} 
            (freight_cost_id, po_pks_id, stockpile_contract_id, quantity, stockpile_quantity, status, entry_by, entry_date) 
            VALUES (?)`,
            [data!]
        )

        return res
    }

    async update(id?: number | undefined, data?: VendorKontrakEntity | undefined): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async selectAll(conf: any): Promise<VendorKontrakEntity[]> {
        let limit = ''

        if (conf.offset || conf.limit) limit = `limit ${conf.offset}, ${conf.limit}`
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_VENDOR_KONTRAK} ${limit}`, []
        )

        return rows
    }

    async selectOne(id?: number | undefined): Promise<VendorKontrakEntity | null> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_VENDOR_KONTRAK} where vendor_contract_id = ?`,
            [id]
        )

        return rows[0]
    }

    async selectOneDynamic(conf?: Pick<ParamsEntity, 'tableCol1' | 'tableVal1'> | undefined): Promise<VendorKontrakEntity[]> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_VENDOR_KONTRAK} where ${conf?.tableCol1} = ?`,
            [conf?.tableVal1]
        )

        return rows
    }

    async delete(id?: number | undefined): Promise<any> {
        const res = await this.dml.dataManipulation(
            `delete vendor kontrak`,
            `delete from ${process.env.TABLE_VENDOR_KONTRAK} where po_pks_id = ?`,
            [id!]
        )

        return res
    }

}