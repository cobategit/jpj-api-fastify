import { ParamsEntity, PoPksEntity, PurchasingDetailEntity, PurchasingEntity, PurchasingFreightCostEntity, TypePengajuanKontrakPks, VendorKontrakEntity } from "../../../domain"

export interface IPurchasingDataSource {
    count(): Promise<any>
    insert(data?: PurchasingEntity): Promise<any>
    update(id?: number, data?: PurchasingEntity): Promise<any>
    selectAll(conf: Pick<ParamsEntity, 'limit' | 'offset' | 'search' | 'kontrak_type' | 'pks_type' | 'stockpile_id' | 'final_status'>): Promise<PurchasingEntity[]>
    selectOne(id?: number): Promise<PurchasingEntity | null>
    selectOneDynamic(conf?: Pick<ParamsEntity, 'columnKey' | 'columnValue'>): Promise<PurchasingEntity[]>
    selectPlanPaymentDate(): Promise<any>
    delete(id?: number): Promise<any>
    updateFile(id?: number, data?: Pick<PurchasingEntity, 'upload_file' | 'approval_file' | 'upload_file1' | 'upload_file2' | 'upload_file3' | 'upload_file4'>): Promise<any>
    updateFileSpb(id?: number, data?: Pick<PurchasingEntity, 'import2' | 'approval_file' | 'upload_file1' | 'upload_file2' | 'upload_file3' | 'upload_file4' | 'import2_date'>): Promise<any>
    selectWhereDynamic(conf?: Pick<ParamsEntity, 'whereKey' | 'whereValue'>): Promise<PurchasingEntity | null>
}

export interface IPurchasingDetailDataSource {
    count(): Promise<any>
    insert(data?: PurchasingDetailEntity): Promise<any>
    selectOneDynamic(conf?: Pick<ParamsEntity, 'columnKey' | 'columnValue'>): Promise<PurchasingDetailEntity[] | []>
    update(id?: number, data?: PurchasingDetailEntity): Promise<any>
    delete(id?: number): Promise<any>
    availableQuantity(type?: string, data?: TypePengajuanKontrakPks): Promise<any>
}

export interface IPurchasingFreightCostDataSource {
    count(): Promise<any>
    insert(data?: PurchasingFreightCostEntity): Promise<any>
    bulkInsert(data?: PurchasingFreightCostEntity[]): Promise<any>
    update(id?: number, data?: PurchasingFreightCostEntity): Promise<any>
    selectAll(conf: ParamsEntity): Promise<PurchasingFreightCostEntity[]>
    selectOne(id?: number): Promise<PurchasingFreightCostEntity | null>
    selectOneDynamic(conf?: Pick<ParamsEntity, 'columnKey' | 'columnValue'>): Promise<PurchasingFreightCostEntity[]>
    delete(id?: number): Promise<any>
}

export interface IPoPksDataSource {
    count(): Promise<any>
    insert(data?: PoPksEntity): Promise<any>
    update(id?: number, data?: PoPksEntity): Promise<any>
    selectAll(conf: any): Promise<PoPksEntity[]>
    selectOne(id?: number): Promise<PoPksEntity | null>
    selectOneDynamic(conf?: Pick<ParamsEntity, 'columnKey' | 'columnValue'>): Promise<PoPksEntity[]>
    delete(id?: number): Promise<any>
}

export interface IVendorKontrakDataSource {
    count(): Promise<any>
    insert(data?: VendorKontrakEntity): Promise<any>
    bulkInsert(data?: VendorKontrakEntity[]): Promise<any>
    update(id?: number, data?: VendorKontrakEntity): Promise<any>
    selectAll(conf: any): Promise<VendorKontrakEntity[]>
    selectOne(id?: number): Promise<VendorKontrakEntity | null>
    selectOneDynamic(conf?: Pick<ParamsEntity, 'columnKey' | 'columnValue'>): Promise<VendorKontrakEntity[]>
    delete(id?: number): Promise<any>
}