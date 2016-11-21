<!DOCTYPE html>
{% html lang="en" ng-app="sspApp" %}
{% head %}
    <meta charset="UTF-8">
    <title ng-bind="$state.current.data.pageTitle"></title>
    <meta http-equiv="X-UA-Compatible" content="IE=IE8" >
    <link rel="shortcut icon" href="http://static.tieba.baidu.com/tb/favicon.ico" />

    {% require "ssp:static/styles/animate.css" %}
    {% require "ssp:static/styles/app.css" %}
    {% require "ssp:static/styles/bootstrap.reset.css" %}
    
    <base href="/ssp/">
{% endhead %}
{% body %}
    <!--[if lte IE 8]>
      <p class="browsehappy">您正在使用一种<strong>过时的</strong>浏览器. 请<a href="http://browsehappy.com/">更新升级您的浏览器</a>以查看此页面.</p>
    <![endif]-->

    <aside class="left-panel" ng-class="appConfig.collapsed ? 'collapsed' : ''">
        <div class="logo">
            <a href="" class="logo-expanded">
                <i class="fa fa-paw"></i>
            </a>
        </div>
        <side-nav></side-nav>
    </aside>

    <section class="content">
        {% widget "home:widget/navigation/navbar.tpl" %}
        <div class="container-fluid pt15">
            <div class="label label-info"><i class="fa fa-map-marker"></i><ul class="breadcrumb" ncy-breadcrumb></ul></div>
            
        </div>
        <div class="wraper container-fluid" ui-view="main"></div>
        <app-footer name="appConfig.name"></app-footer>
    </section>
    {% require "ssp:static/dep/moment/moment.min.js" %}
    {% require "ssp:static/dep/angular/angular.min.js" %}
    {% require "ssp:static/dep/jquery/dist/jquery.min.js" %}
    {% require "ssp:static/dep/bootstrap-daterangepicker/daterangepicker.js" %}
    {% require "ssp:static/dep/angular-daterangepicker/angular-daterangepicker.min.js" %}
    {% require "ssp:static/dep/angular-animate/angular-animate.min.js" %}
    {% require "ssp:static/dep/tb/tb.js" %}
    {% require "ssp:static/dep/underscore/underscore-min.js" %}
    {% require "ssp:static/dep/angular-breadcrumb/angular-breadcrumb.min.js" %}
    {% require "ssp:static/dep/angular-sanitize/angular-sanitize.min.js" %}
    {% require "ssp:static/dep/angular-ui-router/release/angular-ui-router.min.js" %}
    {% require "ssp:static/dep/angular-ui-grid/ui-grid.min.js" %}
    {% require "ssp:static/dep/angular-autodisable/angular-autodisable.min.js" %}
    {% require "ssp:static/dep/angular-resource/angular-resource.min.js" %}
    {% require "ssp:static/dep/ng-file-upload-shim/ng-file-upload-shim.min.js" %}
    {% require "ssp:static/dep/ng-file-upload/ng-file-upload.min.js" %}
    {% require "ssp:static/dep/angular-smart-table/dist/smart-table.min.js" %}
    {% require "ssp:static/dep/angular-strap/dist/angular-strap.min.js" %}
    {% require "ssp:static/dep/angular-strap/dist/angular-strap.tpl.min.js" %}
    {% require "ssp:static/dep/angular-i18n/angular-locale_zh-cn.js" %}
    {% require "ssp:static/dep/sweetalert/dist/sweetalert.min.js" %}
    {% require "ssp:static/dep/ngSweetAlert/SweetAlert.min.js" %}
    {% require "ssp:static/dep/angular-loading-bar/loading-bar.min.js" %}
    {% require "ssp:static/dep/angular-busy/dist/angular-busy.min.js" %}
    {% require "ssp:static/dep/ui-select/dist/select.min.js" %}
    {% require "ssp:static/dep/angular-base64/angular-base64.min.js" %}
    {% require "ssp:static/dep/lodash/lodash.js" %}
    {% require "ssp:static/dep/angular-ui-bootstrap/ui-bootstrap.js" %}
    {% require "ssp:static/dep/angular-ui-bootstrap/ui-bootstrap-tpls.js" %}
    {% require "ssp:static/dep/checklist-model/checklist-model.js" %}
    {% require "ssp:static/dep/angular-tree-view/angular-tree-view.js" %}
    {% require "ssp:static/dep/angular-dual-multi-select/angular-dual-multi-select.js" %}
    {% require "ssp:static/dep/angular-ui-validate/validate.min.js" %}
    {% require "ssp:static/dep/angular-messages/angular-messages.js" %}
    {% require "ssp:static/dep/angular-toastr/angular-toastr.js" %}
    {% require "ssp:static/dep/angular-toastr/angular-toastr.tpls.js" %}

    {% script %}
        require('../widget/app')
    {% endscript %}
{% endbody %}
{% endhtml %}