import multerFastify from 'fastify-multer'
import path from 'path'
import { format } from 'date-fns'

export const storageMulterFastify = multerFastify.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, path.join(process.cwd(), `public/${req.jenis}/${req.kategori}/${req.type}`))
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, `${req.vendor_name}-${format(new Date(), 'ddmmss')}${path.extname(file.originalname)}`)
    }
})

export const upload = multerFastify({ storage: storageMulterFastify })