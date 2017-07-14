'use strict';
const express = require('express');
const middlewares = require('../middlewares/check');
const des = require('../utils/des');
const request = require('../proxy/request');

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
    if(username&&password) {
        request.post('login', {}, {
            sysuser: username,
            password: des.encrypt(password)
        }).then(data => {
            if(data.result>0){
                req.session.user = {name:username,token:data.data.token};
                res.json({code:1,msg:'登录成功'});
            }else{
                res.json({code:-1,msg:"密码错误"});
            }
        })
    }else
        res.json({code:0,msg:"信息不完整"})

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