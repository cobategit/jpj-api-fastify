import multerFastify from 'fastify-multer'
import path from 'path'
import { format } from 'date-fns'
import { AppError } from '@jpj-common/module'

export const storageMulterFastify = multerFastify.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(
            null,
            path.join(
                process.cwd(),
                `public/${req.body.jenis_file}`
            )
        )
    },
    filename: (req: any, file: any, cb: any) => {
        if (req.files['file_npwp']) {
            cb(
                null,
                'npwp-' +
                req.body.vendor_code +
                '-' +
                `${format(new Date(), 'yyyyMMddmmss')}` +
                `${path.extname(file.originalname)}`
            )
        }
        if (req.files['file_pkp']) {
            cb(
                null,
                'pkp-' +
                req.body.vendor_code +
                '-' +
                `${format(new Date(), 'yyyyMMddmmss')}` + `${path.extname(file.originalname)}`
            )
        }
        if (req.files['file_rek_bank']) {
            cb(
                null,
                'rek-bank-' +
                req.body.vendor_code +
                '-' +
                `${format(new Date(), 'yyyyMMddmmss')}` + `${path.extname(file.originalname)}`
            )
        }
        if (req.files['file_ktp']) {
            cb(
                null,
                'ktp-' +
                req.body.vendor_code +
                '-' +
                `${format(new Date(), 'yyyyMMddmmss')}` + `${path.extname(file.originalname)}`
            )
        }
    },
})

export const upload = multerFastify({
    storage: storageMulterFastify,
    limits: {
        fileSize: 600000000,
        files: 10
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jepg|docx|pdf)$/)) {
            return cb(
                new AppError(500, false,
                    'Please Upload File :pdf or .jpg or .jpeg or .png or .docx',
                    '501'
                )
            )
        }
        cb(null, true)
    },
})
