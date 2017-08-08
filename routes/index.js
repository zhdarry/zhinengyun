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


//节点管理页面
router.get('/map',function (req, res, next) {
    Promise.all([request.get('/select',{query:"project"}),request.get('/dict',{query:"map.type"})]).then(([data,type])=>{
        res.render('project/map', {
            title: 'Map',
            data:data.data,
            type:type.data,
        });
    }).catch(error=>{
        next(error);
    })
});
//获取节点信息
router.get('/getmap',function (req, res, next) {
    if(req.xhr){
        request.post_ext('/select',{query:"map"},{
            pid:req.query.pid,
            lv1:req.query.lv1,
            lv2:req.query.lv2,
            lv3:req.query.lv3,
            lv4:req.query.lv4,
            lv5:req.query.lv5,
            lv6:req.query.lv6,
        }).then(data=>{
            res.json(data);
        }).catch(error=>{
            next(error);
        })
    }else{
        res.end();
    }
});
//新增项目节点
router.post('/newmap',function (req, res, next) {
    if(req.xhr){
        const data = req.body;
        data[data.nl]=data.value;
        request.post('map',{cmd:"add",pid:data.pid,session:req.session.user.token},{
            lv1:data.lv1,
            lv2:data.lv2||"",
            lv3:data.lv3||"",
            lv4:data.lv4||"",
            lv5:data.lv5||"",
            lv6:data.lv6||"",
            type:data.type,
            floor:data.floor||0
        }).then(data=>{
            res.send(data);
        }).catch(error=>{
            next(error);
        })
    }
});
//修改节点
router.post('/editmap',function (req, res, next) {
    if(req.xhr){
        const data = req.body;
        request.post('map',{cmd:"set",pid:data.pid,session:req.session.user.token},{
            lv1:data.lv1,
            lv2:data.lv2||"",
            lv3:data.lv3||"",
            lv4:data.lv4||"",
            lv5:data.lv5||"",
            lv6:data.lv6||"",
            value:data.value,
            type:data.type,
            floor:data.floor||0
        }).then(data=>{
            res.send(data);
        }).catch(error=>{
            next(error);
        })
    }
});
//删除节点
router.post('/delmap',function (req, res, next) {
    if(req.xhr){
        const data = req.body;
        request.post('map',{cmd:"del",pid:data.pid,session:req.session.user.token},{
            lv1:data.lv1,
            lv2:data.lv2||"",
            lv3:data.lv3||"",
            lv4:data.lv4||"",
            lv5:data.lv5||"",
            lv6:data.lv6||""
        }).then(data=>{
            res.send(data);
        }).catch(error=>{
            next(error);
        })
    }
});

//获取人员信息页面
router.get('/user',function (req, res, next) {
    request.get('select',{query:"user"}).then(data=>{
        console.log(data);
        res.render('project/user',{
            title:"User",
            data:data
        })
    }).catch(error=>{
        next(error);
    })
});
//获取设备信息
router.get('/device',function (req, res, next) {
    res.render('project/device',{
        title:"Device",

    })
})

//获取设备状态
router.get('/status',function (req, res, next) {
    request.getSecure('select',{query:"device.status",pid:"0001"}).then(data=>{
        console.log(data);
        res.render('project/status',{
            title:"Status",
            data:data
        })
    }).catch(error=>{
        next(error);
    })
})



module.exports = router;