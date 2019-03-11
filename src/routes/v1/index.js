const { facebookCtrl, zapierCtrl } = require('../../controllers');

module.exports = app => {
    app.route('/v1/facebook/adaccounts').get(facebookCtrl.getAdAccounts);
    app.route('/v1/facebook/pages').get(facebookCtrl.getPages);
    app.route('/v1/facebook/exchangeForNonExpiryToken').get(facebookCtrl.exchangeForNonExpiryToken);
    app.route('/v1/zapier/save').post(zapierCtrl.save);
};
