/**
 * Created by zhdarry on 2017/7/10.
 */
'use strict';
const request = require('superagent');
const crypto = require('crypto');
const config = require('../config');

let cachedAppKey = null;
function getAppkey() {
    return new Promise((resolve,reject)=>{
        if(cachedAppKey){
            resolve(cachedAppKey);
        }else{
            request.get(config.apiurlPost + "appkey")
                .query({appid: config.appID})
                .buffer(true).parse(request.parse['application/json'])
                .end((err, data) => {
                    if (data && data.body) {
                        cachedAppKey = typeof data.body.data === 'string'?JSON.parse(data.body.data):data.body.data;
                        resolve(cachedAppKey);
                    }
                    else {
                        reject("error");
                    }
                });
        }
    })
}
function getHeaders(data) {
    return new Promise((resolve,reject) => {
        const appname = data.appname;
        const timestamp = new Date().getTime();
        const shasum = crypto.createHash('sha1');
        shasum.update((appname + data.key + timestamp).toString());
        const signature = shasum.digest('hex');
        const headers = {
            "appname": appname,
            "timestamp": timestamp,
            "signature": signature
        };
        resolve(headers);
    })

}
exports.setHeaders = function () {
    return getAppkey().then(data => {
        return getHeaders(data);
    })
}