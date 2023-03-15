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
                `public/${req.jenis}/${req.kategori}/${req.type}`
            )
        )
    },
    filename: (req: any, file: any, cb: any) => {
        cb(
            null,
            `${req.vendor_name}-${format(new Date(), 'ddmmss')}${path.extname(
                file.originalname
            )}`
        )
    },
})

export const upload = multerFastify({
    storage: storageMulterFastify,
    limits: { fileSize: 100000000 },
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
