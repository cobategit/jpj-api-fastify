export interface IMysqlWrapper {
    query(queryString: any, queryConf: any[] | any): Promise<any>
    beginTransaction(): Promise<void>
    commit(): Promise<void>
    rollback(): Promise<void>
    end(): Promise<any>
}