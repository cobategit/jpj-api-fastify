import { ParamsEntity, PksCurahBankEntity, PksCurahEntity } from "../../../domain";

export interface IPksCurahDataSource {
    count(): Promise<any>
    insert(data?: PksCurahEntity): Promise<any>
    insertBank(data?: PksCurahBankEntity): Promise<any>
    update(id?: number, data?: PksCurahEntity): Promise<any>
    updateBank(id?: number, data?: PksCurahBankEntity): Promise<any>
    selectAll(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search' | 'vendor_type'>): Promise<PksCurahEntity[]>
    selectAllBank(conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'search'>): Promise<PksCurahBankEntity[]>
    selectOneBank(id?: number): Promise<PksCurahBankEntity | null>
    selectBankByPksCurahId(id?: number[], conf?: Record<string, any>): Promise<PksCurahBankEntity[]>
    selectOne(id?: number): Promise<PksCurahEntity | null>
    delete(id?: number): Promise<any>
    summaryPks(isOa?: boolean, conf?: Pick<ParamsEntity, 'limit' | 'offset' | 'period_from' | 'period_to' | 'stockpile_name' | 'vendor_name' | "user_id">): Promise<any>
}