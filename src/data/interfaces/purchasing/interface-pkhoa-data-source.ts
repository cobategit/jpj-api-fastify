import { ParamsEntity, PkhoaEntity } from "../../../domain"

export interface IPkhoaDataSource {
    count(): Promise<any>
    insert(data?: PkhoaEntity): Promise<any>
    update(id?: number, data?: PkhoaEntity): Promise<any>
    selectAll(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search'>): Promise<PkhoaEntity[]>
    selectOne(id?: number): Promise<PkhoaEntity | null>
    selectOneDynamic(conf?: Pick<ParamsEntity, 'tableCol1' | 'tableVal1'>): Promise<PkhoaEntity[]>
    delete(id?: number): Promise<any>
}