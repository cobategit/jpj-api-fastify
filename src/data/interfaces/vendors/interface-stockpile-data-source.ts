import { StockpileEntity } from '../../../domain'

export interface IStockpileDataSource {
  count(): Promise<any>
  insert(data?: StockpileEntity): Promise<any>
  update(id?: number, data?: StockpileEntity): Promise<any>
  selectAll(conf: any): Promise<StockpileEntity[]>
  selectOne(id?: number): Promise<StockpileEntity>
}
