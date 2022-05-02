"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = exports.RCEcharts = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var core_1 = require("echarts/core");
var event_1 = require("../../event");
exports.RCEcharts = (0, react_1.forwardRef)(function (props, ref) {
    var option = props.option, theme = props.theme, config = props.config, notMerge = props.notMerge, _a = props.autoResize, autoResize = _a === void 0 ? true : _a, lazyUpdate = props.lazyUpdate, restProps = __rest(props, ["option", "theme", "config", "notMerge", "autoResize", "lazyUpdate"]);
    var instance = (0, react_1.useRef)();
    var element = (0, react_1.createRef)();
    (0, react_1.useImperativeHandle)(ref, function () { return instance.current; });
    (0, react_1.useEffect)(function () {
        instance.current = undefined;
    }, [theme]);
    (0, react_1.useEffect)(function () {
        if (element.current && !instance.current) {
            instance.current = (0, core_1.init)(element.current, theme, config);
        }
    }, [config, element, theme]);
    (0, react_1.useEffect)(function () {
        if (option && instance.current) {
            option.backgroundColor = 'transparent';
            instance.current.setOption(option, notMerge, lazyUpdate);
        }
    }, [option, notMerge, lazyUpdate]);
    (0, react_1.useLayoutEffect)(function () {
        if (autoResize) {
            var subscription_1 = (0, event_1.addEvent)('resize', function () {
                if (instance.current) {
                    instance.current.resize();
                }
            });
            return function () { return subscription_1.remove(); };
        }
    }, [instance, autoResize]);
    return (0, jsx_runtime_1.jsx)("div", __assign({}, restProps, { ref: element }), theme);
});
exports.use = core_1.use;
