import { PksCurahEntity } from "../../../domain";

export interface IPksCurahDataSource {
    insert(data?: PksCurahEntity): Promise<any>
    selectAll(): Promise<PksCurahEntity[]>
}