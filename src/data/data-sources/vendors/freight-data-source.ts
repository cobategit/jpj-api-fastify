import { DataManipulationLanguage, DataQueryLanguage, IFreighDataSource } from "../..";
import { FreightEntity } from "../../../domain";

export class FreightDataSource implements IFreighDataSource {
    private dml: DataManipulationLanguage
    private dql: DataQueryLanguage

    constructor(dml: DataManipulationLanguage, dql: DataQueryLanguage) {
        this.dml = dml
        this.dql = dql
    }

    async insert(data?: FreightEntity): Promise<any> {
        const res = await this.dml.dataManipulation(
            `insert pengajuan freight`,
            `insert into ${process.env.TABLE_FREIGHT} (freight_code, freight_supplier, freight_address, active, id_user_stockpile, file_npwp, file_pkp, file_rek_bank, file_ktp) VALUES (?,?,?,?,?,?,?,?,?)`,
            [data?.freight_code, data?.freight_supplier, data?.freight_address, data?.active, data?.id_user_stockpile, data?.file_npwp, data?.file_pkp, data?.file_rek_bank, data?.file_ktp]
        )

        return res
    }
}