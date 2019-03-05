const config = require('../../config');

const { ZapierApiDataService } = require('../../data');

class ZapierService {
    constructor () {
        this._zapierApiDataService = new ZapierApiDataService();
    }

    async save ({ fbUserId, name, token, email, adAccount, page }) {
        return this._zapierApiDataService.save({ fbUserId, name, token, email, adAccount, page });
    }
}

module.exports = ZapierService;
