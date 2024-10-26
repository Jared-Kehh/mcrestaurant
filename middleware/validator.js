const validator = require('../helpers/validate');

const saveContact = (req, res, next) => {
    const validatorRules = {
        name: 'required|string',
        foodtype: 'required|string',
        foodtype2: 'required|string',
        hoursopen: 'required|string',
        daysopen: 'required|string',
        location: 'required|string',
        description: 'required|string'
    };
    validator(req.body, validatorRules, {}, (error, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: error
            });
        } else {
            next();
        }
    });
};

module.exports = { saveContact }; // export saveContact