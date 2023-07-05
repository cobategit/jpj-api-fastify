import { AppError, getPagination, setPagination } from "@jpj-common/module";
import { IPurchasingRepo, IReportsPksUseCase } from "../../interfaces";
import { ParamsEntity } from "../../entity";
import { format } from "date-fns";

export class ReportsPksUseCase implements IReportsPksUseCase {

    constructor(private readonly purchasingRepo: IPurchasingRepo) { }

    async execute(body?: any, queryString?: any): Promise<any> {
        let limitNumber: number = 0
        let conf: ParamsEntity = { ...body, ...queryString }

        try {
            if (queryString!.page || queryString!.size) {
                const { limit, offset } = setPagination(queryString?.page!, queryString?.size!, 100)
                conf = {
                    limit,
                    offset,
                    period_from: body?.period_from,
                    period_to: body?.period_to,
                    stockpile_name: body?.stockpile_name,
                    vendor_name: body?.vendor_name,
                    user_id: queryString?.user_id
                }
                limitNumber = limit
            }

            const res = await this.purchasingRepo.reportsPks(body?.isOa ?? false, conf)
            const data = getPagination(res, queryString?.page!, limitNumber)

            return data

        } catch (error) {
            throw new AppError(500, false, `${error}`, '501')
        }
    }

}