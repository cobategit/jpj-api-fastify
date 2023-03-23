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
        let revisi = ''
        let nameFile = ''

        if (req.routeOptions.method == 'PATCH') revisi = 'revisi'

        if (req.files['file_npwp']) {
            nameFile = `npwp-${revisi}` +
                req.body.vendor_name.split(' ')[1] +
                '-' +
                `${format(new Date(), 'yyyyMMddmmss')}` +
                `${path.extname(file.originalname)}`
        }
        if (req.files['file_pkp']) {
            nameFile = `pkp-${revisi}` +
                req.body.vendor_name.split(' ')[1] +
                '-' +
                `${format(new Date(), 'yyyyMMddmmss')}` +
                `${path.extname(file.originalname)}`
        }
        if (req.files['file_rek_bank']) {
            nameFile = `bank-${revisi}` +
                req.body.vendor_name.split(' ')[1] +
                '-' +
                `${format(new Date(), 'yyyyMMddmmss')}` +
                `${path.extname(file.originalname)}`
        }

        cb(
            null,
            `${nameFile}`
        )
    },
})

export const upload = multerFastify({
    storage: storageMulterFastify,
    limits: {
        fileSize: 600000000,
        files: 10,
        parts: 10,
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
