import { DataManipulationLanguage, DataQueryLanguage } from "../..";
import { CurrencyEntity } from "../../../domain";
import { ICurrencyDataSource } from "../../interfaces/purchasing";

export class CurrencyDataSource implements ICurrencyDataSource {
    private dml: DataManipulationLanguage
    private dql: DataQueryLanguage

    constructor(dml: DataManipulationLanguage, dql: DataQueryLanguage) {
        this.dml = dml
        this.dql = dql
    }

    async count(): Promise<any> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select count(1) as count from ${process.env.TABLE_CURRENCY}`,
            []
        )

        return rows[0]
    }

    async insert(data?: CurrencyEntity | undefined): Promise<any> {
        const res = await this.dml.dataManipulation(
            `insert currency`,
            `insert into ${process.env.TABLE_CURRENCY} 
            () 
            VALUES ()`,
            []
        )

        return res
    }

    async update(id?: number | undefined, data?: CurrencyEntity | undefined): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async selectAll(conf: any): Promise<CurrencyEntity[]> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_CURRENCY} limit ${conf.offset}, ${conf.limit}`, []
        )

        return rows
    }

    async selectOne(id?: number | undefined): Promise<CurrencyEntity> {
        throw new Error("Method not implemented.");
    }

}