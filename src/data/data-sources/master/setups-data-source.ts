import { DataManipulationLanguage, DataQueryLanguage } from "../..";
import { SetupsEntity } from "../../../domain";
import { ISetupsDataSource } from "../../interfaces/master";

export class SetupsDataSource implements ISetupsDataSource {
    private dml: DataManipulationLanguage
    private dql: DataQueryLanguage

    constructor(dml: DataManipulationLanguage, dql: DataQueryLanguage) {
        this.dml = dml
        this.dql = dql
    }

    async count(): Promise<any> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select count(1) as count from ${process.env.TABLE_SETUPS}`,
            []
        )

        return rows[0]
    }

    async insert(data?: SetupsEntity | undefined): Promise<any> {
        const res = await this.dml.dataManipulation(
            `insert set_ups`,
            `insert into ${process.env.TABLE_SETUPS} 
            (nama, nilai) 
            VALUES (?,?)`,
            [data?.nama, data?.nilai]
        )

        return res
    }

    async update(id?: number | undefined, data?: SetupsEntity | undefined): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async selectAll(conf: any): Promise<SetupsEntity[]> {
        let limit = ''

        if (conf.offset || conf.limit) limit = `limit ${conf.offset}, ${conf.limit}`
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_SETUPS} ${limit}`, []
        )

        return rows
    }

    async selectOne(id?: number | undefined): Promise<SetupsEntity> {
        const [rows, fileds] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_SETUPS} where id = ?`,
            [id]
        )

        return rows[0]
    }

    async selectByNama(nama?: string | undefined): Promise<SetupsEntity> {
        const [rows, fileds] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_SETUPS} where nama = ?`,
            [nama]
        )

        return rows[0]
    }

}