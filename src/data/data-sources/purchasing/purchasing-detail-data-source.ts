import { DataManipulationLanguage, DataQueryLanguage, IPurchasingDetailDataSource } from "../..";
import { ParamsEntity, PurchasingDetailEntity } from "../../../domain";

export class PurchasingDetailDataSource implements IPurchasingDetailDataSource {
    private dql: DataQueryLanguage
    private dml: DataManipulationLanguage

    constructor(dml: DataManipulationLanguage, dql: DataQueryLanguage) {
        this.dml = dml
        this.dql = dql
    }

    async count(): Promise<any> {
        const [rows, fileds] = await this.dql.dataQueryLanguage(
            `select count(1) as count from ${process.env.TABLE_PURCHASING_DETAIL}`,
            []
        )

        return rows[0]
    }

    async insert(data?: PurchasingDetailEntity | undefined): Promise<any> {
        const res = await this.dml.dataManipulation(
            `insert purchasing detail`,
            `insert into ${process.env.TABLE_PURCHASING_DETAIL}
            (purchasing_id, quantity_payment, entry_date, entry_by, payment_date, payment_type, contract_id, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [data?.purchasing_id, data?.quantity_payment, data?.entry_date, data?.entry_by, data?.payment_date, data?.payment_type, data?.contract_id, data?.status]
        )

        return res
    }

    async selectOneDynamic(conf?: Pick<ParamsEntity, "columnKey" | "columnValue"> | undefined): Promise<PurchasingDetailEntity[] | []> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_PURCHASING_DETAIL} where ${conf?.columnKey} = ?`,
            [conf?.columnValue]
        )

        return rows
    }

    async update(id?: number | undefined, data?: PurchasingDetailEntity | undefined): Promise<any> {
        const res = await this.dml.dataManipulation(
            `update purchasing detail`,
            `update ${process.env.TABLE_PURCHASING_DETAIL} set quantity_payment = ?, payment_type = ?, entry_by = ? where purchasing_detail_id = ?`,
            [data?.quantity_payment, data?.payment_type, data?.entry_by, id!]
        )

        return res
    }

    async delete(id?: number | undefined): Promise<any> {
        const res = await this.dml.dataManipulation(
            `delete purchasing detail`,
            `delete from ${process.env.TABLE_PURCHASING_DETAIL} where purchasing_detail_id = ?`,
            [id!]
        )

        return res
    }

}