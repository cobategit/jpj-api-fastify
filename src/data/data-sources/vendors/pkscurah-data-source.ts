import { DataManipulationLanguage, DataQueryLanguage, IPksCurahDataSource } from "../..";
import { ParamsEntity, PksCurahEntity } from "../../../domain";

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
            `insert into ${process.env.TABLE_VENDOR} (vendor_code, vendor_name, vendor_address, active, entry_date, stockpile_id, pic, phone_pic, file_npwp, file_pkp, file_rek_bank, curah) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [data?.vendor_code, data?.vendor_name, data?.vendor_address, data?.active, data?.entry_date, data?.stockpile_id, data?.pic, data?.phone_pic, data?.file_npwp, data?.file_pkp, data?.file_rek_bank, data?.curah]
        )

        return res
    }

    async update(id?: number, data?: PksCurahEntity): Promise<any> {
        const res = await this.dml.dataManipulation(
            `update pengajuan ${data?.curah}`,
            `update ${process.env.TABLE_VENDOR} set vendor_name = ?, vendor_address = ?, pic = ?, phone_pic = ?, file_npwp = ?, file_pkp = ?, file_rek_bank = ? where vendor_id = ?`,
            [data?.vendor_name, data?.vendor_address, data?.pic, data?.phone_pic, data?.file_npwp, data?.file_pkp, data?.file_rek_bank, id!]
        )

        return res
    }

    async selectAll(conf: ParamsEntity): Promise<PksCurahEntity[]> {
        let where = ``;
        if (conf.vendor_type == 'pks') where = `where curah = 0`
        if (conf.vendor_type == 'curah') where = `where curah = 1`

        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_VENDOR} ${where} order by vendor_id desc limit ${conf.offset}, ${conf.limit}`, []
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

}