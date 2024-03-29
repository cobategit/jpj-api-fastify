import {
  DataManipulationLanguage,
  DataQueryLanguage,
  IStockpileDataSource,
} from '../..'
import { StockpileEntity } from '../../../domain'

export class StockpileDataSource implements IStockpileDataSource {
  constructor(private readonly dml: DataManipulationLanguage, private readonly dql: DataQueryLanguage) { }

  async count(): Promise<any> {
    const [rows, fields] = await this.dql.dataQueryLanguage(
      `select count(1) as count from ${process.env.TABLE_STOCKPILE}`,
      []
    )

    return rows[0]
  }

  async insert(data?: StockpileEntity | undefined): Promise<any> {
    const res = await this.dml.dataManipulation(
      `insert stockpile`,
      `insert into ${process.env.TABLE_STOCKPILE} 
            () 
            VALUES ()`,
      []
    )

    return res
  }

  async update(
    id?: number | undefined,
    data?: StockpileEntity | undefined
  ): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async selectAll(conf: any): Promise<StockpileEntity[]> {
    let limit = ''
    let where = ``

    if (conf.search) where = `and s.stockpile_name LIKE '%${conf.search}%'`
    if (conf.offset || conf.limit) limit = `limit ${conf.offset}, ${conf.limit}`
    const [rows, fields] = await this.dql.dataQueryLanguage(
      `select * from ${process.env.TABLE_STOCKPILE} as s
       left join ${process.env.TABLE_USER_STOCKPILE} as us on s.stockpile_id = us.stockpile_id
       where s.stockpile_id != 19 and us.user_id = ? ${where} order by s.stockpile_name asc ${limit}`,
      [conf.user_id]
    )

    return rows
  }

  async selectOne(id?: number | undefined): Promise<StockpileEntity | null> {
    const [rows, fields] = await this.dql.dataQueryLanguage(
      `select * from ${process.env.TABLE_STOCKPILE} where stockpile_id = ?`,
      [id!]
    )

    return rows[0]
  }
}
