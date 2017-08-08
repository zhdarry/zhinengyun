/**
 * Created by zhdarry on 2017/7/26.
 */
const dateFormat = function (d) {
    const date = eval('new ' + (d.replace(/\//g, '')));
    return date.getFullYear()+"."+(parseInt(date.getMonth())+1)+"."+date.getDate();
};

const toastMessage = function (message,is) {
    if(is===true) {
        $('.alert-success', window.top.document).html(message).show().fadeOut(3000);
    }
    else {
        $('.alert-danger', window.top.document).html(message).show().fadeOut(3000);
    }
}