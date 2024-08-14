import speakeasy from 'speakeasy'

const generateOtpSecret = () => {
    return speakeasy.generateSecret({ length: 20 }).base32
}

const generateOTP = (secret) => {
    return speakeasy.totp({
        secret,
        encoding: 'base32'
    })
}

const verifyOTP = (secret, token) => {
    return speakeasy.totp.verify({
        secret,
        token,
        encoding: 'base32',
        window: 4
    })
}

const otpService = {
    generateOtpSecret,
    generateOTP,
    verifyOTP
}


export default otpService


