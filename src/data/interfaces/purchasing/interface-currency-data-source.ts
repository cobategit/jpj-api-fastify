import { CurrencyEntity } from "../../../domain"

export interface ICurrencyDataSource {
    count(): Promise<any>
    insert(data?: CurrencyEntity): Promise<any>
    update(id?: number, data?: CurrencyEntity): Promise<any>
    selectAll(conf: any): Promise<CurrencyEntity[]>
    selectOne(id?: number): Promise<CurrencyEntity>
}