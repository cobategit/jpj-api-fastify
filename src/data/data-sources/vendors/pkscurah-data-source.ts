import { DataManipulationLanguage, DataQueryLanguage, IPksCurahDataSource } from "../..";
import { PksCurahEntity } from "../../../domain";

export class PksCurahDataSource implements IPksCurahDataSource {
    private dml: DataManipulationLanguage
    private dql: DataQueryLanguage

    constructor(dml: DataManipulationLanguage, dql: DataQueryLanguage) {
        this.dml = dml
        this.dql = dql
    }

    async insert(data?: PksCurahEntity): Promise<any> {
        const res = await this.dml.dataManipulation(
            `insert pengajuan ${data?.curah}`,
            `insert into ${process.env.TABLE_VENDOR} (vendor_code, vendor_name, vendor_address, active, entry_date, stockpile_id, file_npwp, file_pkp, file_rek_bank, curah) VALUES (?,?,?,?,?,?,?,?,?,?)`,
            [data?.vendor_code, data?.vendor_name, data?.vendor_address, data?.active, data?.entry_date, data?.stockpile_id, data?.file_npwp, data?.file_pkp, data?.file_rek_bank, data?.curah]
        )

        return res
    }

    async selectAll(): Promise<PksCurahEntity[]> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_VENDOR} limit 10`, []
        )
        return rows
    }
}