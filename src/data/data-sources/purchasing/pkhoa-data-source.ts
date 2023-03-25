import { DataManipulationLanguage, DataQueryLanguage } from "../..";
import { PkhoaEntity } from "../../../domain";
import { IPkhoaDataSource } from "../../interfaces/purchasing";

export class PkhoaDataSource implements IPkhoaDataSource {
    private dml: DataManipulationLanguage
    private dql: DataQueryLanguage

    constructor(dml: DataManipulationLanguage, dql: DataQueryLanguage) {
        this.dml = dml
        this.dql = dql
    }

    async count(): Promise<any> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select count(1) as count from ${process.env.TABLE_FREIGHT_COST}`,
            []
        )

        return rows[0]
    }

    async insert(data?: PkhoaEntity | undefined): Promise<any> {
        const res = await this.dml.dataManipulation(
            `insert pengajuan PKHOA`,
            `insert into ${process.env.TABLE_FREIGHT_COST} 
            (contract_pkhoa, freight_id, stockpile_id, vendor_id, currency_id, exchange_rate, price, price_converted, payment_notes, company_id, remarks, shrink_tolerance_kg, shrink_tolerance_persen, shrink_claim, active_from, file1, status, modify_by, modify_date, entry_by, entry_date, cara_pembayaran) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [data?.contract_pkhoa, data?.freight_id, data?.stockpile_id, data?.vendor_id, data?.currency_id, data?.exchange_rate, data?.price, data?.price_converted, data?.payment_notes, data?.company_id, data?.remarks, data?.shrink_tolerance_kg, data?.shrink_tolerance_persen, data?.shrink_claim, data?.active_from, data?.file, data?.status, data?.modify_by, data?.modify_date, data?.entry_by, data?.entry_date, data?.cara_pembayaran]
        )

        return res
    }

    async update(id?: number | undefined, data?: PkhoaEntity | undefined): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async selectAll(conf: any): Promise<PkhoaEntity[]> {
        throw new Error("Method not implemented.");
    }

    async selectOne(id?: number | undefined): Promise<PkhoaEntity> {
        throw new Error("Method not implemented.");
    }

}