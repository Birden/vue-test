const service = require('../services/product.service');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        const result = await service.getAll();
        res.status(200).json(result);
    } catch (err) {
        errorHandler(res, err);
    }
};

module.exports.create = async (req, res) => {
    try {
        const result = await service.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        errorHandler(res, err);
    }
};
