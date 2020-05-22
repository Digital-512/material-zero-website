"use strict";

const express = require('express');
const router = express.Router();

module.exports = (config) => {
    router.get('/:module?', async (req, res) => {
        res.render('index', {
            module: req.params.module || 'home',
            config: config
        });
    });

    return router;
}
