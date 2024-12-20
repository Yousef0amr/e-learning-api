
const validateRequest = (schema) => (req, res, next) => {

    const { error, value } = schema.validate({ ...req.body })

    if (error) {
        return res.status(422).json({ error })
    }
    return next()
}

export default validateRequest