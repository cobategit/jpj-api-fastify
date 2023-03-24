import { PksCurahBankEntity, PksCurahEntity } from "../../../domain";

export interface IPksCurahDataSource {
    count(): Promise<any>
    insert(data?: PksCurahEntity): Promise<any>
    insertBank(data?: PksCurahBankEntity): Promise<any>
    update(id?: number, data?: PksCurahEntity): Promise<any>
    updateBank(id?: number, data?: PksCurahBankEntity): Promise<any>
    selectAll(conf: any): Promise<PksCurahEntity[]>
    selectOne(id?: number): Promise<PksCurahEntity>
}