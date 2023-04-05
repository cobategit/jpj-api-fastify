import multerFastify from 'fastify-multer'
import path from 'path'
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
        let vendor = req.body.vendor_name || req.body.freight_supplier

        if (req.routeOptions.method == 'PATCH') revisi = 'revisi'

        if (req.files['file_npwp']) {
            nameFile = `npwp-${revisi}` +
                vendor.split(' ')[1] +
                '-' +
                `${Date.now()}-` + `${Math.floor(Math.random() * 101)}` +
                `${path.extname(file.originalname)}`
        }
        if (req.files['file_pkp']) {
            nameFile = `pkp-${revisi}` +
                vendor.split(' ')[1] +
                '-' +
                `${Date.now()}-` + `${Math.floor(Math.random() * 101)}` +
                `${path.extname(file.originalname)}`
        }
        if (req.files['file_rekbank']) {
            nameFile = `bank-${revisi}` +
                vendor.split(' ')[1] +
                '-' +
                `${Date.now()}-` + `${Math.floor(Math.random() * 101)}` +
                `${path.extname(file.originalname)}`
        }
        if (req.files['file_ktp']) {
            nameFile = `ktp-${revisi}` + `${Math.floor(Math.random() * 101)}` +
                vendor.split(' ')[1] +
                '-' +
                `${Date.now()}-` + `${Math.floor(Math.random() * 101)}` +
                `${path.extname(file.originalname)}`
        }
        if (req.files['file_pkhoa']) {
            nameFile = `pkhoa-${revisi}` +
                '-' +
                `${Date.now()}-` + `${Math.floor(Math.random() * 101)}` +
                `${path.extname(file.originalname)}`
        }
        if (req.files['file_popks1']) {
            nameFile = `popks1-${req.body.stockpile_id}-${req.body.vendor_id}-${req.body.contract_type}-${req.body.type}-${revisi}` +
                '-' +
                `${Date.now()}-` + `${Math.floor(Math.random() * 101)}` +
                `${path.extname(file.originalname)}`
        }
        if (req.files['file_popks2']) {
            nameFile = `popks-approval-${req.body.stockpile_id}-${req.body.vendor_id}-${req.body.contract_type}-${req.body.type}-${revisi}` +
                '-' +
                `${Date.now()}-` + `${Math.floor(Math.random() * 101)}` +
                `${path.extname(file.originalname)}`
        }
        if (req.files['file_popks3']) {
            nameFile = `popks2-${req.body.stockpile_id}-${req.body.vendor_id}-${req.body.contract_type}-${req.body.type}-${revisi}` +
                '-' +
                `${Date.now()}-` + `${Math.floor(Math.random() * 101)}` +
                `${path.extname(file.originalname)}`
        }
        if (req.files['file_popks4']) {
            nameFile = `popks3-${req.body.stockpile_id}-${req.body.vendor_id}-${req.body.contract_type}-${req.body.type}-${revisi}` +
                '-' +
                `${Date.now()}-` + `${Math.floor(Math.random() * 101)}` +
                `${path.extname(file.originalname)}`
        }
        if (req.files['file_popks5']) {
            nameFile = `popks4-${req.body.stockpile_id}-${req.body.vendor_id}-${req.body.contract_type}-${req.body.type}-${revisi}` +
                '-' +
                `${Date.now()}-` + `${Math.floor(Math.random() * 101)}` +
                `${path.extname(file.originalname)}`
        }
        if (req.files['file_popks6']) {
            nameFile = `popks5-${req.body.stockpile_id}-${req.body.vendor_id}-${req.body.contract_type}-${req.body.type}-${revisi}` +
                '-' +
                `${Date.now()}-` + `${Math.floor(Math.random() * 101)}` +
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