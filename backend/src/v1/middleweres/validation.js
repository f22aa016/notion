const { validationResult } = require('express-validator');

exports.validate = (req, res, next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json({ erros: erros.array() });
    }
    next();
};