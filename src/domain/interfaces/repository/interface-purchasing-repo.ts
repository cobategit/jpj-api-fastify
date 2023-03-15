import { EntityUser } from '../../entity'

export interface IPurchasingRepo {
  registerUserPurchasing(data: EntityUser): Promise<any>
  checkEmail(email: string): Promise<EntityUser | null>
}
