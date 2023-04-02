import { DataManipulationLanguage, DataQueryLanguage, IPksCurahDataSource } from "../..";
import { ParamsEntity, PksCurahBankEntity, PksCurahEntity } from "../../../domain";

export class PksCurahDataSource implements IPksCurahDataSource {
    private dml: DataManipulationLanguage
    private dql: DataQueryLanguage

    constructor(dml: DataManipulationLanguage, dql: DataQueryLanguage) {
        this.dml = dml
        this.dql = dql
    }

    async count(): Promise<any> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select count(1) as count from ${process.env.TABLE_VENDOR}`,
            []
        )

        return rows[0]
    }

    async insert(data?: PksCurahEntity): Promise<any> {
        const res = await this.dml.dataManipulation(
            `insert pengajuan ${data?.curah}`,
            `insert into ${process.env.TABLE_VENDOR} (vendor_code, vendor_name, vendor_address, active, entry_date, stockpile_id, pic, phone_pic, file_npwp, file_pkp, curah, notes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [data?.vendor_code, data?.vendor_name, data?.vendor_address, data?.active, data?.entry_date, data?.stockpile_id, data?.pic, data?.phone_pic, data?.file_npwp, data?.file_pkp, data?.curah, data?.notes]
        )

        return res
    }

    async insertBank(data?: PksCurahBankEntity): Promise<any> {
        const res = await this.dml.dataManipulation(
            `insert pengajuan bank pkscurah`,
            `insert into ${process.env.TABLE_VENDOR_BANK} (vendor_id, bank_name, account_no, active, file_rekbank) VALUES (?,?,?,?,?)`,
            [data?.vendor_id, data?.bank_name, data?.account_no, data?.active, data?.file_rekbank]
        )

        return res
    }

    async update(id?: number, data?: PksCurahEntity): Promise<any> {
        const res = await this.dml.dataManipulation(
            `update pengajuan ${data?.curah}`,
            `update ${process.env.TABLE_VENDOR} set vendor_name = ?, vendor_address = ?, pic = ?, phone_pic = ?, file_npwp = ?, file_pkp = ?, notes = ? where vendor_id = ?`,
            [data?.vendor_name, data?.vendor_address, data?.pic, data?.phone_pic, data?.file_npwp, data?.file_pkp, data?.notes, id!]
        )

        return res
    }

    async updateBank(id?: number, data?: PksCurahBankEntity): Promise<any> {
        const res = await this.dml.dataManipulation(
            `update pengajuan pkscurah bank`,
            `update ${process.env.TABLE_VENDOR_BANK} set bank_name = ?, account_no = ?, file_rekbank = ? where vendor_id = ?`,
            [data?.bank_name, data?.account_no, data?.file_rekbank, id!]
        )

        return res
    }

    async selectAll(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search' | 'vendor_type'>): Promise<PksCurahEntity[]> {
        let where = ``
        let limit = ``

        if (conf?.search) {
            where = `where vendor_name Like '%${conf.search}%'`
        } else if (conf?.vendor_type == 'pks') {
            if (!conf.search) {
                where = `where curah = 0 and (vendor_name Like '%${conf.search}%')`
            }
            where = `where curah = 0`
        } else if (conf?.vendor_type == 'curah') {
            if (!conf.search) {
                where = `where curah = 1 and (vendor_name Like '%${conf.search}%')`
            }
            where = `where curah = 1`
        }

        if (conf?.limit || conf?.offset) limit = `limit ${conf.offset}, ${conf.limit}`

        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_VENDOR} ${where} order by vendor_id desc ${limit}`, []
        )
        return rows
    }

    async selectAllBank(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search'> | undefined): Promise<PksCurahBankEntity[]> {
        let limit = ``

        if (conf!.limit || conf!.offset) limit = `limit ${conf!.offset}, ${conf!.limit}`
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_VENDOR_BANK} order by v_bank_id desc ${limit}`, []
        )
        return rows
    }

    async selectBankByPksCurahId(id?: number[] | undefined, conf?: Record<string, any> | undefined): Promise<PksCurahBankEntity[]> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_VENDOR_BANK} where vendor_id IN (?)`,
            [id]
        )

        return rows
    }

    async selectOne(id?: number): Promise<PksCurahEntity> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_VENDOR} where vendor_id = ?`,
            [id]
        )

        return rows[0]
    }

    async delete(id?: number): Promise<any> {
        const res = await this.dml.dataManipulation(
            `delete pengajuan vendor`,
            `update ${process.env.TABLE_VENDOR} set active = ? where vendor_id = ?`,
            [3, id!]
        )

        return res
    }
}