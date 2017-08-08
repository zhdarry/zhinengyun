/**
 * Created by zhdarry on 2017/7/26.
 */
'use strict';
module.exports = function (req, res, next) {
    res.locals.dateFormat = function (d) {
        var date = eval('new ' + (d.replace(/\//g, '')));
        return date.getFullYear()+"."+(parseInt(date.getMonth())+1)+"."+date.getDate();
    };
    next();
}