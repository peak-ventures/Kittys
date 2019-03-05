const config = {
    port: 3000,
    facebook: {
        scope: 'pages_show_list,ads_read',
        appId: '',
        appSecret: '',
        apiVersion: 'v3.2',
        baseUrl: 'https://graph.facebook.com/',
    },
    zapier: {
        webhookUrl: 'https://hooks.zapier.com/hooks/catch/1778820/pqeefa/',
    }
};
config.facebook.facebookBaseApiUrl = `${config.facebook.baseUrl}${config.facebook.apiVersion}/`;

module.exports = config;
