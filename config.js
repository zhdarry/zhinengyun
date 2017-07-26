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
    //请求获取appKey
    appID:"cpp.3d11019343ad8b315a3310408ff7",

    db:"mongodb://localhost:27017/wechat-update",

}