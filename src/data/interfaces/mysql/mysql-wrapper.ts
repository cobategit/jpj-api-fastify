export interface IMysqlWrapper {
    query(queryString: any, queryConf?: any[] | any): Promise<any>
    end(): Promise<any>
}