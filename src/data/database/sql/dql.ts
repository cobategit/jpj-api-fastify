import { LoggersApp, AppError } from '@jpj-common/module'
import { IDql, IMysqlWrapper } from '../../interfaces'

export class DataQueryLanguage implements IDql {
  private db: IMysqlWrapper

  constructor(db: IMysqlWrapper) {
    this.db = db
  }

  async dataQueryLanguage(query: string, queryConfig: any[]): Promise<any> {
    try {
      const res = await this.db.query(`${query}`, queryConfig)
      return res
    } catch (error) {
      await this.db.query('ROLLBACK')
      LoggersApp.warn('dml-query', { error })
      throw new AppError(400, false, `Error - ${error}`, '001')
    }
  }
}
