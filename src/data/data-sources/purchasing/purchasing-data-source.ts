import { format } from "date-fns";
import { DataManipulationLanguage, DataQueryLanguage } from "../..";
import { ParamsEntity, PurchasingEntity } from "../../../domain";
import { IPurchasingDataSource } from "../../interfaces/purchasing";

export class PurchasingDataSource implements IPurchasingDataSource {
  private dml: DataManipulationLanguage
  private dql: DataQueryLanguage

  constructor(dml: DataManipulationLanguage, dql: DataQueryLanguage) {
    this.dml = dml
    this.dql = dql
  }

  async count(): Promise<any> {
    const [rows, fields] = await this.dql.dataQueryLanguage(
      `select count(1) as count from ${process.env.TABLE_PURCHASING}`,
      []
    )

    return rows[0]
  }

  async insert(data?: PurchasingEntity | undefined): Promise<any> {
    const res = await this.dml.dataManipulation(
      `insert purchasing`,
      `insert into ${process.env.TABLE_PURCHASING} 
            (stockpile_id, contract_type, vendor_id, upload_file, approval_file, upload_file1, upload_file2, upload_file3, upload_file4, entry_by, entry_date, quantity, price, ppn, freight, admin_input, status, company, ho, link, payment_id, payment_type, plan_payment_date, type, logbook_status, isTermin) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [data?.stockpile_id, data?.contract_type, data?.vendor_id, data?.upload_file, data?.approval_file, data?.upload_file1, data?.upload_file2, data?.upload_file3, data?.upload_file4, data?.entry_by, data?.entry_date, data?.quantity, data?.price, data?.ppn, data?.freight, data?.admin_input, data?.status, data?.company, data?.ho, data?.link, data?.payment_id, data?.payment_type, data?.plan_payment_date, data?.type, data?.logbook_status, data?.isTermin]
    )

    return res
  }

  async update(id?: number | undefined, data?: PurchasingEntity | undefined): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async selectAll(conf: Pick<ParamsEntity, 'limit' | 'offset' | 'search' | 'kontrak_type' | 'pks_type' | 'stockpile_id' | 'final_status'>): Promise<PurchasingEntity[]> {
    let limit = ''
    let where = ``
    let orderBy = `, p.purchasing_id DESC`

    if (conf!.pks_type == 'PKS-Contract') {
      where = `where p.type = 1 and p.contract_type = 1`
      if (conf!.stockpile_id) {
        where += ` and s.stockpile_id = ${conf!.stockpile_id}`
      }
      if (conf!.search) where += ` and (v.vendor_name LIKE '%${conf!.search}%' or s.stockpile_name LIKE '%${conf!.search}%')`
      if (conf!.final_status) {
        where += ` and popks.final_status = ${conf?.final_status}`
        orderBy = conf!.final_status == 2 || conf!.final_status == 3 ? `, p.purchasing_id ASC` : `, p.purchasing_id DESC`
      }
    } else if (conf!.pks_type == 'PKS-Curah') {
      where = `where p.type = 2 and p.contract_type = 1`
      if (conf!.stockpile_id) {
        where += ` and s.stockpile_id = ${conf!.stockpile_id}`
      }
      if (conf!.search) where += ` and (v.vendor_name LIKE '%${conf!.search}%' or s.stockpile_name LIKE '%${conf!.search}%')`
      if (conf!.final_status) {
        where += ` and popks.final_status = ${conf?.final_status}`
        orderBy = conf!.final_status == 2 || conf!.final_status == 3 ? `, p.purchasing_id ASC` : `, p.purchasing_id DESC`
      }
    } else if (conf!.kontrak_type == 'PKS-Spb') {
      where = `where (p.type = 2 or p.type = 1) and p.contract_type = 2`
      if (conf!.stockpile_id) {
        where += ` and s.stockpile_id = ${conf!.stockpile_id}`
      }
      if (conf!.search) where += ` and (v.vendor_name LIKE '%${conf!.search}%' or s.stockpile_name LIKE '%${conf!.search}%')`
      if (conf!.final_status) {
        where += ` and popks.final_status = ${conf?.final_status}`
        orderBy = conf!.final_status == 2 || conf!.final_status == 3 ? `, p.purchasing_id ASC` : `, p.purchasing_id DESC`
      }
    } else if (conf!.stockpile_id) {
      where = `where s.stockpile_id = ${conf!.stockpile_id}`
      if (conf!.search) where += ` and (v.vendor_name LIKE '%${conf!.search}%' or s.stockpile_name LIKE '%${conf!.search}%')`
      if (conf!.final_status) {
        where += ` and popks.final_status = ${conf?.final_status}`
        orderBy = conf!.final_status == 2 || conf!.final_status == 3 ? `, p.purchasing_id ASC` : `, p.purchasing_id DESC`
      }
    } else if (conf!.search) {
      where = `where (v.vendor_name LIKE '%${conf!.search}%' or s.stockpile_name LIKE '%${conf!.search}%')`
      if (conf!.final_status) {
        where += ` and popks.final_status = ${conf?.final_status}`
        orderBy = conf!.final_status == 2 || conf!.final_status == 3 ? `, p.purchasing_id ASC` : `, p.purchasing_id DESC`
      }
    }
    if (conf!.offset || conf.limit) limit = `limit ${conf.offset}, ${conf.limit}`

    const [rows, fields] = await this.dql.dataQueryLanguage(
      `SELECT
            p.*,
            CASE
              WHEN p.company = 1
              THEN 'PT.JATIM PROPERTINDO JAYA'
              ELSE 'PT. Ceria'
            END AS company,
            s.stockpile_id,
            s.stockpile_code,
            s.stockpile_name,
            CASE
              WHEN p.contract_type = 1
              THEN 'PKS-Contract'
              ELSE 'PKS-Spb'
            END AS contract_type,
            CASE
              WHEN p.type = 1
              THEN 'PKS-Contract'
              ELSE 'PKS-Curah'
            END AS type,
            popks.contract_no,
            v.vendor_id,
            v.vendor_name,
            v.ppn as vendor_ppn,
            p.type as type_id,
            popks.notes2,
            popks.final_status as status_popks,
            popks.reject_status as reject_popks,
            pd.quantity_payment
          FROM
          ${process.env.TABLE_PURCHASING} AS p
            LEFT JOIN ${process.env.TABLE_STOCKPILE} AS s
              ON s.stockpile_id = p.stockpile_id
            LEFT JOIN ${process.env.TABLE_VENDOR} AS v
              ON v.vendor_id = p.vendor_id
            LEFT JOIN ${process.env.TABLE_POPKS} popks
              ON popks.purchasing_id = p.purchasing_id
            LEFT JOIN ${process.env.TABLE_PURCHASING_DETAIL} pd
              ON pd.purchasing_id = p.purchasing_id
          ${where}
          ORDER BY popks.final_status DESC ${orderBy}
          ${limit};
            `, []
    )

    return rows
  }

  async selectOne(id?: number | undefined): Promise<PurchasingEntity | null> {
    const [rows, fields] = await this.dql.dataQueryLanguage(
      `
            SELECT
            p.*,
            CASE
              WHEN p.company = 1
              THEN 'PT.JATIM PROPERTINDO JAYA'
              ELSE 'PT. Ceria'
            END AS company,
            s.stockpile_id,
            s.stockpile_code,
            s.stockpile_name,
            CASE
              WHEN p.contract_type = 1
              THEN 'PKS-Contract'
              ELSE 'PKS-Spb'
            END AS contract_type,
            CASE
              WHEN p.type = 1
              THEN 'PKS-Contract'
              ELSE 'PKS-Curah'
            END AS type,
            popks.contract_no,
            v.vendor_id,
            v.vendor_name,
            v.ppn as vendor_ppn,
            p.type as type_id,
            popks.notes2,
            popks.final_status as status_popks,
            popks.reject_status as reject_popks,
            pd.quantity_payment
          FROM
          ${process.env.TABLE_PURCHASING} AS p
            LEFT JOIN ${process.env.TABLE_STOCKPILE} AS s
              ON s.stockpile_id = p.stockpile_id
            LEFT JOIN ${process.env.TABLE_VENDOR} AS v
              ON v.vendor_id = p.vendor_id
            LEFT JOIN ${process.env.TABLE_POPKS} popks
              ON popks.purchasing_id = p.purchasing_id
            LEFT JOIN ${process.env.TABLE_PURCHASING_DETAIL} pd
              ON pd.purchasing_id = p.purchasing_id
            where p.purchasing_id = ?`,
      [id]
    )

    return rows[0]
  }

  async selectOneDynamic(conf?: Pick<ParamsEntity, 'columnKey' | 'columnValue'> | undefined): Promise<PurchasingEntity[]> {
    const [rows, fields] = await this.dql.dataQueryLanguage(
      `select * from ${process.env.TABLE_PURCHASING} where ${conf?.columnKey} = ?`,
      [conf?.columnValue]
    )

    return rows
  }

  async selectPlanPaymentDate(): Promise<any> {
    let dateNow = `${format(new Date(), 'yyyy-MM-dd')}`
    const [rows, fields] = await this.dql.dataQueryLanguage(
      `CALL PlanPayDate('${dateNow}')`, []
    )

    return rows[0][0]
  }

  async updateFile(id?: number | undefined, data?: Pick<PurchasingEntity, "upload_file" | "approval_file" | "upload_file1" | "upload_file2" | "upload_file3" | "upload_file4"> | undefined): Promise<any> {
    const res = await this.dml.dataManipulation(
      `update file purchasing`,
      `update ${process.env.TABLE_PURCHASING} set upload_file = ?, approval_file = ?, upload_file1 = ?, upload_file2 = ?,  upload_file3 = ?, upload_file4 = ? where purchasing_id = ? and status = ?`,
      [data?.upload_file, data?.approval_file, data?.upload_file1, data?.upload_file2, data?.upload_file3, data?.upload_file4, id!, 0]
    )

    return res
  }

  async updateFileSpb(id?: number | undefined, data?: Pick<PurchasingEntity, "import2" | "approval_file" | "upload_file1" | "upload_file2" | "upload_file3" | "upload_file4" | "import2_date"> | undefined): Promise<any> {
    const res = await this.dml.dataManipulation(
      `update file purchasing, spb`,
      `update ${process.env.TABLE_PURCHASING} set import2 = ?, approval_file = ?, upload_file1 = ?, upload_file2 = ?,  upload_file3 = ?, upload_file4 = ?, import2_date = ? where purchasing_id = ? and status = ?`,
      [data?.import2, data?.approval_file, data?.upload_file1, data?.upload_file2, data?.upload_file3, data?.upload_file4, data?.import2_date, id!, 2]
    )

    return res
  }

  async delete(id?: number | undefined): Promise<any> {
    const res = await this.dml.dataManipulation(
      `delete purchasing`,
      `delete from ${process.env.TABLE_PURCHASING} where purchasing_id = ? and status = ?`,
      [id!, 0]
    )

    return res
  }

  async selectWhereDynamic(conf?: Pick<ParamsEntity, "whereKey" | 'whereValue'> | undefined): Promise<PurchasingEntity | null> {
    const [rows, fields] = await this.dql.dataQueryLanguage(
      `select * from purchasing ${conf?.whereKey}`,
      conf?.whereValue!
    )

    return rows[0]
  }

}