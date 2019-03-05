const request = require('request-promise');

const config = require('../../config');

class ZapierApiDataService {
    constructor () {
        this.ZAPIER_WEBHOOK_URL = config.zapier.webhookUrl;
    }
    async save ({ name, token, email, adAccount, page }) {
        // TODO: zapier call
    }
}

module.exports = ZapierApiDataService;
