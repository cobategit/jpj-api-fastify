import { DataManipulationLanguage, DataQueryLanguage, IFreighDataSource } from "../..";
import { FreightEntity } from "../../../domain";

export class FreightDataSource implements IFreighDataSource {
    private dml: DataManipulationLanguage
    private dql: DataQueryLanguage

    constructor(dml: DataManipulationLanguage, dql: DataQueryLanguage) {
        this.dml = dml
        this.dql = dql
    }
    async count(): Promise<any> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select count(1) as count from ${process.env.TABLE_FREIGHT}`,
            []
        )

        return rows[0]
    }
    async insert(data?: FreightEntity): Promise<any> {
        const res = await this.dml.dataManipulation(
            `insert pengajuan freight`,
            `insert into ${process.env.TABLE_FREIGHT} (freight_code, freight_supplier, freight_address, active, pic, phone_pic, id_user_stockpile, file_npwp, file_pkp, file_rek_bank, file_ktp) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
            [data?.freight_code, data?.freight_supplier, data?.freight_address, data?.active, data?.pic, data?.phone_pic, data?.id_user_stockpile, data?.file_npwp, data?.file_pkp, data?.file_rek_bank, data?.file_ktp]
        )

        return res
    }
    async update(id?: number | undefined, data?: FreightEntity | undefined): Promise<any> {
        const res = await this.dml.dataManipulation(
            `update pengajuan freight`,
            `update ${process.env.TABLE_FREIGHT} set freight_supplier = ?, freight_address = ?, pic = ?, phone_pic = ?, file_npwp = ?, file_pkp = ?, file_rek_bank = ? where freight_id = ?`,
            [data?.freight_supplier, data?.freight_address, data?.pic, data?.phone_pic, data?.file_npwp, data?.file_pkp, data?.file_rek_bank, id!]
        )

        return res
    }
    async selectAll(conf: any): Promise<FreightEntity[]> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_FREIGHT} order by freight_id desc limit ${conf.offset}, ${conf.limit}`, []
        )
        return rows
    }
    async selectOne(id?: number | undefined): Promise<FreightEntity> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_FREIGHT} where freight_id = ?`,
            [id]
        )

        return rows[0]
    }
}