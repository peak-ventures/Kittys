const config = require('../../config');

const { ZapierApiDataService } = require('../../data');

class ZapierService {
    constructor () {
        this._zapierApiDataService = new ZapierApiDataService();
    }

    async save ({ name, token, email, adAccount, page }) {
        await this._zapierApiDataService.save({ name, token, email, adAccount, page });
    }
}

module.exports = ZapierService;
