import { FastifyError, FastifyInstance, FastifyPluginOptions } from 'fastify'
import { IPurchasingHandler } from '../..'
import {
  EntityUser,
  FreightEntity,
  IHeaders,
  ParamsEntity,
  PkhoaEntity,
  PksCurahEntity,
  PurchasingDetailEntity,
  PurchasingEntity,
  TypePengajuanKontrakPks,
} from '../../../domain'
import { CheckAvailableUser, IPurchasingDataSource, IUsersDataSource, CheckExistKontrakPks, upload } from '../../../data'
import { ApiResponse, reqAuthToken } from '@jpj-common/module'
import { addQueryStringKontrakPks, bodyLoginSchema, bodyRegisterSchema, headersSchema, paramsFreight, paramsKontrakPks, paramsPkhoa, paramsPksCurah, paramsTerminKontrakPks, queryStringAddPengajuanVendor, queryStringPkhoa } from '../../schema'
import { changedPasswordSchema, forgotPasswordSchema } from '../../schema/purchasing/password-schema'

export function PurchasingRoute(
  purchasingHandler: IPurchasingHandler,
  userDataSource: IUsersDataSource,
  purchasingDataSource: IPurchasingDataSource
) {
  const purchasingRoute = (
    fastify: FastifyInstance,
    options: FastifyPluginOptions,
    done: (error?: FastifyError) => void
  ) => {

    //@register-purchasing
    fastify.post<{ Body: EntityUser }>(
      '/register',
      {
        logLevel: 'info',
        schema: { body: bodyRegisterSchema }
      },
      purchasingHandler.register.bind(purchasingHandler)
    )

    //@login-purchasing
    fastify.post<{ Body: Pick<EntityUser, 'deviced_id' | 'kode_akses'> }>(
      '/login',
      {
        logLevel: 'info',
        schema: { body: bodyLoginSchema }
      },
      purchasingHandler.login.bind(purchasingHandler)
    )

    //@changed-password-purchasing
    fastify.post<{}>(
      '/changed-password',
      {
        logLevel: 'info',
        schema: { body: changedPasswordSchema },
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done)
        ]
      },
      purchasingHandler.changedPassword.bind(purchasingHandler)
    )

    //@forgot-password-purchasing
    fastify.post<{}>(
      '/forgot-password',
      {
        logLevel: 'info',
        schema: { body: forgotPasswordSchema },
      },
      purchasingHandler.forgotPassword.bind(purchasingHandler)
    )

    //@pengajuan-vendor (pkscurah/freight)
    fastify.post<{
      Body: PksCurahEntity & FreightEntity,
      Querystring: Pick<ParamsEntity, 'vendor_type'>,
      Headers: Pick<IHeaders, 'x-access-token'>
    }>(
      '/pengajuan-vendor',
      {
        logLevel: 'info',
        schema: {
          querystring: queryStringAddPengajuanVendor,
          headers: headersSchema
        },
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
          upload.fields([
            { name: 'file_npwp', maxCount: 1 },
            { name: 'file_pkp', maxCount: 1 },
            { name: 'file_rekbank' },
            { name: 'file_ktp', maxCount: 1 },
          ]),
        ],
      },
      (request: any, reply: any) => {
        const { vendor_type } = request.query
        if (!vendor_type) {
          return ApiResponse.badRequest(request, reply, {
            success: false,
            message: `Harap masukkan query string 'vendor_type(pkscurah atau freight)'`,
          })
        }

        if (vendor_type == 'pkscurah')
          purchasingHandler.pengajuanPksCurah(request, reply)

        if (vendor_type == 'freight')
          purchasingHandler.pengajuanFreight(request, reply)
      }
    )

    //@findall-pkscurah
    fastify
      .get<{ Querystring: ParamsEntity, Headers: Pick<IHeaders, 'x-access-token'> }>(
        '/pks-curah',
        {
          logLevel: 'info',
          schema: {
            headers: headersSchema
          },
          preHandler: [
            reqAuthToken,
            (req: any, rep: any, done: any) =>
              CheckAvailableUser(userDataSource, req, rep, done),
          ],
        },
        purchasingHandler.findAllPksCurah.bind(purchasingHandler)
      )
      //@updated-pkscurah
      .patch<{ Body: PksCurahEntity, Params: Pick<ParamsEntity, 'vendor_id'>, Headers: Pick<IHeaders, 'x-access-token'> }>(
        '/pks-curah/:vendor_id',
        {
          logLevel: 'info',
          schema: {
            headers: headersSchema,
            params: paramsPksCurah
          },
          preHandler: [
            reqAuthToken,
            (req: any, rep: any, done: any) =>
              CheckAvailableUser(userDataSource, req, rep, done),
            upload.fields([
              { name: 'file_npwp', maxCount: 1 },
              { name: 'file_pkp', maxCount: 1 },
              { name: 'file_rekbank' },
            ]),
          ],
        },
        purchasingHandler.updatePksCurah.bind(purchasingHandler)
      )

    //@detail-pkscurah
    fastify.get<{ Params: Pick<ParamsEntity, 'vendor_id'>, Headers: Pick<IHeaders, 'x-access-token'> }>(
      '/pks-curah/detail/:vendor_id',
      {
        logLevel: 'info',
        schema: {
          headers: headersSchema,
          params: paramsPksCurah
        },
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
        ],
      },
      purchasingHandler.findOnePksCurah.bind(purchasingHandler)
    )

    //@deleted-pkscurah
    fastify.delete<{ Params: Pick<ParamsEntity, 'vendor_id'>, Headers: Pick<IHeaders, 'x-access-token'> }>(
      '/pks-curah/delete/:vendor_id',
      {
        logLevel: 'info',
        schema: {
          headers: headersSchema,
          params: paramsPksCurah
        },
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
        ],
      },
      purchasingHandler.deletePksCurah.bind(purchasingHandler)
    )

    //@findall-pkscurah-bank
    fastify.get<{ Querystring: ParamsEntity, Headers: Pick<IHeaders, 'x-access-token'> }>(
      '/pks-curah/bank',
      {
        logLevel: 'info',
        schema: {
          headers: headersSchema,
        },
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
        ],
      },
      purchasingHandler.findAllPksCurahBank.bind(purchasingHandler)
    )

    //@findall-pkscurah-bank
    fastify.get<{ Params: Pick<ParamsEntity, 'vendor_id'>, Headers: Pick<IHeaders, 'x-access-token'> }>(
      '/pks-curah/bank/detail/:vendor_id',
      {
        logLevel: 'info',
        schema: {
          headers: headersSchema,
          params: paramsPksCurah
        },
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
        ],
      },
      purchasingHandler.findBankByPksCurahId.bind(purchasingHandler)
    )

    //@findall-freight
    fastify
      .get<{ Querystring: ParamsEntity, Headers: Pick<IHeaders, 'x-access-token'> }>(
        '/freight',
        {
          logLevel: 'info',
          schema: {
            headers: headersSchema,
          },
          preHandler: [
            reqAuthToken,
            (req: any, rep: any, done: any) =>
              CheckAvailableUser(userDataSource, req, rep, done),
          ],
        },
        purchasingHandler.findAllFreight.bind(purchasingHandler)
      )
      //@updated-freight
      .patch<{ Body: FreightEntity, Params: Pick<ParamsEntity, 'freight_id'>, Headers: Pick<IHeaders, 'x-access-token'> }>(
        '/freight/:freight_id',
        {
          logLevel: 'info',
          schema: {
            headers: headersSchema,
            params: paramsFreight
          },
          preHandler: [
            reqAuthToken,
            (req: any, rep: any, done: any) =>
              CheckAvailableUser(userDataSource, req, rep, done),
            upload.fields([
              { name: 'file_npwp', maxCount: 1 },
              { name: 'file_pkp', maxCount: 1 },
              { name: 'file_rekbank' },
              { name: 'file_ktp', maxCount: 1 },
            ]),
          ],
        },
        purchasingHandler.updateFreight.bind(purchasingHandler)
      )

    //@detail-freight
    fastify.get<{ Params: Pick<ParamsEntity, 'freight_id'>, Headers: Pick<IHeaders, 'x-access-token'> }>(
      '/freight/detail/:freight_id',
      {
        logLevel: 'info',
        schema: {
          headers: headersSchema,
          params: paramsFreight
        },
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
        ],
      },
      purchasingHandler.findOneFreight.bind(purchasingHandler)
    )

    //@deleted-freight
    fastify.delete<{ Params: Pick<ParamsEntity, 'freight_id'>, Headers: Pick<IHeaders, 'x-access-token'> }>(
      '/freight/delete/:freight_id',
      {
        logLevel: 'info',
        schema: {
          headers: headersSchema,
          params: paramsFreight
        },
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
        ],
      },
      purchasingHandler.deleteFreight.bind(purchasingHandler)
    )

    //@findall-freight-bank
    fastify.get<{ Querystring: ParamsEntity }>(
      '/freight/bank',
      {
        logLevel: 'info',
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
        ],
      },
      purchasingHandler.findAllFreightBank.bind(purchasingHandler)
    )

    //@findall-freight-bank
    fastify.get<{ Params: Pick<ParamsEntity, 'freight_id'>, Headers: Pick<IHeaders, 'x-access-token'> }>(
      '/freight/bank/detail/:freight_id',
      {
        logLevel: 'info',
        schema: {
          headers: headersSchema,
          params: paramsFreight
        },
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
        ],
      },
      purchasingHandler.findBankByFreightId.bind(purchasingHandler)
    )

    //@findall-stockpile
    fastify.get<{ Querystring: ParamsEntity }>(
      '/stockpile',
      {
        logLevel: 'info',
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
        ],
      },
      purchasingHandler.findAllStockpile.bind(purchasingHandler)
    )

    //@detail-stockpile
    fastify.get<{ Querystring: ParamsEntity }>(
      '/stockpile/detail/:stockpile_id',
      {
        logLevel: 'info',
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
        ],
      },
      purchasingHandler.findOneStockpile.bind(purchasingHandler)
    )

    //@findall-currency
    fastify.get<{ Querystring: ParamsEntity }>(
      '/currency',
      {
        logLevel: 'info',
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
        ],
      },
      purchasingHandler.findAllCurrency.bind(purchasingHandler)
    )

    //@detail-currency
    fastify.get<{ Querystring: ParamsEntity }>(
      '/currency/detail/:currency_id',
      {
        logLevel: 'info',
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
        ],
      },
      purchasingHandler.findOneCurrency.bind(purchasingHandler)
    )

    //@pengajuan-pkhoa
    fastify.post<{
      Body: PkhoaEntity,
      Headers: Pick<IHeaders, 'x-access-token'>
    }>(
      '/pkhoa',
      {
        logLevel: 'info',
        schema: {
          headers: headersSchema
        },
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
          upload.fields([
            { name: 'file_pkhoa', maxCount: 1 },
          ]),
        ],
      },
      purchasingHandler.pengajuanPkhoa.bind(purchasingHandler)
    )
      //@findall-pkhoa
      .get<{ Querystring: ParamsEntity }>(
        '/pkhoa',
        {
          logLevel: 'info',
          preHandler: [
            reqAuthToken,
            (req: any, rep: any, done: any) =>
              CheckAvailableUser(userDataSource, req, rep, done),
          ],
        },
        purchasingHandler.findAllPkhoa.bind(purchasingHandler)
      )
      //@updated-pkhoa
      .patch<{ Body: PkhoaEntity, Params: Pick<ParamsEntity, 'freight_cost_id'>, Headers: Pick<IHeaders, 'x-access-token'> }>(
        '/pkhoa/:freight_cost_id',
        {
          logLevel: 'info',
          schema: {
            headers: headersSchema,
            params: paramsPkhoa
          },
          preHandler: [
            reqAuthToken,
            (req: any, rep: any, done: any) =>
              CheckAvailableUser(userDataSource, req, rep, done),
            upload.fields([
              { name: 'file_pkhoa', maxCount: 1 },
            ]),
          ],
        },
        purchasingHandler.updatePkhoa.bind(purchasingHandler)
      )

    //@detail-pkhoa
    fastify.get<{ Params: Pick<ParamsEntity, 'freight_cost_id'>, Headers: Pick<IHeaders, 'x-access-token'> }>(
      '/pkhoa/detail/:freight_cost_id',
      {
        logLevel: 'info',
        schema: {
          headers: headersSchema,
          params: paramsPkhoa
        },
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
        ],
      },
      purchasingHandler.findOnePkhoa.bind(purchasingHandler)
    )

    //@deleted-pkhoa
    fastify.delete<{ Params: Pick<ParamsEntity, 'freight_cost_id'>, Headers: Pick<IHeaders, 'x-access-token'> }>(
      '/pkhoa/delete/:freight_cost_id',
      {
        logLevel: 'info',
        schema: {
          headers: headersSchema,
          params: paramsPkhoa
        },
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
        ],
      },
      purchasingHandler.deletePkhoa.bind(purchasingHandler)
    )

    //@find-pkhoa-exclude
    fastify.get<{ Querystring: Pick<ParamsEntity, 'vendor_id' | 'stockpile_id'>, Headers: Pick<IHeaders, 'x-access-token'> }>(
      '/pkhoa-exclude',
      {
        logLevel: 'info',
        schema: {
          headers: headersSchema,
          params: queryStringPkhoa
        },
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
        ],
      },
      purchasingHandler.findPkhoaExclude.bind(purchasingHandler)
    )

    //@pengajuan-kontrak-pks
    fastify.post<{
      Body: TypePengajuanKontrakPks,
      Querystring: Pick<ParamsEntity, 're_entry'>,
      Headers: Pick<IHeaders, 'x-access-token'>
    }>(
      '/kontrak-pks',
      {
        logLevel: 'info',
        schema: {
          querystring: addQueryStringKontrakPks,
          headers: headersSchema
        },
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
          upload.fields([
            { name: 'upload_file', maxCount: 1 },
            { name: 'approval_file', maxCount: 1 },
            { name: 'upload_file1', maxCount: 1 },
            { name: 'upload_file2', maxCount: 1 },
            { name: 'upload_file3', maxCount: 1 },
            { name: 'upload_file4', maxCount: 1 },
          ]),
          (req: any, rep: any, done: any) =>
            CheckExistKontrakPks(purchasingDataSource, req, rep, done),
        ],
      },
      purchasingHandler.pengajuanKontrakPks.bind(purchasingHandler)
    )
      //@update-file-kontrak-pks
      .patch<{
        Body: PurchasingEntity,
        Params: Pick<ParamsEntity, 'purchasing_id'>,
        Headers: Pick<IHeaders, 'x-access-token'>,
        Querystring: Pick<ParamsEntity, 'status' | 'final_status'>
      }>(
        '/kontrak-pks/:purchasing_id',
        {
          logLevel: 'info',
          schema: {
            params: paramsKontrakPks,
            headers: headersSchema
          },
          preHandler: [
            reqAuthToken,
            (req: any, rep: any, done: any) =>
              CheckAvailableUser(userDataSource, req, rep, done),
            upload.fields([
              { name: 'upload_file', maxCount: 1 },
              { name: 'import2', maxCount: 1 },
              { name: 'approval_file', maxCount: 1 },
              { name: 'upload_file1', maxCount: 1 },
              { name: 'upload_file2', maxCount: 1 },
              { name: 'upload_file3', maxCount: 1 },
              { name: 'upload_file4', maxCount: 1 },
            ]),
          ],
        },
        purchasingHandler.updateFilePurchasing.bind(purchasingHandler)
      )

    //@re-pengajuan-kontrak-pks
    fastify.post<{
      Body: PurchasingEntity,
      Querystring: ParamsEntity,
      Headers: Pick<IHeaders, 'x-access-token'>
    }>(
      '/re-entry/kontrak-pks',
      {
        logLevel: 'info',
        schema: {
          headers: headersSchema
        },
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done), upload.fields([
              { name: 'upload_file', maxCount: 1 },
              { name: 'approval_file', maxCount: 1 },
              { name: 'upload_file1', maxCount: 1 },
              { name: 'upload_file2', maxCount: 1 },
              { name: 'upload_file3', maxCount: 1 },
              { name: 'upload_file4', maxCount: 1 },
            ]),
        ],
      },
      purchasingHandler.pengajuanKontrakPks.bind(purchasingHandler)
    )

    //@findall-kontrak-pks
    fastify.get<{ Querystring: ParamsEntity, Headers: Pick<IHeaders, 'x-access-token'> }>(
      '/kontrak-pks',
      {
        logLevel: 'info',
        schema: {
          headers: headersSchema
        },
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
        ],
      },
      purchasingHandler.findAllKontrakPks.bind(purchasingHandler)
    )

    //@findaone-kontrak-pks
    fastify.get<{ Params: Pick<ParamsEntity, 'purchasing_id'>, Headers: Pick<IHeaders, 'x-access-token'> }>(
      '/kontrak-pks/:purchasing_id',
      {
        logLevel: 'info',
        schema: {
          headers: headersSchema,
          params: paramsKontrakPks
        },
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
        ],
      },
      purchasingHandler.findOneKontrakPks.bind(purchasingHandler)
    )
      //@delete-kontrak-pks
      .delete<{ Params: Pick<ParamsEntity, 'purchasing_id'>, Headers: Pick<IHeaders, 'x-access-token'> }>(
        '/kontrak-pks/:purchasing_id',
        {
          logLevel: 'info',
          schema: {
            headers: headersSchema,
            params: paramsKontrakPks
          },
          preHandler: [
            reqAuthToken,
            (req: any, rep: any, done: any) =>
              CheckAvailableUser(userDataSource, req, rep, done),
          ],
        },
        purchasingHandler.deletePengajuanKontrakPks.bind(purchasingHandler)
      )

    //@plan-payment-date
    fastify.get(
      '/plan-payment-date',
      {
        logLevel: 'info',
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
        ],
      },
      purchasingHandler.findPlanPaymentDate.bind(purchasingHandler)
    )

    //@update-termin-kontrak-pks
    fastify.patch<{
      Params: Pick<ParamsEntity, 'purchasing_detail_id'>,
      Headers: Pick<IHeaders, 'x-access-token'>
    }>(
      '/termin/update/:purchasing_detail_id',
      {
        logLevel: 'info',
        schema: {
          headers: headersSchema,
          params: paramsTerminKontrakPks
        },
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
        ]
      },
      purchasingHandler.updateTerminKontrakPks.bind(purchasingHandler)
    )

    //@delete-termin-kontrak-pks
    fastify.delete<{
      Params: Pick<ParamsEntity, 'purchasing_detail_id'>,
      Headers: Pick<IHeaders, 'x-access-token'>
    }>(
      '/termin/delete/:purchasing_detail_id',
      {
        logLevel: 'info',
        schema: {
          headers: headersSchema,
          params: paramsTerminKontrakPks
        },
        preHandler: [
          reqAuthToken,
          (req: any, rep: any, done: any) =>
            CheckAvailableUser(userDataSource, req, rep, done),
        ]
      },
      purchasingHandler.deleteTerminKontrakPks.bind(purchasingHandler)
    )

    done()
  }

  return purchasingRoute
}
