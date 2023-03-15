import { EntityUser } from '../../entity'

export interface IRegisterUserPurchasingUseCase {
  execute(data: EntityUser): Promise<any>
}

export interface ILoginUserPurchasingUseCase {
  execute(data: EntityUser): Promise<EntityUser | null>
}
