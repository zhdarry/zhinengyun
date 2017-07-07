/*------------------------------------------------------
    Author : www.webthemez.com
    License: Commons Attribution 3.0
    http://creativecommons.org/licenses/by/3.0/
---------------------------------------------------------  */

(function ($) {
    "use strict";
    const mainApp = {
        initFunction: function () {
            this.adjustIfHt();
            this.menuSelect();
            this.toggleSelect();
        },
        //取消掉iframe的双拉条
        adjustIfHt: function () {
            const ht = $(window).height();//获取浏览器窗口的整体高度；
            const topHeader = $(".top-navbar").height();//获取头部高度，定义一个变量名为topHeader
            $("#menuFrame").height(ht - topHeader);//计算右边高度：窗口高度-头部高度
        },
        //顶部收缩按钮切换效果
        toggleSelect: function () {
            $("#sideNav").click(function () {
                if ($(this).hasClass('closed')) {
                    $('.navbar-side').animate({left: '0px'});
                    $(this).removeClass('closed');
                    $('#page-wrapper').animate({'margin-left': '260px'});

                }
                else {
                    $(this).addClass('closed');
                    $('.navbar-side').animate({left: '-260px'});
                    $('#page-wrapper').animate({'margin-left': '0px'});
                }
            });
        },
        //设置点击菜单栏的active切换效果
        menuSelect: function () {
            $('#main-menu li a').click(function () {
                if($(this).hasClass('active-menu'))
                    return;
                $('.active-menu').removeClass('active-menu');
                $(this).addClass('active-menu');
            })
        }
    }
    // Initializing ///

    $(document).ready(function () {
        mainApp.initFunction();
    });

}(jQuery));
