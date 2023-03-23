import { FreightEntity } from "../../../domain";

export interface IFreighDataSource {
    count(): Promise<any>
    insert(data?: FreightEntity): Promise<any>
    update(id?: number, data?: FreightEntity): Promise<any>
    selectAll(conf: any): Promise<FreightEntity[]>
    selectOne(id?: number): Promise<FreightEntity>
}