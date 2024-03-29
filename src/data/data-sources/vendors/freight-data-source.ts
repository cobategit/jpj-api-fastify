import { DataManipulationLanguage, DataQueryLanguage, IFreighDataSource } from "../..";
import { FreightBankEntity, FreightEntity, ParamsEntity } from "../../../domain";

export class FreightDataSource implements IFreighDataSource {
    constructor(private readonly dml: DataManipulationLanguage, private readonly dql: DataQueryLanguage) { }

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
            `insert into ${process.env.TABLE_FREIGHT} (freight_code, freight_supplier, freight_address, active, entry_date, pic, phone_pic, id_user_stockpile, file_npwp, file_pkp, file_ktp) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
            [data?.freight_code, data?.freight_supplier, data?.freight_address, data?.active, data?.entry_date, data?.pic, data?.phone_pic, data?.id_user_stockpile, data?.file_npwp, data?.file_pkp, data?.file_ktp]
        )

        return res
    }

    async insertBank(data?: FreightBankEntity): Promise<any> {
        const res = await this.dml.dataManipulation(
            `insert pengajuan bank freight`,
            `insert into ${process.env.TABLE_FREIGHT_BANK} (freight_id, bank_name, account_no, active, file_rekbank) VALUES (?,?,?,?,?)`,
            [data?.freight_id, data?.bank_name, data?.account_no, data?.active, data?.file_rekbank]
        )

        return res
    }

    async update(id?: number | undefined, data?: FreightEntity | undefined): Promise<any> {
        const res = await this.dml.dataManipulation(
            `update pengajuan freight`,
            `update ${process.env.TABLE_FREIGHT} set freight_supplier = ?, freight_address = ?, pic = ?, phone_pic = ?, file_npwp = ?, file_pkp = ?, file_ktp = ? where freight_id = ?`,
            [data?.freight_supplier, data?.freight_address, data?.pic, data?.phone_pic, data?.file_npwp, data?.file_pkp, data?.file_ktp, id!]
        )

        return res
    }

    async updateBank(id?: number, data?: FreightBankEntity): Promise<any> {
        const res = await this.dml.dataManipulation(
            `update pengajuan freight bank`,
            `update ${process.env.TABLE_FREIGHT_BANK} set bank_name = ?, account_no = ?, file_rekbank = ? where f_bank_id = ?`,
            [data?.bank_name, data?.account_no, data?.file_rekbank, id!]
        )

        return res
    }

    async selectAll(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search'>): Promise<FreightEntity[]> {
        let limit = ``
        let where = ``

        if (conf?.search) where = `where freight_supplier LIKE '%${conf.search}%'`
        if (conf?.limit || conf?.offset) limit = `limit ${conf.offset}, ${conf.limit}`
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_FREIGHT} ${where} order by freight_id desc ${limit}`, []
        )
        return rows
    }

    async selectAllBank(conf: any): Promise<FreightBankEntity[]> {
        let limit = ``

        if (conf.limit || conf.offset) limit = `limit ${conf.offset}, ${conf.limit}`
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_FREIGHT_BANK} order by f_bank_id desc ${limit}`, []
        )
        return rows
    }

    async selectOne(id?: number | undefined): Promise<FreightEntity | null> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_FREIGHT} where freight_id = ?`,
            [id]
        )

        return rows[0]
    }

    async selectBankByFreightId(id?: number[] | undefined): Promise<FreightBankEntity[]> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_FREIGHT_BANK} where freight_id IN (?)`,
            [id]
        )

        return rows
    }

    async delete(id?: number, active: number = 2): Promise<any> {
        const res = await this.dml.dataManipulation(
            `delete pengajuan freight`,
            `update ${process.env.TABLE_FREIGHT} set active = ? where freight_id = ? and active = ?`,
            [3, id!, active]
        )

        return res
    }
}