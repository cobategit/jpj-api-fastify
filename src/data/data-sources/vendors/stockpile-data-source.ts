import {
  DataManipulationLanguage,
  DataQueryLanguage,
  IStockpileDataSource,
} from '../..'
import { StockpileEntity } from '../../../domain'

export class StockpileDataSource implements IStockpileDataSource {
  private dml: DataManipulationLanguage
  private dql: DataQueryLanguage

  constructor(dml: DataManipulationLanguage, dql: DataQueryLanguage) {
    this.dml = dml
    this.dql = dql
  }

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
    const [rows, fields] = await this.dql.dataQueryLanguage(
      `select * from ${process.env.TABLE_STOCKPILE} limit ${conf.offset}, ${conf.limit}`,
      []
    )

    return rows
  }

  async selectOne(id?: number | undefined): Promise<StockpileEntity> {
    throw new Error('Method not implemented.')
  }
}
