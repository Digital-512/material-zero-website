"use strict";

const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');

const index = require('./routes/index');
const config = require('./config/config.json');

const app = express();
const port = config.general.port;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use gzip compression and security patch
app.use(compression());
app.use(helmet());

// Initialize public directory
app.use(express.static(path.join(__dirname, 'public')));

// Initialize routes
app.use('/', index(config));

// Start app
app.listen(port, () => console.log('App running on port ' + port));

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error("Page not found!");
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        error: err,
        config: config
    });
});
