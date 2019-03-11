const config = require('../config');
const { FacebookService } = require('../services');

const getAdAccounts = async (req, res) => {
    if (!req.query || !req.query.token) {
        return res.status(400).send('Token is required');
    }
    if (!req.query.email) {
        return res.status(400).send('Email is required');
    }

    const { token, email } = req.query;
    try {
        const facebookService = new FacebookService();
        const adAccounts = await facebookService.getAdAccounts({ token });
        return res.status(200).json(adAccounts);
    } catch (e) {
        return res.status(400).send('Error getting ad accounts');
    }
};

const getPages = async (req, res) => {
    if (!req.query || !req.query.token) {
        return res.status(400).send('Token is required');
    }
    if (!req.query.email) {
        return res.status(400).send('Email is required');
    }

    const { token, email } = req.query;
    try {
        const facebookService = new FacebookService();
        const pages = await facebookService.getPages({ token });
        return res.status(200).json(pages);
    } catch (e) {
        return res.status(400).send('Error getting pages');
    }
};

const exchangeForNonExpiryToken = async (req, res) => {
    if (!req.query || !req.query.token) {
        return res.status(400).send('Token is required');
    }

    const { token } = req.query;
    try {
        const facebookService = new FacebookService();
        const newToken = await facebookService.exchangeForNonExpiryToken({ token });
        return res.status(200).json(newToken);
    } catch (e) {
        return res.status(400).send('Error exchanging token');
    }
};

module.exports = {
    getAdAccounts,
    getPages,
    exchangeForNonExpiryToken
};
