/**
 * Created by zhdarry on 2017/7/4.
 */
module.exports = {
    session:{
        name:"user",
        secret:"zhinengyun secret",
        cookie:{
            maxAge:1000*60*60*24
        },
        resave:true,
        saveUninitialized:false
    },
    apiurl:"http://www.tinglema.cn:9000/",
    apiurlGet:"http://www.tinglema.cn:9000/query/",
    apiurlPost:"http://www.tinglema.cn:9000/platform/",
    apiurlConfig:"http://www.tinglema.cn:9000/config/project",
    wechat_oauth:"/wechat/oauth",
    //根据授权菜单获取菜单链接
    menuUrl:{"节点管理":"/map","人员管理":"/user","设备管理":"/device","安全等级":"/class","特殊人员管理":"/suser"},
    //请求获取appKey
    appID:"cpp.3d11019343ad8b315a3310408ff7",

    db:"mongodb://localhost:27017/wechat-update",

}