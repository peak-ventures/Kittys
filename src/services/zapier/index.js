const config = require('../../config');

const { ZapierApiDataService } = require('../../data');

class ZapierService {
    constructor () {
        this._zapierApiDataService = new ZapierApiDataService();
    }

    async save ({ userId, name, token, email, adAccount, page }) {
        return this._zapierApiDataService.save({ userId, name, token, email, adAccount, page });
    }
}

module.exports = ZapierService;
