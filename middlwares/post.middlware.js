const Joi = require('joi')

const ValidateCreatePost = async (req, res, next) => {

    const bodyOfRequest = req.body // this is what we want to validate
    const schema = Joi.object({
        text: Joi.string().required()
    })

    const valid = await schema.validate(bodyOfRequest);

    console.log({valid})

    if (valid.error) {
        return res.status(422).json({
            message: valid.error.message
        })
    }

    next();
}

module.exports = {
    ValidateCreatePost
}