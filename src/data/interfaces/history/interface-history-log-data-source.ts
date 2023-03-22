import { HistoryLogEntity } from "../../../domain";

export interface IHistoryLogDataSource {
    insert(data?: HistoryLogEntity): Promise<any>
}