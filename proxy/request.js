/**
 * Created by zhdarry on 2017/7/4.
 */
'use strict';
const superagent = require('superagent');
const config = require('../config');

class Request{
    mainRequest(method, url, {params, data, headers} = {}){
        return new Promise(function (resovle, reject) {
            const request = new superagent(method, url);
            request.set('Content-Type', 'application/json').set('Accept', 'application/json');
            request.set('Content-Type', 'application/x-www-form-urlencoded');
            if(headers)
                request.set(headers);
            if(params)
                request.query(params);
            if(data)
                request.send(data);
            request.end((err,res)=>{
                if(res && res.body)
                    resovle(res.body);
                else
                    reject(err || res);
            })
        })
    }
    _get(url, opts = {}) {
        return this.mainRequest('get', url, opts );
    }
    _post(url, opts = {}) {
        return this.mainRequest('post', url, opts );
    }
    _del(url, opts = {}) {
        return this.mainRequest('del', url, opts );
    }
    _put(url, opts = {}) {
        return this.mainRequest('put', url, opts);
    }
}

class Ajax extends Request{
    constructor(name){
        super();
        this.name = name;
    }
    query(params){
        return this._get(config.apiurl+this.name,{params});
    }
    add(params,data){
        return this._post(config.apiurl+this.name,{params,data});
    }
    update(params,data){
        return this._put(config.apiurl+this.name,{params,data});
    }
    del(params,data){
        return this._del(config.apiurl+this.name,{params,data});
    }
}
module.exports = Ajax;