'use strict';
const express = require('express');
const middlewares = require('../middlewares/check');
const des = require('../utils/des');
const request = require('../proxy/request');

const router = express.Router();

//主页
router.get('/',middlewares.checkLogin, function (req, res, next) {
    res.render('admin', { title: 'Admin' });
});

//获取项目信息
router.get('/project',function (req, res, next) {
    request.get('select',{query:'project'}).then(data => {
        res.render('admin/project',{
            title:'Project',
            data:data
        })
    })
})

module.exports = router;