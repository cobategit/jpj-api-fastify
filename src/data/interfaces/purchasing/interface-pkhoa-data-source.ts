import { ParamsEntity, PkhoaEntity } from "../../../domain"

export interface IPkhoaDataSource {
    count(): Promise<any>
    insert(data?: PkhoaEntity): Promise<any>
    update(id?: number, data?: PkhoaEntity): Promise<any>
    selectAll(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search' | 'filter' | 'user_id'>): Promise<PkhoaEntity[]>
    selectOne(id?: number): Promise<PkhoaEntity | null>
    selectOneDynamic(conf?: Pick<ParamsEntity, 'columnKey' | 'columnValue'>): Promise<PkhoaEntity[]>
    delete(id?: number): Promise<any>
    selectPkhoaExclude(stockpile_id: number, vendor_id: number, req_payment_date: string): Promise<any>
}