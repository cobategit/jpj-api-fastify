import { LoggersApp, AppError } from '@jpj-common/module'
import { IDql, IMysqlWrapper } from '../../interfaces'

export class DataQueryLanguage implements IDql {

  constructor(private readonly db: IMysqlWrapper) { }

  async dataQueryLanguage(query: string, queryConfig: any[]): Promise<any> {
    try {
      const res = await this.db.query(`${query}`, queryConfig)
      // await this.db.end()
      return res
    } catch (error) {
      await this.db.query('ROLLBACK')
      LoggersApp.warn('dml-query', { error })
      throw new AppError(400, false, `Error - ${error}`, '001')
    }
  }
}
