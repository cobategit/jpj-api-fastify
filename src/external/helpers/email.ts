import { OptionsEmail } from "../../domain"
import nodemailer from 'nodemailer'

export const sendEmail = async (options: OptionsEmail) => {
    const toptions = {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER_AUTH,
            pass: process.env.EMAIL_PASS_AUTH,
        },
    }

    const mailOptions = {
        from: options.from,
        to: options.to,
        subject: options.subject,
        html: options.html,
    }

    const transpoter = nodemailer.createTransport(toptions)

    await transpoter.sendMail(mailOptions)
}