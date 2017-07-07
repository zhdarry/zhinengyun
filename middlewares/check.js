/**
 * Created by zhdarry on 2017/7/4.
 */
module.exports = {
    //检查是否登录
    checkLogin : function (req, res, next) {
        if(!req.session.user){
            res.redirect('/login');
            next();
        }else{
            res.locals.user = req.session.user;
            next();
        }
    }
}