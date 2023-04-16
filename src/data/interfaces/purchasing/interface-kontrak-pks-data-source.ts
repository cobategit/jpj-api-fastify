import { ParamsEntity, PoPksEntity, PurchasingEntity, VendorKontrakEntity } from "../../../domain"

export interface IPurchasingDataSource {
    count(): Promise<any>
    insert(data?: PurchasingEntity): Promise<any>
    update(id?: number, data?: PurchasingEntity): Promise<any>
    selectAll(conf: Pick<ParamsEntity, 'limit' | 'offset' | 'search' | 'kontrak_type' | 'pks_type'>): Promise<PurchasingEntity[]>
    selectOne(id?: number): Promise<PurchasingEntity | null>
    selectOneDynamic(conf?: Pick<ParamsEntity, 'tableCol1' | 'tableVal1'>): Promise<PurchasingEntity[]>
}

export interface IPoPksDataSource {
    count(): Promise<any>
    insert(data?: PoPksEntity): Promise<any>
    update(id?: number, data?: PoPksEntity): Promise<any>
    selectAll(conf: any): Promise<PoPksEntity[]>
    selectOne(id?: number): Promise<PoPksEntity | null>
    selectOneDynamic(conf?: Pick<ParamsEntity, 'tableCol1' | 'tableVal1'>): Promise<PoPksEntity[]>

}

export interface IVendorKontrakDataSource {
    count(): Promise<any>
    insert(data?: VendorKontrakEntity): Promise<any>
    bulkInsert(data?: VendorKontrakEntity[]): Promise<any>
    update(id?: number, data?: VendorKontrakEntity): Promise<any>
    selectAll(conf: any): Promise<VendorKontrakEntity[]>
    selectOne(id?: number): Promise<VendorKontrakEntity | null>
    selectOneDynamic(conf?: Pick<ParamsEntity, 'tableCol1' | 'tableVal1'>): Promise<VendorKontrakEntity[]>
}