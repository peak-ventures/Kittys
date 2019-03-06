'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const next = require('next');
const url = require('url');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const config = require('./src/config');

const DEV = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || config.port;

if (!DEV && cluster.isMaster) {
    console.log(`Node cluster master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
    });
} else {
    const nextApp = next({ dir: '.', DEV });
    const nextHandler = nextApp.getRequestHandler();

    nextApp.prepare()
        .then(() => {
            const app = express();

            if (!DEV) {
                // Enforce SSL & HSTS in production
                app.use(function(req, res, next) {
                    var proto = req.headers["x-forwarded-proto"];
                    if (proto === "https") {
                        res.set({
                            'Strict-Transport-Security': 'max-age=31557600' // one-year
                        });
                        return next();
                    }
                    res.redirect("https://" + req.headers.host + req.url);
                });
            }

            // Middleware
            app.use(cors());
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(bodyParser.json());

            // Static files
            app.use('/static', express.static(path.join(__dirname, 'static'), {
                maxAge: DEV ? '0' : '365d'
            }));

            require('./src/routes/v1')(app);

            // Default catch-all renders Next app
            app.get('*', (req, res) => {
                res.set({
                  'Cache-Control': 'public, max-age=3600'
                });
                const parsedUrl = url.parse(req.url, true);
                nextHandler(req, res, parsedUrl);
            });

            app.listen(PORT, err => {
                if (err) throw err;
                console.log(`Listening on port ${PORT}`);
            });
        });
}