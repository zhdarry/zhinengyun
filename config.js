/**
 * Created by zhdarry on 2017/7/4.
 */
module.exports = {
    session:{
        name:"user",
        secret:"zhinengyun secret",
        cookie:{
            maxAge:1000*60*60*24*3
        },
        resave:true,
        saveUninitialized:false
    },
    apiurl:'localhost:3000/'
}