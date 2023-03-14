export interface IDml {
    dataManipulation(
        type: string,
        query: string,
        queryConfig: any[]
    ): Promise<any>
}

export interface IDql {
    dataQueryLanguage(query: string, queryConfig: any[]): Promise<any>
}