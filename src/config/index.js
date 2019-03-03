const config = {
    port: 3000,
    facebook: {
        scope: 'pages_show_list,ads_read',
        appId: '',
        appSecret: '',
        apiVersion: 'v3.2',
        baseUrl: 'https://graph.facebook.com/',
    },
};
config.facebook.facebookBaseApiUrl = `${config.facebook.baseUrl}${config.facebook.apiVersion}/`;

module.exports = config;
