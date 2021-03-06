/*eslint-env node */
'use strict';

var express = require('express');
var controller = require('./search.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/book', controller.book);
router.get('/images/:name', controller.getImage);

module.exports = router;