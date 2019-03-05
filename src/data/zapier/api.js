const request = require('request-promise');

const config = require('../../config');

class ZapierApiDataService {
    constructor () {
        this.ZAPIER_WEBHOOK_URL = config.zapier.webhookUrl;
    }
    async save ({ name, token, email, adAccount, page }) {
        return request({
            method: 'POST',
            uri: this.ZAPIER_WEBHOOK_URL,
            body: {
                name,
                token,
                email,
                adAccountName: adAccount.name,
                adAccountId: adAccount.id,
                pageName: page.name,
                pageId: page.id,
            },
            json: true,
        })
    }
}

module.exports = ZapierApiDataService;
