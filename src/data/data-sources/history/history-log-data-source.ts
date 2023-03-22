import { DataManipulationLanguage, DataQueryLanguage, IHistoryLogDataSource } from "../..";
import { HistoryLogEntity } from "../../../domain";

export class HistoryLogDataSource implements IHistoryLogDataSource {
    private dml: DataManipulationLanguage
    private dql: DataQueryLanguage

    constructor(dml: DataManipulationLanguage, dql: DataQueryLanguage) {
        this.dml = dml
        this.dql = dql
    }

    async insert(data?: HistoryLogEntity | undefined): Promise<any> {
        const res = await this.dml.dataManipulation(
            `insert history log`,
            `insert into ${process.env.TABLE_HISTORY_LOG} (tanggal, transaksi, cud, isitransaksi_lama, isitransaksi_baru, user_id) VALUES (?,?,?,?,?,?)`,
            [data?.tanggal, data?.transaksi, data?.cud, data?.isitransaksi_lama, data?.isitransaksi_baru, data?.user_id]
        )

        return res
    }
}