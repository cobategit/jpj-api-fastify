import { FreightEntity } from "../../../domain";

export interface IFreighDataSource {
    insert(data?: FreightEntity): Promise<any>
}