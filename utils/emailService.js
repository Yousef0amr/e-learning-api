import nodemailer from 'nodemailer'


const sendVerificationEmail = async (email, otp) => {
    const transport = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        }

    })

    return await transport.sendMail(
        {
            from: process.env.EMAIL,
            to: email,
            subject: 'Email verifacition',
            text: `your otp code is => ${otp}`,
        }
    )
}


export default sendVerificationEmail





