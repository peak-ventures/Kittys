const config = require('../config');
const { ZapierService } = require('../services');

const save = async (req, res) => {
    if (!req.body) {
        return res.status(400).send('Body is required');
    }

    const { name, token, email, adAccount, page } = req.body;
    try {
        const zapierService = new ZapierService();
        await zapierService.save({ name, token, email, adAccount, page });
        return res.status(200).send();
    } catch (e) {
        return res.status(400).send('Error saving data to zapier');
    }
};


module.exports = {
    save
};
