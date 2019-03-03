const config = require('../../config');

const { FacebookApiDataService } = require('../../data');

class FacebookService {
    constructor () {
        this._facebookApiDataService = new FacebookApiDataService();
    }

    async getAdAccounts ({ token }) {
        const adAccounts = await this._facebookApiDataService.page({
            endpoint: 'me/adaccounts',
            fields: ['id', 'name'],
            params: { limit: 250 },
            token,
        });

        return adAccounts;
    }

    async getPages ({ token }) {
        const pages = await this._facebookApiDataService.page({
            endpoint: 'me/accounts',
            fields: ['id', 'name'],
            params: { limit: 250 },
            token,
        });

        return pages;
    }

    async exchangeForNonExpiryToken ({ token }) {
        const params = {
            grant_type: 'fb_exchange_token',
            client_id: config.facebook.appId,
            client_secret: config.facebook.appSecret,
            fb_exchange_token: token,
        };
        const nonExpiryToken = await this._facebookApiDataService.call({
            endpoint: 'oauth/access_token',
            params,
            token,
        });

        return nonExpiryToken.access_token;
    }
}

module.exports = FacebookService;
