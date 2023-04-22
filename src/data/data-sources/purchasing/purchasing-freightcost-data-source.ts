import { DataManipulationLanguage, DataQueryLanguage } from "../..";
import { ParamsEntity, PurchasingFreightCostEntity } from "../../../domain";
import { IPurchasingFreightCostDataSource } from "../../interfaces/purchasing";

export class PurchasingFreightCostDataSource implements IPurchasingFreightCostDataSource {
    private dml: DataManipulationLanguage
    private dql: DataQueryLanguage

    constructor(dml: DataManipulationLanguage, dql: DataQueryLanguage) {
        this.dml = dml
        this.dql = dql
    }

    async count(): Promise<any> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select count(1) as count from ${process.env.TABLE_PURCHASING_FREIGHTCOST}`,
            []
        )

        return rows[0]
    }

    async insert(data?: PurchasingFreightCostEntity | undefined): Promise<any> {
        const res = await this.dml.dataManipulation(
            `insert purchasing`,
            `insert into ${process.env.TABLE_PURCHASING_FREIGHTCOST} 
            (purchasing_id, freight_cost_id, entry_date) 
            VALUES (?,?,?)`,
            [data?.purchasing_id, data?.freight_cost_id, data?.entry_date]
        )

        return res
    }

    async bulkInsert(data?: PurchasingFreightCostEntity[] | undefined): Promise<any> {
        const res = await this.dml.dataManipulation(
            `insert purchasing`,
            `insert into ${process.env.TABLE_PURCHASING_FREIGHTCOST} 
            (purchasing_id, freight_cost_id, entry_date) 
            VALUES (?)`,
            [data!]
        )

        return res
    }

    async update(id?: number | undefined, data?: PurchasingFreightCostEntity | undefined): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async selectAll(conf: any): Promise<PurchasingFreightCostEntity[]> {
        let limit = ''

        if (conf.offset || conf.limit) limit = `limit ${conf.offset}, ${conf.limit}`
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_PURCHASING_FREIGHTCOST} ${limit}`, []
        )

        return rows
    }

    async selectOne(id?: number | undefined): Promise<PurchasingFreightCostEntity | null> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_PURCHASING_FREIGHTCOST} where id = ?`,
            [id]
        )

        return rows[0]
    }

    async selectOneDynamic(conf?: Pick<ParamsEntity, 'columnKey' | 'columnValue'> | undefined): Promise<PurchasingFreightCostEntity[]> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_PURCHASING_FREIGHTCOST} where ${conf?.columnKey} = ?`,
            [conf?.columnValue]
        )

        return rows
    }

    async delete(id?: number | undefined): Promise<any> {
        const res = await this.dml.dataManipulation(
            `delete purchasing freight cost`,
            `delete from ${process.env.TABLE_PURCHASING_FREIGHTCOST} where purchasing_id = ?`,
            [id!]
        )

        return res
    }

}