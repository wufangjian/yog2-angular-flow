
/**
 * @file tb custom plugins method
 * @author wangwenfei
 * @description 新增tbattr和tbprop方法，代替jquery的attr和prop方法，在返回参数时进行一次转义
 */

(function ($) {
    var funcs = {
        tbattr: $.fn.attr,
        tbprop: $.fn.prop
    };
    var funcsOverwrited = {};
    var overWriteHandle = function (i) {
        var func = funcs[i];
        funcsOverwrited[i] = function () {
            var ret = func.apply(this, arguments);
            if (typeof ret === 'string') {
                ret = $.tb.escapeHTML(ret);
            }
            return ret;
        };
    };

    for (var i in funcs) {
        if (funcs.hasOwnProperty(i)) {
            overWriteHandle(i);
        }
    }
    $.fn.extend(funcsOverwrited);
})(window.jQuery);
