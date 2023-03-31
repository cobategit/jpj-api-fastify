import { ParamsEntity, PksCurahBankEntity, PksCurahEntity } from "../../../domain";

export interface IPksCurahDataSource {
    count(): Promise<any>
    insert(data?: PksCurahEntity): Promise<any>
    insertBank(data?: PksCurahBankEntity): Promise<any>
    update(id?: number, data?: PksCurahEntity): Promise<any>
    updateBank(id?: number, data?: PksCurahBankEntity): Promise<any>
    selectAll(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search' | 'vendor_type'>): Promise<PksCurahEntity[]>
    selectOne(id?: number): Promise<PksCurahEntity>
}