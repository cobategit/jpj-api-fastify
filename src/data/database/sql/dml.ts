import { IDml, IMysqlWrapper } from '../../interfaces'
import { LoggersApp, AppError } from '@jpj-common/module'

export class DataManipulationLanguage implements IDml {

  constructor(private readonly db: IMysqlWrapper) { }
  async dataManipulation(
    type: string,
    query: string,
    queryConfig: any[]
  ): Promise<any> {
    await this.db.query('START TRANSACTION')
    try {
      const dbRes = await this.db.query(`${query}`, queryConfig)
      await this.db.query('COMMIT')
      // await this.db.end()
      return dbRes
    } catch (error) {
      await this.db.query('ROLLBACK')
      LoggersApp.warn('dml-query', { error, type })
      throw new AppError(400, false, `${error}`, '001')
    }
  }
}
