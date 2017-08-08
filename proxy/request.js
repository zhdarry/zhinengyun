/**
 * Created by zhdarry on 2017/7/4.
 */
'use strict';
const request = require('superagent');
const config = require('../config');
const signature = require('./signature');

module.exports = {
    get: function (name, params = {}) {
        return new Promise((resolve, reject) => {
            signature.setHeaders().then(headers=>{
                request
                    .get(config.apiurlGet + name)
                    .set(headers)
                    .query(params)
                    .buffer(true).parse(request.parse['application/json'])
                    .end((err, res) => {
                        if (res && res.body)
                            resolve(res.body);
                        else
                            reject(err || res);
                    })
            })

        })
    },
    getSecure: function (name, params = {}) {
        return new Promise((resolve, reject) => {
            signature.setHeaders().then(headers => {
                request
                    .get(config.apiurlPost + name)
                    .set(headers)
                    .query(params)
                    .buffer(true).parse(request.parse['application/json'])
                    .end((err, res) => {
                        if (res && res.body)
                            resolve(res.body);
                        else
                            reject(err || res);
                    })
            })
        })
    },
    post: function (name, params = {}, data = {}) {
        return new Promise((resolve, reject) => {
            signature.setHeaders().then(headers => {
                request
                    .post(config.apiurlPost + name)
                    .set(headers)
                    .query(params)
                    .send(data)
                    .buffer(true).parse(request.parse['application/json'])
                    .end((err, res) => {
                        if (res && res.body)
                            resolve(res.body);
                        else
                            reject(err || res);
                    })
            })
        })
    },
    post_ext: function (name, params = {}, data = {}) {
        return new Promise((resolve, reject) => {
            signature.setHeaders().then(headers => {
                request
                    .post(config.apiurlGet + name)
                    .set(headers)
                    .query(params)
                    .send(data)
                    .buffer(true).parse(request.parse['application/json'])
                    .end((err, res) => {
                        if (res && res.body)
                            resolve(res.body);
                        else
                            reject(err || res);
                    })
            })
        })
    },
    config:function (method, params = {}, data = {}) {
        return new Promise((resolve, reject) => {
            signature.setHeaders().then(headers => {
                if(method === 'get'){
                    request
                        .get(config.apiurlConfig)
                        .set(headers)
                        .query(params)
                        .send(data)
                        .buffer(true).parse(request.parse['application/json'])
                        .end((err, res) => {
                            if (res && res.body)
                                resolve(res.body);
                            else
                                reject(err || res);
                        })
                }else if(method === 'post'){
                    request
                        .post(config.apiurlConfig)
                        .set(headers)
                        .query(params)
                        .send(data)
                        .buffer(true).parse(request.parse['application/json'])
                        .end((err, res) => {
                            if (res && res.body)
                                resolve(res.body);
                            else
                                reject(err || res);
                        })
                }else
                    reject("参数错误");

            })
        })
    }
};


/*
class Request {
    mainRequest(method, url, {params, data, headers} = {}) {
        return new Promise(function (resovle, reject) {
            const request = new superagent(method, url);
            //request.set(signature.setHeaders);
            console.log(params,data);
            if (headers)
                request.set(headers);
            if (params)
                request.query(params);
            if (data)
                request.send(data);
            request.end((err, res) => {
                if (res && res.body)
                    resovle(res.body);
                else
                    reject(err || res);
            })
        })
    }


    _get(url, opts = {}) {
        console.log(url,opts);
        return this.mainRequest('get', url, opts);
    }

    _post(url, opts = {}) {
        console.log(url,opts);
        return this.mainRequest('post', url, opts);
    }

    _del(url, opts = {}) {
        return this.mainRequest('del', url, opts);
    }

    _put(url, opts = {}) {
        return this.mainRequest('put', url, opts);
    }
}

class Ajax extends Request {
    constructor(name) {
        super();
        this.name = name;
    }

    query(params) {
        return this._get(config.apiurlGet + this.name, {params});
    }

    querySecure(params) {
        return this._get(config.apiurlPost + this.name, {params});
    }
    post(params,data){
        return this._post(config.apiurlPost + this.name, {params, data});
    }
    add(params, data) {
        return this._post(config.apiurlPost + this.name, {params, data});
    }

    update(params, data) {
        return this._put(config.apiurlPost + this.name, {params, data});
    }

    del(params, data) {
        return this._del(config.apiurlPost + this.name, {params, data});
    }
    test(params,data) {
        return this._get(config.apiurl + this.name, {params, data});
    }
}
module.exports = Ajax;*/
