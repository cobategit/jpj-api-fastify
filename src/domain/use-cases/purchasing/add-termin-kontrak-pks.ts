import { PurchasingDetailEntity } from "../../entity";
import { IAddTerminKontrakPksUseCase, IPurchasingRepo } from "../../interfaces";

export class AddTerminKontrakPksUseCase implements IAddTerminKontrakPksUseCase {
    private purchasingRepo: IPurchasingRepo

    constructor(purchasingRepo: IPurchasingRepo) {
        this.purchasingRepo = purchasingRepo
    }

    async execute(data?: PurchasingDetailEntity | undefined): Promise<any> {

    }
}