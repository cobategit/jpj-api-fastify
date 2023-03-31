import { PoPksEntity, PurchasingEntity, VendorKontrakEntity } from "../../../domain"

export interface IPurchasingDataSource {
    count(): Promise<any>
    insert(data?: PurchasingEntity): Promise<any>
    update(id?: number, data?: PurchasingEntity): Promise<any>
    selectAll(conf: any): Promise<PurchasingEntity[]>
    selectOne(id?: number): Promise<PurchasingEntity>
}

export interface IPoPksDataSource {
    count(): Promise<any>
    insert(data?: PoPksEntity): Promise<any>
    update(id?: number, data?: PoPksEntity): Promise<any>
    selectAll(conf: any): Promise<PoPksEntity[]>
    selectOne(id?: number): Promise<PoPksEntity>
}

export interface IVendorKontrakDataSource {
    count(): Promise<any>
    insert(data?: VendorKontrakEntity): Promise<any>
    update(id?: number, data?: VendorKontrakEntity): Promise<any>
    selectAll(conf: any): Promise<VendorKontrakEntity[]>
    selectOne(id?: number): Promise<VendorKontrakEntity>
}