import { FreightBankEntity, FreightEntity } from "../../../domain";

export interface IFreighDataSource {
    count(): Promise<any>
    insert(data?: FreightEntity): Promise<any>
    insertBank(data?: FreightBankEntity): Promise<any>
    update(id?: number, data?: FreightEntity): Promise<any>
    updateBank(id?: number, data?: FreightBankEntity): Promise<any>
    selectAll(conf: any): Promise<FreightEntity[]>
    selectOne(id?: number): Promise<FreightEntity>
}