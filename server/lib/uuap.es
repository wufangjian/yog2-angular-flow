/**
 * @file UUAP Middleware
 * @author wangwenfei
 */
import session from 'express-session';
import * as xml2js from 'xml2js';
import * as url from 'url';
import * as http from 'http';
import * as https from 'https';

function validateByHttp(req, res, next, ops, callback) {
    const vUrl = url.format(ops);
    http.get(vUrl, (uuapRes) => {
        callback(req, res, next, uuapRes);
    });
}

function validateByHttps(req, res, next, ops, callback) {
    const vUrl = url.format(ops);
    https.get(vUrl, (uuapRes) => {
        callback && callback(req, res, uuapRes);
    });
}

function validateTicket(config) {
    return (req, res, next, uuapRes) => {
        let responseText = '';
        uuapRes.on('error', (e) => {
            res.send(e.message);
        });
        uuapRes.on('data', (chunk) => {
            responseText += chunk;
        });
        uuapRes.on('end', () => {
            let parser = new xml2js.Parser();
            let statusCode = res.statusCode;
            let userName;
            if (statusCode === 200) {
                parser.parseString(responseText, (error, data) => {
                    if (error) {
                        res.send(error.message);
                    }
                    else {
                        userName = data['cas:serviceResponse']['cas:authenticationSuccess'][0]['cas:user'][0];
                        req.session.userName = userName;
                        res.redirect(config.path || '/');
                    }

                });
            }
            else {
                res.send('UUAP验证失败状态吗：' + statusCode);
            }

        });
    };
}

export default (params) => {
    const {
        config,
        uuapConfig,
        currentApp
    } = params;
    let service;
    return (req, res, next) => {
        const {query, session} = req;
        const {ticket} = query;
        let urlOps;

        if (session && session.userName) {
            next();
        }
        else if (ticket) {
            !session && (req.session = {session: {}});
            urlOps = {
                protocol: uuapConfig.protocol,
                hostname: uuapConfig.hostname,
                port: uuapConfig.port,
                pathname: uuapConfig.validateMethod,
                query: {
                    ticket: ticket,
                    service: service
                }
            };

            if (uuapConfig.protocol === 'http') {
                validateByHttp(req, res, next, urlOps, validateTicket({
                    path: currentApp
                }));
            }
            else {
                validateByHttps(req, res, next, urlOps, validateTicket({
                    path: currentApp
                }));
            }
        }
        else {
            service = url.format({
                protocol: req.protocol,
                hostname: req.hostname,
                port: config.port,
                pathname: req.originalUrl
            });
            let redirecturl = url.format({
                protocol: uuapConfig.protocol,
                hostname: uuapConfig.hostname,
                port: uuapConfig.port,
                query: {
                    service: service
                }
            });
            res.redirect(redirecturl);
        }
    };
};
