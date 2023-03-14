import { EntityUser } from '../../../domain'

export interface IRegisterUserPurchasingHandler {
  executed(request: any, reply: any): Promise<void>
}

export interface ILoginUserPurchasingHandler {
  executed(request: any, reply: any): Promise<void>
}
