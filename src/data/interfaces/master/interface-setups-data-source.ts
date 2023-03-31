import { SetupsEntity } from "../../../domain"

export interface ISetupsDataSource {
    count(): Promise<any>
    insert(data?: SetupsEntity): Promise<any>
    update(id?: number, data?: SetupsEntity): Promise<any>
    selectAll(conf: any): Promise<SetupsEntity[]>
    selectOne(id?: number): Promise<SetupsEntity>
    selectByNama(nama?: string): Promise<SetupsEntity>
}