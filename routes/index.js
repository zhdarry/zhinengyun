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
                switch (data.data.category) {
                    case "admin":
                        res.json({code:1,msg:"登录成功",url:"/admin"});
                        break;

                    case "project":
                        res.json({code:1,msg:"登录成功",url:"/"});
                        break;
                }
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
//修改密码
router.post('/changePassword',function (req, res, next) {
    const oldP= des.encrypt(req.body.oldP);
    const newP = des.encrypt(req.body.newP);
    request.post('sysuser',{
        cmd:'pwd',
        session:req.session.user.token},{
        password_old:oldP,
        password_new:newP
    }).then(data=>{
        res.json(data);
    })
})

router.get('/getVerifyCode',function (req, res) {

    const superagent = require('superagent');
    superagent
        .get('http://sdk2.028lk.com:9880/utf8/BatchSend2.aspx?CorpID=CDJS003051&Pwd=zm0513@&Mobile=18681381406&Content=您好！您本次的验证码为：123456请注意查收&Cell=&SendTime=')
        .end(function (err, data) {
            if(err){
                console.log(err);
                res.end();
            }else {
                console.log(data.text);
                res.json(data);
            }

    })
});


//节点管理
router.get('/node',function (req, res, next) {
    res.render('node', { title: 'node' });
});


module.exports = router;