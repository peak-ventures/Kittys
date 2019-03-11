const crypto = require('crypto');
const request = require('request-promise');

const config = require('../../config');

class FacebookApiDataService {
    constructor () {
        this.APP_SECRET = config.facebook.appSecret;
        this.BASE_URL = config.facebook.facebookBaseApiUrl;
    }

    _generateAppSecretProof ({ token }) {
        const secret = this.APP_SECRET;
        const appSecretProof = crypto.createHmac('sha256', secret);
        appSecretProof.update(token);
        return appSecretProof.digest('hex');
    }

    _urler ({ endpoint, token, fields = [], params = {} }) {
        let url = `${this.BASE_URL}${endpoint}?fields=${fields.join(',')}`;
            url += `&access_token=${token}&appsecret_proof=${this._generateAppSecretProof({ token })}`;
        Object.keys(params).forEach((param) => {
            url += typeof params[param] === 'string' ?
                `&${param}=${params[param]}` :
                `&${param}=${JSON.stringify(params[param])}`;
        });

        return url;
    }

    _processError ({ error, url }) {
        if (typeof error !== 'string') {
            error = error.error ? error.error : error;
            error = error.error ? error.error : error;
            error = error.message ? error.message : error;
        }

        const newError = new Error(error);
        newError.url = url;
        throw newError;
    }

    async call ({ endpoint, token, fields, params, method = 'GET' }) {
        const url = this._urler({ endpoint, token, fields, params });
        try {
            const result = await request({ method, url, json: true });
            return result;
        } catch (error) {
            throw this._processError({ url, error });
        }
    }

    async page ({ endpoint, token, fields, params }) {
        let url = this._urler({ endpoint, token, fields, params });
        try {
            let data = [];
            while (url) {
                if (!url.includes('appsecret_proof')) {
                    url = `${url}&appsecret_proof=${this._generateAppSecretProof({ token })}`
                }

                const result = await request({ method: 'GET', url, json: true });
                if (!result || !result.paging || !result.paging.next) {
                    url = null;
                } else {
                    url = result.paging.next;
                }

                data = data.concat(result.data);
            }

            return data;
        } catch (error) {
            throw this._processError({ url, error });
        }
    }
}

module.exports = FacebookApiDataService;
