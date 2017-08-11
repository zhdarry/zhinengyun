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
    }).catch(error=>{
        next(error);
    })
});
//获取项目设备信息
router.get('/device/:id',function (req, res, next) {
    request.get('select',{query:"device",pid:req.params.id}).then(data =>{
        res.render('admin/device',{
            title:"Device",
            data:data
        })
    }).catch(error=>{
        next(error);
    })
});

//获取平台操作员列表
router.get('/sysuser',function (req, res, next) {
    if(req.xhr){
        Promise.all([ request.get('select', {
            query: "sysuser.list",
            session: req.session.user.token,
            name: req.query.name
        }), request.get('select', {
            query: "sysuser.proj",
            session: req.session.user.token,
            name: req.query.name
        }),request.get('select', {
            query: "sysuser.menu",
            session: req.session.user.token,
            name: req.query.name
        })]).then(([data,proj,menu])=>{
            res.json([data.data[0],proj.data,menu.data])
        })

    }else {
        Promise.all([request.get('dict', {query: 'role'}),request.get('select', {query: 'project'}), request.get('dict', {query: 'menu'}), request.get('select', {
            query: "sysuser.list",
            session: req.session.user.token,
            name: req.query.name
        })]).then(([role,project, menu, data]) => {
            res.render('admin/sysuser', {
                title: "Sysuser",
                role:role.data,
                project:project.data,
                menu:menu.data,
                data: data
            })
        }).catch(error=>{
            next(error);
        })
    }
});
//添加平台操作员
router.post('/sysuser',function (req, res, next) {
    const data = req.body;
    request.post('sysuser',{cmd:req.query.cmd,session:req.session.user.token},{
        name:data.name,
        password:des.encrypt('123456'),
        display:data.display,
        expiredate:data.expiredate,
        nrole:data.nrole,
        isused:data.isused
    }).then(msg1=>{
        if(data.nrole=="1") {
            request.post('sysuser', {cmd: "grant", session: req.session.user.token}, {
                name: data.name,
                project: data.project.join !== undefined ? data.project.join(',') : data.project,
                menu: data.menu.join !== undefined ? data.menu.join(',') : data.menu
            }).then(msg2=>{
                res.json(msg2);
            })
        }else if(data.nrole=="2"){
            request.post('sysuser', {cmd: "grant", session: req.session.user.token}, {
                name: data.name,
                project: data.project
            }).then(msg2=>{
                res.json(msg2);
            })
        }else{
            res.json(msg1);
        }
    }).catch(error=>{
        console.log(error);
        res.end();
    })

});

//删除操作员
router.post('/deluser',function (req, res, next) {
    request.getSecure('sysuser',{cmd:"del",name:req.query.name,session:req.session.user.token}).then(data=>{
        res.json(data);
    }).catch(error=>{
        res.send(error);
    })
});

//重置操作员密码
router.post('/reset',function (req, res, next) {
    request.get('select',{query:"sysuser.list",session:req.session.user.token,name:req.query.name}).then(data=>{
        const _data = data.data[0];
        _data.password = des.encrypt('123456');
        request.post('sysuser',{cmd:"set",session:req.session.user.token},_data).then(data=>{
            console.log(data);
            res.json(data);
        })
    })
})


module.exports = router;