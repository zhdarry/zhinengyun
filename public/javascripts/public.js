/**
 * Created by zhdarry on 2017/7/26.
 */
'use strict';
(function ($) {
    const dateFormat = {
        yyyymmdd:function (date) {
            const date = new Date(date);
            return date.getFullYear()+"-"+date.getMonth()+1+"-"+date.getDate();
        },
    }
}(jQuery));