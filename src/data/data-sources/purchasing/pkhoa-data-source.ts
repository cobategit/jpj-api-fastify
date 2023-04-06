import { DataManipulationLanguage, DataQueryLanguage } from "../..";
import { ParamsEntity, PkhoaEntity } from "../../../domain";
import { IPkhoaDataSource } from "../../interfaces/purchasing";

export class PkhoaDataSource implements IPkhoaDataSource {
    private dml: DataManipulationLanguage
    private dql: DataQueryLanguage

    constructor(dml: DataManipulationLanguage, dql: DataQueryLanguage) {
        this.dml = dml
        this.dql = dql
    }

    async count(): Promise<any> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select count(1) as count from ${process.env.TABLE_FREIGHT_COST}`,
            []
        )

        return rows[0]
    }

    async insert(data?: PkhoaEntity | undefined): Promise<any> {
        const res = await this.dml.dataManipulation(
            `insert pengajuan PKHOA`,
            `insert into ${process.env.TABLE_FREIGHT_COST} 
            (contract_pkhoa, freight_id, stockpile_id, vendor_id, currency_id, exchange_rate, price, price_converted, payment_notes, company_id, remarks, shrink_tolerance_kg, shrink_tolerance_persen, shrink_claim, active_from, file_pkhoa, status, entry_by, entry_date, cara_pembayaran) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [data?.contract_pkhoa, data?.freight_id, data?.stockpile_id, data?.vendor_id, data?.currency_id, data?.exchange_rate, data?.price, data?.price_converted, data?.payment_notes, data?.company_id, data?.remarks, data?.shrink_tolerance_kg, data?.shrink_tolerance_persen, data?.shrink_claim, data?.active_from, data?.file, data?.status, data?.entry_by, data?.entry_date, data?.cara_pembayaran]
        )

        return res
    }

    async update(id?: number | undefined, data?: PkhoaEntity | undefined): Promise<any> {
        const res = await this.dml.dataManipulation(
            `update pengajuan pkhoa`,
            `update ${process.env.TABLE_FREIGHT_COST} set contract_pkhoa = ?, freight_id = ?, stockpile_id = ?, vendor_id = ?, currency_id = ?, exchange_rate = ?, price = ?, price_converted = ?, payment_notes = ?, company_id = ?, remarks = ?, shrink_tolerance_kg = ?, shrink_tolerance_persen = ?, shrink_claim = ?, active_from = ?, file_pkhoa = ?, modify_by = ?, modify_date = ?, cara_pembayaran = ? where freight_cost_id = ? and status = ?`
            , [data?.contract_pkhoa, data?.freight_id, data?.stockpile_id, data?.vendor_id, data?.currency_id, data?.exchange_rate, data?.price, data?.price_converted, data?.payment_notes, data?.company_id, data?.remarks, data?.shrink_tolerance_kg, data?.shrink_tolerance_persen, data?.shrink_claim, data?.active_from, data?.file, data?.modify_date, data?.modify_date, data?.cara_pembayaran, id, 4]
        )

        return res
    }

    async selectAll(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search' | 'filter'>): Promise<PkhoaEntity[]> {
        let limit = ``
        let where = ``

        if (conf!.filter) {
            where = `where s.stockpile_name = ${conf?.filter}`
        } else if (conf!.search) {
            where = `where (f.freight_supplier LIKE '%${conf!.search}%' or v.vendor_name LIKE '%${conf!.search}%' or s.stockpile_name LIKE '%${conf!.search}%' or fc.price LIKE '%${conf!.search}%')`
        } else if (conf!.filter && conf!.search) {
            where = `where s.stockpile_name = ${conf?.filter} and (f.freight_supplier LIKE '%${conf!.search}%' or v.vendor_name LIKE '%${conf!.search}%' or s.stockpile_name LIKE '%${conf!.search}%' or fc.price LIKE '%${conf!.search}%')`
        }

        if (conf!.offset || conf!.limit) limit = `limit ${conf?.offset}, ${conf?.limit}`

        const [rows, fields] = await this.dql.dataQueryLanguage(
            `SELECT
              f.freight_code,
              f.freight_supplier,
              c.currency_code,
              s.stockpile_name,
              s.stockpile_code,
              v.vendor_name,
              v.vendor_code,
              fc.*
            FROM
            ${process.env.TABLE_FREIGHT_COST} AS fc
              LEFT JOIN ${process.env.TABLE_FREIGHT} AS f
                ON fc.freight_id = f.freight_id
              LEFT JOIN ${process.env.TABLE_VENDOR} AS v
                ON fc.vendor_id = v.vendor_id
              LEFT JOIN ${process.env.TABLE_STOCKPILE} AS s
                ON fc.stockpile_id = s.stockpile_id
              LEFT JOIN ${process.env.TABLE_CURRENCY} AS c
                ON fc.currency_id = c.currency_id
            ${where}
            ORDER BY fc.freight_cost_id DESC ${limit}`,
            []
        )

        return rows
    }

    async selectOne(id?: number | undefined): Promise<PkhoaEntity | null> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `SELECT
            f.freight_code,
            f.freight_supplier,
            c.currency_code,
            s.stockpile_name,
            s.stockpile_code,
            v.vendor_name,
            v.vendor_code,
            fc.*
          FROM
          ${process.env.TABLE_FREIGHT_COST} AS fc
            LEFT JOIN ${process.env.TABLE_FREIGHT} AS f
              ON fc.freight_id = f.freight_id
            LEFT JOIN ${process.env.TABLE_VENDOR} AS v
              ON fc.vendor_id = v.vendor_id
            LEFT JOIN ${process.env.TABLE_STOCKPILE} AS s
              ON fc.stockpile_id = s.stockpile_id
            LEFT JOIN ${process.env.TABLE_CURRENCY} AS c
              ON fc.currency_id = c.currency_id
          where freight_cost_id = ?`,
            [id]
        )

        return rows[0]
    }

    async selectOneDynamic(conf?: Pick<ParamsEntity, 'tableCol1' | 'tableVal1'> | undefined): Promise<PkhoaEntity[]> {
        const [rows, fileds] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_FREIGHT_COST} where ${conf?.tableCol1} = ?`,
            [conf?.tableVal1]
        )

        return rows
    }

    async delete(id?: number | undefined, status: number = 4): Promise<any> {
        const res = await this.dml.dataManipulation(
            `delete pengajuan pkhoa`,
            `update ${process.env.TABLE_FREIGHT_COST} set status = ? where freight_cost_id = ? and status = ?`,
            [5, id!, status]
        )

        return res
    }

}