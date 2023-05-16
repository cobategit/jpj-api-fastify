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
      `insert into ${process.env.TABLE_USER_PURCHASING} (user_id, deviced_id, kode_akses, active, entry_date) values(?,?,?,?,?)`,
      [data?.user_id, data?.deviced_id, data?.kode_akses, 1, data?.entry_date]
    )

    return res
  }

  async selectByEmail(email: string): Promise<EntityUser | null> {
    const [rows, fields] = await this.dql.dataQueryLanguage(
      `SELECT
      u.*,
      up.deviced_id,
      up.kode_akses,
      up.active,
      up.entry_date
    FROM
    ${process.env.TABLE_USER} AS u
      LEFT JOIN ${process.env.TABLE_USER_PURCHASING} AS up
        ON up.user_id = u.user_id
    WHERE u.user_email = ? limit 1`,
      [email]
    )

    return rows[0]
  }

  async selectByDeviceId(deviceId: string): Promise<EntityUser | null> {
    const [rows, fields] = await this.dql.dataQueryLanguage(
      `SELECT
        u.*,
        up.deviced_id,
        up.kode_akses,
        up.active,
        up.entry_date
      FROM
      ${process.env.TABLE_USER_PURCHASING} AS up
        INNER JOIN ${process.env.TABLE_USER} AS u
          ON u.user_id = up.user_id
      WHERE up.deviced_id = ? limit 1
      
      `,
      [deviceId]
    )

    return rows[0]
  }

  async updateKodeAksesUserPurchasing(deviced_id: string, kode_akses: string): Promise<any> {
    const res = await this.dml.dataManipulation(
      'update kode akses user purchasing',
      `update ${process.env.TABLE_USER_PURCHASING} set kode_akses = ? where deviced_id = ?`,
      [kode_akses, deviced_id]
    )

    return res
  }
}
