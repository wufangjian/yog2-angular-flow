/**
 * @file FIS 配置
 * @author
 */

// chrome下可以安装插件实现livereload功能
// https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
// fis.config.set('livereload.port', 35729);

// if (fis.IS_FIS3) {
//     fis.media('debug').match('*', {
//         optimizer: null,
//         useHash: false,
//         deploy: fis.plugin('http-push', {
//             receiver: 'http://127.0.0.1:8085/yog/upload',
//             to: '/'
//         })
//     });
//     fis.media('debug-prod').match('*', {
//         deploy: fis.plugin('http-push', {
//             receiver: 'http://127.0.0.1:8085/yog/upload',
//             to: '/'
//         })
//     });
// }
// else {
//     fis.config.set('deploy', {
//         debug: {
//             to: '/',
//             // yog2 默认的部署入口，使用调试模式启动 yog2 项目后，这个入口就会生效。IP与端口请根据实际情况调整。
//             receiver: 'http://127.0.0.1:8085/yog/upload'
//         }
//     });
// }

var deployInfo = require('./deploy.config');
fis.set('namespace', deployInfo.modName);


// Chrome livereload plugin settings
fis.set('livereload.port', 35729);

// 由于使用了npm，有很多非必须资源。通过set project.files对象指定需要编译的文件夹和引用的资源
fis.set('project.files', deployInfo.projectFiles);

fis.match('*.tpl', {

    // invoke fis-optimizer-html-minifier
    optimizer: fis.plugin('html-minifier')
});

fis.match('::packager', {
    packager: fis.plugin('map', {
        '/client/pkg/vendor-plug.js': [
            '/client/static/dep/moment/moment.min.js',
            '/client/static/dep/angular/angular.min.js',
            '/client/static/dep/jquery/dist/jquery.min.js',
            '/client/static/dep/bootstrap-daterangepicker/daterangepicker.js',
            '/client/static/dep/angular-daterangepicker/angular-daterangepicker.min.js',
            '/client/static/dep/angular-animate/angular-animate.min.js',
            '/client/static/dep/tb/tb.js',
            '/client/static/dep/underscore/underscore-min.js',
            '/client/static/dep/angular-breadcrumb/angular-breadcrumb.min.js',
            '/client/static/dep/angular-sanitize/angular-sanitize.min.js',
            '/client/static/dep/angular-ui-router/release/angular-ui-router.min.js',
            '/client/static/dep/AngularJS-Toaster/toaster.min.js',
            '/client/static/dep/angular-resource/angular-resource.min.js',
            '/client/static/dep/ng-file-upload-shim/ng-file-upload-shim.min.js',
            '/client/static/dep/ng-file-upload/ng-file-upload.min.js',
            '/client/static/dep/angular-smart-table/dist/smart-table.min.js',
            '/client/static/dep/angular-strap/dist/angular-strap.min.js',
            '/client/static/dep/angular-strap/dist/angular-strap.tpl.min.js',
            '/client/static/dep/angular-i18n/angular-locale_zh-cn.js',
            '/client/static/dep/sweetalert/dist/sweetalert.min.js',
            '/client/static/dep/ngSweetAlert/SweetAlert.min.js',
            '/client/static/dep/angular-loading-bar/build/loading-bar.min.js',
            '/client/static/dep/angular-busy/dist/angular-busy.min.js',
            '/client/static/dep/ui-select/dist/select.min.js',
            '/client/static/dep/angular-base64/angular-base64.min.js',
            '/client/static/dep/angular-ui-validate/validate.min.js',
            '/client/static/dep/angular-ui-grid/ui-grid.min.js',
            '/client/static/dep/angular-autodisable/angular-autodisable.min.js',
            '/client/static/dep/angular-loading-bar/loading-bar.min.js',
            '/client/static/dep/angular-ui-bootstrap/ui-bootstrap.js',
            '/client/static/dep/angular-ui-bootstrap/ui-bootstrap-tpls.js',
            '/client/static/dep/checklist-model/checklist-model.js',
            '/client/static/dep/angular-messages/angular-messages.js',
            '/client/static/dep/angular-toastr/angular-toastr.js',
            '/client/static/dep/angular-toastr/angular-toastr.tpls.js',
            '/client/static/dep/lodash/lodash.js',
            '/client/static/js/mod.js'
            // '/client/widget/**/*.js'
        ],
        '/client/pkg/dualmultiselect.js': [
            '/client/static/dep/angular-tree-view/angular-tree-view.js',
            '/client/static/dep/angular-dual-multi-select/angular-dual-multi-select.js'
        ],
        '/client/pkg/ssp.js': [
            '/client/widget/*.js',
            '/client/widget/common/**/*.js'
        ],
        '/client/pkg/channel.js': [
            '/client/widget/channel/channel.api.js',
            '/client/widget/channel/channel.constant.js',
            '/client/widget/channel/channel.service.js',
            '/client/widget/channel/list/list.controller.js',
            '/client/widget/channel/create/create.controller.js',
            '/client/widget/channel/edit/edit.controller.js',
            '/client/widget/channel/flow/flow.controller.js',
            '/client/widget/channel/winpop/winpop.controller.js'
        ],

        '/client/pkg/vendor.css': [
            '/client/static/dep/bootstrap-additions/dist/bootstrap-additions.min.css',
            '/client/static/dep/angular-motion/dist/angular-motion.min.css',
            '/client/static/dep/sweetalert/dist/sweetalert.css',
            '/client/static/dep/font-awesome/css/font-awesome.min.css',
            '/client/static/dep/angular-loading-bar/build/loading-bar.min.css',
            '/client/static/dep/angular-busy/dist/angular-busy.min.css',
            '/client/static/dep/AngularJS-Toaster/toaster.min.css',
            '/client/static/dep/ui-select/dist/select.min.css',
            '/client/static/dep/bootstrap-daterangepicker/daterangepicker-bs3.css',
            '/client/static/dep/bootstrap/dist/css/bootstrap.min.css',
            '/client/static/dep/angular-tree-view/angular-tree-view.css',
            '/client/static/dep/angular-ui-grid/ui-grid.min.css',
            '/client/static/dep/angular-loading-bar/loading-bar.min.css',
            '/client/static/dep/angular-toastr/angular-toastr.css',
            '/client/static/styles/animate.css',
            '/client/static/styles/bootstrap.reset.css'
        ],
        '/client/pkg/ssp.css': [
            '/client/static/styles/app.css'
        ]
    })
});

// 想玩less的，福利来了
// fis.match('*.{less,css}', {
//     optimizer: fis.plugin('clean-css', {
//         keepBreaks: false
//     })
// });


fis.match('*.js', {
    preprocessor: fis.plugin('annotate'),

    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js')
});

fis.match('/client/static/**', {
    useHash: true
});

fis.match('/client/widget/**', {
    useHash: true
});

// Deploy Debug Mode
fis.media('debug')
    .match('*', {
        // optimizer: null,
        // useHash: false,
        // npm install nm-deploy-http-push --save-dev 基于fis的远程部署能力
        deploy: fis.plugin('http-push', {
            receiver: 'http://' + deployInfo.host + ':' + deployInfo.staticPort + '/yog/upload',
            to: '/'
        })
    });

// 上线
fis.media('prod')
    .match('/client/widget/**', {
        useHash: true
    })
    .match('/static/pkg/**', {
        useHash: true
    })
    .match('*.tpl', {
        domain: false
    })
    .match('*.sh', {
        release: false
    })
    .match('*.py', {
        release: false
    });


