import { EntityUser } from '../../../domain'

export interface IUsersDataSource {
  registerUserPurchasing(data: EntityUser): Promise<any>
  selectByEmail(email: string): Promise<EntityUser | null>
  selectByDeviceId(deviceId: string): Promise<EntityUser | null>
  updateKodeAksesUserPurchasing(deviced_id: string, kode_akses: string): Promise<any>
}
