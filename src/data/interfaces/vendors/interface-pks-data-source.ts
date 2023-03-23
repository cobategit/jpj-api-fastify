import { PksCurahEntity } from "../../../domain";

export interface IPksCurahDataSource {
    count(): Promise<any>
    insert(data?: PksCurahEntity): Promise<any>
    update(id?: number, data?: PksCurahEntity): Promise<any>
    selectAll(conf: any): Promise<PksCurahEntity[]>
    selectOne(id?: number): Promise<PksCurahEntity>
}