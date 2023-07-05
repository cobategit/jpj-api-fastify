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
            `insert into ${process.env.TABLE_VENDOR} (vendor_code, vendor_name, vendor_address, active, entry_date, pic, phone_pic, file_npwp, file_pkp, curah, notes) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
            [data?.vendor_code, data?.vendor_name, data?.vendor_address, data?.active, data?.entry_date, data?.pic, data?.phone_pic, data?.file_npwp, data?.file_pkp, data?.curah, data?.notes]
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

    async update(id?: number, data?: PksCurahEntity, active: number = 2): Promise<any> {
        const res = await this.dml.dataManipulation(
            `update pengajuan ${data?.curah}`,
            `update ${process.env.TABLE_VENDOR} set vendor_name = ?, vendor_address = ?, pic = ?, phone_pic = ?, file_npwp = ?, file_pkp = ?, notes = ? where vendor_id = ? and active = ?`,
            [data?.vendor_name, data?.vendor_address, data?.pic, data?.phone_pic, data?.file_npwp, data?.file_pkp, data?.notes, id!, active]
        )

        return res
    }

    async updateBank(id?: number, data?: PksCurahBankEntity): Promise<any> {
        const res = await this.dml.dataManipulation(
            `update pengajuan pkscurah bank`,
            `update ${process.env.TABLE_VENDOR_BANK} set bank_name = ?, account_no = ?, file_rekbank = ? where v_bank_id = ?`,
            [data?.bank_name, data?.account_no, data?.file_rekbank, id!]
        )

        return res
    }

    async selectAll(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search' | 'vendor_type'>): Promise<PksCurahEntity[]> {
        let where = ``
        let limit = ``

        if (conf?.vendor_type == 'pks') {
            where = `where curah = 0`
            if (conf.search) {
                where += ` and (vendor_name Like '%${conf.search}%')`
            }
        } else if (conf?.vendor_type == 'curah') {
            where = `where curah = 1`
            if (conf.search) {
                where += ` and (vendor_name Like '%${conf.search}%')`
            }
        } else if (conf?.search) {
            where = `where vendor_name Like '%${conf.search}%'`
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

    async selectOneBank(id?: number | undefined): Promise<PksCurahBankEntity | null> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_VENDOR_BANK} where v_bank_id = ?`,
            [id]
        )

        return rows[0]
    }

    async selectBankByPksCurahId(id?: number[] | undefined, conf?: Record<string, any> | undefined): Promise<PksCurahBankEntity[]> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_VENDOR_BANK} where vendor_id IN (?)`,
            [id]
        )

        return rows
    }

    async selectOne(id?: number): Promise<PksCurahEntity | null> {
        const [rows, fields] = await this.dql.dataQueryLanguage(
            `select * from ${process.env.TABLE_VENDOR} where vendor_id = ?`,
            [id]
        )

        return rows[0]
    }

    async delete(id?: number, active: number = 2): Promise<any> {
        const res = await this.dml.dataManipulation(
            `delete pengajuan vendor`,
            `update ${process.env.TABLE_VENDOR} set active = ? where vendor_id = ? and active = ?`,
            [3, id!, active]
        )

        return res
    }

    async summaryPks(isOa?: boolean | undefined, conf?: Pick<ParamsEntity, "limit" | "offset" | "period_from" | "period_to" | "stockpile_name" | "vendor_name" | "user_id"> | undefined): Promise<any> {
        let limit = ``
        let whereKey = ` AND us.user_id = ? `
        let select = `pp.entry_date as contract_date,s.stockpile_name, pp.contract_no,v.vendor_name,pp.quantity AS qty_contract,COALESCE(pp.price_converted,0) AS price, 
        c.po_no, sc.quantity AS qty_po,(SELECT IFNULL(SUM(t.send_weight),0) FROM transaction t WHERE t.stockpile_contract_id = sc.stockpile_contract_id) AS qty_received,
        (sc.quantity - (SELECT IFNULL(SUM(t.send_weight),0) FROM transaction t WHERE t.stockpile_contract_id = sc.stockpile_contract_id)) AS os_pks`

        if (isOa) {
            select = `pp.entry_date as contract_date,s.stockpile_name, c.contract_no,v.vendor_name,pp.quantity as qty_contract,COALESCE(c.price_converted,0) AS price, 
            COALESCE(f.freight_supplier,'CONTRACT SHARING') as freight,COALESCE(fc.price_converted,0) AS price_oa`
        }

        if (conf!.period_from && conf!.period_to) {
            whereKey += ` AND c.entry_date BETWEEN STR_TO_DATE('${conf!.period_from}', '%Y-%m-%d') AND STR_TO_DATE('${conf!.period_to}', '%Y-%m-%d') `
        }

        if (conf!.stockpile_name) {
            whereKey += ` AND (SELECT s.stockpile_name FROM stockpile s WHERE stockpile_id = sc.stockpile_id) IN (${conf!.stockpile_name}) `
        }

        if (conf!.vendor_name) {
            whereKey += ` AND (SELECT v.vendor_name FROM vendor v WHERE v.vendor_id = c.vendor_id) IN (${conf!.vendor_name}) `
        }

        if (conf!.offset || conf!.limit) limit = `limit ${conf?.offset}, ${conf?.limit}`

        const [rows, fields] = await this.dql.dataQueryLanguage(
            `
            SELECT ${select}
            FROM ${process.env.TABLE_CONTRACT} c
            LEFT JOIN ${process.env.TABLE_PO_CONTRACT} pc ON c.contract_id = pc.contract_id
            LEFT JOIN ${process.env.TABLE_POPKS} pp ON pp.po_pks_id = pc.po_pks_id
            LEFT JOIN ${process.env.TABLE_STOCKPILE_CONTRACT} sc ON sc.contract_id=c.contract_id
            LEFT JOIN ${process.env.TABLE_TRANSACTION} t ON t.stockpile_contract_id=sc.stockpile_contract_id
            LEFT JOIN ${process.env.TABLE_STOCKPILE} s ON s.stockpile_id=sc.stockpile_id
            LEFT JOIN ${process.env.TABLE_VENDOR} v ON v.vendor_id= c.vendor_id
            LEFT JOIN ${process.env.TABLE_FREIGHT_COST} fc ON fc.freight_cost_id=t.freight_cost_id
            LEFT JOIN ${process.env.TABLE_FREIGHT} f ON f.freight_id=fc.freight_id
            LEFT JOIN ${process.env.TABLE_USER_STOCKPILE} as us ON us.stockpile_id = s.stockpile_id
            WHERE 1=1 ${whereKey}
            AND c.contract_type='P'
            GROUP BY c.contract_no ORDER BY pp.entry_date ASC ${limit}
            `,
            [conf?.user_id]
        )

        return rows
    }
}