'use strict';
const express = require('express');
const middlewares = require('../middlewares/check');
const Ajax = require('../proxy/request');

const router = express.Router();

//主页
router.get('/',middlewares.checkLogin, function (req, res, next) {
    res.render('index', { title: 'Index' });
});

//登录
router.get('/login',function (req, res, next) {
    res.render('login',{ title: '登录'});
});
//登录请求
router.post('/login',function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    req.session.user = {name:username};
    res.redirect('/');
});
//登出
router.get('/logout',function (req, res, next) {
    req.session.user = null;
    res.redirect('/login');
}); 


//节点管理
router.get('/node',function (req, res, next) {
    res.render('node', { title: 'node' });
});


module.exports = router;