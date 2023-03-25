import { PkhoaEntity } from "../../../domain"

export interface IPkhoaDataSource {
    count(): Promise<any>
    insert(data?: PkhoaEntity): Promise<any>
    update(id?: number, data?: PkhoaEntity): Promise<any>
    selectAll(conf: any): Promise<PkhoaEntity[]>
    selectOne(id?: number): Promise<PkhoaEntity>
}