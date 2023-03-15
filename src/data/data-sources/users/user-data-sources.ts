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
  async registerUserPurchasing(data: EntityUser): Promise<any> {
    const res = await this.dml.dataManipulation(
      `insert mobile device`,
      `update ${process.env.TABLE_USER} set deviced_id = ?, kode_akses = ? where user_email = ?`,
      [data.deviced_id, data.kode_akses, data.user_email]
    )

    return res
  }

  async selectByEmail(email: string): Promise<EntityUser | null> {
    const [rows, fields] = await this.dql.dataQueryLanguage(
      `select * from ${process.env.TABLE_USER} where user_email = ? limit 1`,
      [email]
    )

    return rows[0]
  }
}
