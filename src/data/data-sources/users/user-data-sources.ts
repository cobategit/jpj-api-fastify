import { EntityUser } from '../../../domain'
import {
  IUsersDataSource,
  DataManipulationLanguage,
  DataQueryLanguage,
} from '../..'

export class UsersDataSource implements IUsersDataSource {
  private dml: DataManipulationLanguage
  private dql: DataQueryLanguage

  constructor(dml: DataManipulationLanguage, dql: DataQueryLanguage) {
    this.dml = dml
    this.dql = dql
  }
  async registerUserPurchasing(data?: EntityUser): Promise<any> {
    const res = await this.dml.dataManipulation(
      `insert mobile device`,
      `update ${process.env.TABLE_USER} set mobile_device = ?, kode_access = ? where user_email = ?`,
      [data?.mobile_device, data?.kode_access, data?.user_email]
    )

    return res
  }

  async selectByEmailAndMobileDevice(data?: EntityUser): Promise<EntityUser> {
    const [rows, fields] = await this.dql.dataQueryLanguage(
      `select * from ${process.env.TABLE_USER} where user_email = ? and mobile_device = ?`,
      [data?.user_email, data?.mobile_device]
    )

    return rows[0]
  }
}
