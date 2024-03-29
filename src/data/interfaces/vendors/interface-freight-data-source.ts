import { FreightBankEntity, FreightEntity, ParamsEntity } from "../../../domain";

export interface IFreighDataSource {
    count(): Promise<any>
    insert(data?: FreightEntity): Promise<any>
    insertBank(data?: FreightBankEntity): Promise<any>
    update(id?: number, data?: FreightEntity): Promise<any>
    updateBank(id?: number, data?: FreightBankEntity): Promise<any>
    selectAll(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search'>): Promise<FreightEntity[]>
    selectAllBank(conf: any): Promise<FreightBankEntity[]>
    selectOne(id?: number): Promise<FreightEntity | null>
    selectBankByFreightId(id?: number[]): Promise<FreightBankEntity[]>
    delete(id?: number): Promise<any>
}