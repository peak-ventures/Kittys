const fs = require('fs');

const getRoutes = (app) => new Promise((resolve, reject) => {
    let routes = {};

    fs.readdir('./src/routes', (err, files) => {
        for (let file of files) {
            if (file === 'index.js') {
                continue;
            }
            const routePath = `./${file}/index.js`;
            routes = { ...routes, ...require(routePath)(app) };
        }

        return resolve(routes);
    });
});

module.exports = async (app) => {
    return await getRoutes(app);
};
