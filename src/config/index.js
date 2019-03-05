const config = {
    port: 3000,
    facebook: {
        scope: 'pages_show_list,ads_read',
        appId: '1860355937552252',
        appSecret: '3fb42ae36795d44ce2fab0a2d96da7ee',
        apiVersion: 'v3.2',
        baseUrl: 'https://graph.facebook.com/',
    },
};
config.facebook.facebookBaseApiUrl = `${config.facebook.baseUrl}${config.facebook.apiVersion}/`;

module.exports = config;
