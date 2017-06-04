/*
Product Name: dhtmlxChart 
Version: 5.0 
Edition: Standard 
License: content of this file is covered by GPL. Usage outside GPL terms is prohibited. To obtain Commercial or Enterprise license contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
*/

if (!window.dhtmlx) {
    dhtmlx = {}
}
dhtmlx.assert = function(b, a) {
    if (!b) {
        dhtmlx.error(a)
    }
};
dhtmlx.assert_enabled = function() {
    return false
};
dhtmlx.assert_event = function(f, c) {
    if (!f._event_check) {
        f._event_check = {};
        f._event_check_size = {}
    }
    for (var b in c) {
        f._event_check[b.toLowerCase()] = c[b];
        var e = -1;
        for (var d in c[b]) {
            e++
        }
        f._event_check_size[b.toLowerCase()] = e
    }
};
dhtmlx.assert_method_info = function(e, b, d, f) {
    var a = [];
    for (var c = 0; c < f.length; c++) {
        a.push(f[c][0] + " : " + f[c][1] + "\n   " + f[c][2].describe() + (f[c][3] ? "; optional": ""))
    }
    return e.name + "." + b + "\n" + d + "\n Arguments:\n - " + a.join("\n - ")
};
dhtmlx.assert_method = function(c, a) {
    for (var b in a) {
        dhtmlx.assert_method_process(c, b, a[b].descr, a[b].args, (a[b].min || 99), a[b].skip)
    }
};
dhtmlx.assert_method_process = function(f, b, e, g, c, d) {
    var a = f[b];
    if (!d) {
        f[b] = function() {
            if (arguments.length != g.length && arguments.length < c) {
                dhtmlx.log("warn", "Incorrect count of parameters\n" + f[b].describe() + "\n\nExpecting " + g.length + " but have only " + arguments.length)
            } else {
                for (var h = 0; h < g.length; h++) {
                    if (!g[h][3] && !g[h][2](arguments[h])) {
                        dhtmlx.log("warn", "Incorrect method call\n" + f[b].describe() + "\n\nActual value of " + (h + 1) + " parameter: {" + (typeof arguments[h]) + "} " + arguments[h])
                    }
                }
            }
            return a.apply(this, arguments)
        }
    }
    f[b].describe = function() {
        return dhtmlx.assert_method_info(f, b, e, g)
    }
};
dhtmlx.assert_event_call = function(c, b, a) {
    if (c._event_check) {
        if (!c._event_check[b]) {
            dhtmlx.log("warn", "Not expected event call :" + b)
        } else {
            if (dhtmlx.isNotDefined(a)) {
                dhtmlx.log("warn", "Event without parameters :" + b)
            } else {
                if (c._event_check_size[b] != a.length) {
                    dhtmlx.log("warn", "Incorrect event call, expected " + c._event_check_size[b] + " parameter(s), but have " + a.length + " parameter(s), for " + b + " event")
                }
            }
        }
    }
};
dhtmlx.assert_event_attach = function(b, a) {
    if (b._event_check && !b._event_check[a]) {
        dhtmlx.log("warn", "Unknown event name: " + a)
    }
};
dhtmlx.assert_property = function(b, a) {
    if (!b._settings_check) {
        b._settings_check = {}
    }
    dhtmlx.extend(b._settings_check, a)
};
dhtmlx.assert_check = function(c, b) {
    if (typeof c == "object") {
        for (var a in c) {
            dhtmlx.assert_settings(a, c[a], b)
        }
    }
};
dhtmlx.assert_settings = function(h, e, d) {
    d = d || this._settings_check;
    if (d) {
        if (!d[h]) {
            return dhtmlx.log("warn", "Unknown propery: " + h)
        }
        var g = "";
        var b = "";
        var a = false;
        for (var c = 0; c < d[h].length; c++) {
            var f = d[h][c];
            if (typeof f == "string") {
                continue
            }
            if (typeof f == "function") {
                a = a || f(e)
            } else {
                if (typeof f == "object" && typeof f[1] == "function") {
                    a = a || f[1](e);
                    if (a && f[2]) {
                        dhtmlx.assert_check(e, f[2])
                    }
                }
            }
            if (a) {
                break
            }
        }
        if (!a) {
            dhtmlx.log("warn", "Invalid configuration\n" + dhtmlx.assert_info(h, d) + "\nActual value: {" + (typeof e) + "} " + e)
        }
    }
};
dhtmlx.assert_info = function(b, f) {
    var a = f[b];
    var e = "";
    var d = [];
    for (var c = 0; c < a.length; c++) {
        if (typeof rule == "string") {
            e = a[c]
        } else {
            if (a[c].describe) {
                d.push(a[c].describe())
            } else {
                if (a[c][1] && a[c][1].describe) {
                    d.push(a[c][1].describe())
                }
            }
        }
    }
    return "Property: " + b + ", " + e + " \nExpected value: \n - " + d.join("\n - ")
};
if (dhtmlx.assert_enabled()) {
    dhtmlx.assert_rule_color = function(a) {
        if (typeof a != "string") {
            return false
        }
        if (a.indexOf("#") !== 0) {
            return false
        }
        if (a.substr(1).replace(/[0-9A-F]/gi, "") !== "") {
            return false
        }
        return true
    };
    dhtmlx.assert_rule_color.describe = function() {
        return "{String} Value must start from # and contain hexadecimal code of color"
    };
    dhtmlx.assert_rule_template = function(a) {
        if (typeof a == "function") {
            return true
        }
        if (typeof a == "string") {
            return true
        }
        return false
    };
    dhtmlx.assert_rule_template.describe = function() {
        return "{Function},{String} Value must be a function which accepts data object and return text string, or a sting with optional template markers"
    };
    dhtmlx.assert_rule_boolean = function(a) {
        if (typeof a == "boolean") {
            return true
        }
        return false
    };
    dhtmlx.assert_rule_boolean.describe = function() {
        return "{Boolean} true or false"
    };
    dhtmlx.assert_rule_object = function(a, b) {
        if (typeof a == "object") {
            return true
        }
        return false
    };
    dhtmlx.assert_rule_object.describe = function() {
        return "{Object} Configuration object"
    };
    dhtmlx.assert_rule_string = function(a) {
        if (typeof a == "string") {
            return true
        }
        return false
    };
    dhtmlx.assert_rule_string.describe = function() {
        return "{String} Plain string"
    };
    dhtmlx.assert_rule_htmlpt = function(a) {
        return !! dhtmlx.toNode(a)
    };
    dhtmlx.assert_rule_htmlpt.describe = function() {
        return "{Object},{String} HTML node or ID of HTML Node"
    };
    dhtmlx.assert_rule_notdocumented = function(a) {
        return false
    };
    dhtmlx.assert_rule_notdocumented.describe = function() {
        return "This options wasn't documented"
    };
    dhtmlx.assert_rule_key = function(b) {
        var a = function(c) {
            return b[c]
        };
        a.describe = function() {
            var d = [];
            for (var c in b) {
                d.push(c)
            }
            return "{String} can take one of next values: " + d.join(", ")
        };
        return a
    };
    dhtmlx.assert_rule_dimension = function(a) {
        if (a * 1 == a && !isNaN(a) && a >= 0) {
            return true
        }
        return false
    };
    dhtmlx.assert_rule_dimension.describe = function() {
        return "{Integer} value must be a positive number"
    };
    dhtmlx.assert_rule_number = function(a) {
        if (typeof a == "number") {
            return true
        }
        return false
    };
    dhtmlx.assert_rule_number.describe = function() {
        return "{Integer} value must be a number"
    };
    dhtmlx.assert_rule_function = function(a) {
        if (typeof a == "function") {
            return true
        }
        return false
    };
    dhtmlx.assert_rule_function.describe = function() {
        return "{Function} value must be a custom function";
    };
    dhtmlx.assert_rule_any = function(a) {
        return true
    };
    dhtmlx.assert_rule_any.describe = function() {
        return "Any value"
    };
    dhtmlx.assert_rule_mix = function(d, c) {
        var e = function(a) {
            if (d(a) || c(a)) {
                return true
            }
            return false;
        };
        e.describe = function() {
            return d.describe();
        };
        return e;
    }
}
dhtmlx.codebase = "./";
dhtmlx.copy = function(b) {
    var a = dhtmlx.copy._function;
    a.prototype = b;
    return new a();
};
dhtmlx.copy._function = function() {};
dhtmlx.extend = function(b, a) {
    for (var c in a) {
        b[c] = a[c];
    }
    if (dhtmlx.assert_enabled() && a._assert) {
        b._assert();
        b._assert = null;
    }
    dhtmlx.assert(b, "Invalid nesting target");
    dhtmlx.assert(a, "Invalid nesting source");
    if (a._init) {
        b._init()
    }
    return b
};
dhtmlx.proto_extend = function() {
    var f = arguments;
    var c = f[0];
    var b = [];
    for (var e = f.length - 1; e > 0; e--) {
        if (typeof f[e] == "function") {
            f[e] = f[e].prototype
        }
        for (var d in f[e]) {
            if (d == "_init") {
                b.push(f[e][d])
            } else {
                if (!c[d]) {
                    c[d] = f[e][d]
                }
            }
        }
    }
    if (f[0]._init) {
        b.push(f[0]._init);
    }
    c._init = function() {
        for (var g = 0; g < b.length; g++) {
            b[g].apply(this, arguments)
        }
    };
    c.base = f[1];
    var a = function(g) {
        this._init(g);
        if (this._parseSettings) {
            this._parseSettings(g, this.defaults)
        }
    };
    a.prototype = c;
    c = f = null;
    return a
};
dhtmlx.bind = function(b, a) {
    return function() {
        return b.apply(a, arguments)
    }
};
dhtmlx.require = function(a) {
    if (!dhtmlx._modules[a]) {
        dhtmlx.assert(dhtmlx.ajax, "load module is required");
        dhtmlx.exec(dhtmlx.ajax().sync().get(dhtmlx.codebase + a).responseText);
        dhtmlx._modules[a] = true
    }
};
dhtmlx._modules = {};
dhtmlx.exec = function(code) {
    if (window.execScript) {
        window.execScript(code)
    } else {
        window.eval(code)
    }
};
dhtmlx.methodPush = function(a, c, b) {
    return function() {
        var d = false;
        d = a[c].apply(a, arguments);
        return d
    }
};
dhtmlx.isNotDefined = function(b) {
    return typeof b == "undefined"
};
dhtmlx.delay = function(d, b, c, a) {
    setTimeout(function() {
        var e = d.apply(b, c);
        d = b = c = null;
        return e
    },
    a || 1)
};
dhtmlx.uid = function() {
    if (!this._seed) {
        this._seed = (new Date).valueOf()
    }
    this._seed++;
    return this._seed
};
dhtmlx.toNode = function(a) {
    if (typeof a == "string") {
        return document.getElementById(a)
    }
    return a
};
dhtmlx.toArray = function(a) {
    return dhtmlx.extend((a || []), dhtmlx.PowerArray)
};
dhtmlx.toFunctor = function(str) {
    return (typeof(str) == "string") ? eval(str) : str
};
dhtmlx._events = {};
dhtmlx.event = function(d, c, a, b) {
    d = dhtmlx.toNode(d);
    var e = dhtmlx.uid();
    dhtmlx._events[e] = [d, c, a];
    if (b) {
        a = dhtmlx.bind(a, b)
    }
    if (d.addEventListener) {
        d.addEventListener(c, a, false)
    } else {
        if (d.attachEvent) {
            d.attachEvent("on" + c, a)
        }
    }
    return e
};
dhtmlx.eventRemove = function(b) {
    if (!b) {
        return
    }
    dhtmlx.assert(this._events[b], "Removing non-existing event");
    var a = dhtmlx._events[b];
    if (a[0].removeEventListener) {
        a[0].removeEventListener(a[1], a[2], false)
    } else {
        if (a[0].detachEvent) {
            a[0].detachEvent("on" + a[1], a[2])
        }
    }
    delete this._events[b]
};
dhtmlx.log = function(b, c, a) {
    if (window.console && console.log) {
        b = b.toLowerCase();
        if (window.console[b]) {
            window.console[b](c || "unknown error")
        } else {
            window.console.log(b + ": " + c)
        }
        if (a) {
            window.console.log(a)
        }
    }
};
dhtmlx.log_full_time = function(a) {
    dhtmlx._start_time_log = new Date();
    dhtmlx.log("Info", "Timing start [" + a + "]");
    window.setTimeout(function() {
        var b = new Date();
        dhtmlx.log("Info", "Timing end [" + a + "]:" + (b.valueOf() - dhtmlx._start_time_log.valueOf()) / 1000 + "s")
    },
    1)
};
dhtmlx.log_time = function(a) {
    var c = "_start_time_log" + a;
    if (!dhtmlx[c]) {
        dhtmlx[c] = new Date();
        dhtmlx.log("Info", "Timing start [" + a + "]")
    } else {
        var b = new Date();
        dhtmlx.log("Info", "Timing end [" + a + "]:" + (b.valueOf() - dhtmlx[c].valueOf()) / 1000 + "s");
        dhtmlx[c] = null
    }
};
dhtmlx.error = function(b, a) {
    dhtmlx.log("error", b, a)
};
dhtmlx.EventSystem = {
    _init: function() {
        this._events = {};
        this._handlers = {};
        this._map = {}
    },
    block: function() {
        this._events._block = true
    },
    unblock: function() {
        this._events._block = false
    },
    mapEvent: function(a) {
        dhtmlx.extend(this._map, a)
    },
    callEvent: function(c, e) {
        if (this._events._block) {
            return true
        }
        c = c.toLowerCase();
        dhtmlx.assert_event_call(this, c, e);
        var d = this._events[c.toLowerCase()];
        var a = true;
        if (dhtmlx.debug) {
            dhtmlx.log("info", "[" + this.name + "] event:" + c, e)
        }
        if (d) {
            for (var b = 0; b < d.length; b++) {
                if (d[b].apply(this, (e || [])) === false) {
                    a = false
                }
            }
        }
        if (this._map[c] && !this._map[c].callEvent(c, e)) {
            a = false
        }
        return a
    },
    attachEvent: function(b, a, d) {
        b = b.toLowerCase();
        dhtmlx.assert_event_attach(this, b);
        d = d || dhtmlx.uid();
        a = dhtmlx.toFunctor(a);
        var c = this._events[b] || dhtmlx.toArray();
        c.push(a);
        this._events[b] = c;
        this._handlers[d] = {
            f: a,
            t: b
        };
        return d
    },
    detachEvent: function(d) {
        if (this._handlers[d]) {
            var b = this._handlers[d].t;
            var a = this._handlers[d].f;
            var c = this._events[b];
            c.remove(a);
            delete this._handlers[d]
        }
    }
};
dhtmlx.PowerArray = {
    removeAt: function(b, a) {
        if (b >= 0) {
            this.splice(b, (a || 1))
        }
    },
    remove: function(a) {
        this.removeAt(this.find(a))
    },
    insertAt: function(c, d) {
        if (!d && d !== 0) {
            this.push(c)
        } else {
            var a = this.splice(d, (this.length - d));
            this[d] = c;
            this.push.apply(this, a)
        }
    },
    find: function(a) {
        for (i = 0; i < this.length; i++) {
            if (a == this[i]) {
                return i
            }
        }
        return - 1
    },
    each: function(a, c) {
        for (var b = 0; b < this.length; b++) {
            a.call((c || this), this[b])
        }
    },
    map: function(a, c) {
        for (var b = 0; b < this.length; b++) {
            this[b] = a.call((c || this), this[b])
        }
        return this
    }
};
dhtmlx.env = {};
if (navigator.userAgent.indexOf("Opera") != -1) {
    dhtmlx._isOpera = true
} else {
    dhtmlx._isIE = !!document.all;
    dhtmlx._isFF = !document.all;
    dhtmlx._isWebKit = (navigator.userAgent.indexOf("KHTML") != -1);
    if (navigator.appVersion.indexOf("MSIE 8.0") != -1 && document.compatMode != "BackCompat") {
        dhtmlx._isIE = 8
    }
    if (navigator.appVersion.indexOf("MSIE 9.0") != -1 && document.compatMode != "BackCompat") {
        dhtmlx._isIE = 9
    }
}
dhtmlx.env = {}; (function() {
    dhtmlx.env.transform = false;
    dhtmlx.env.transition = false;
    var a = {};
    a.names = ["transform", "transition"];
    a.transform = ["transform", "WebkitTransform", "MozTransform", "oTransform", "msTransform"];
    a.transition = ["transition", "WebkitTransition", "MozTransition", "oTransition"];
    var e = document.createElement("DIV");
    var c;
    for (var b = 0; b < a.names.length; b++) {
        while (p = a[a.names[b]].pop()) {
            if (typeof e.style[p] != "undefined") {
                dhtmlx.env[a.names[b]] = true
            }
        }
    }
})();
dhtmlx.env.transform_prefix = (function() {
    var a;
    if (dhtmlx._isOpera) {
        a = "-o-"
    } else {
        a = "";
        if (dhtmlx._isFF) {
            a = "-moz-"
        }
        if (dhtmlx._isWebKit) {
            a = "-webkit-"
        }
    }
    return a
})();
dhtmlx.env.svg = (function() {
    return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")
})();
dhtmlx.zIndex = {
    drag: 10000
};
dhtmlx.html = {
    create: function(b, a, c) {
        a = a || {};
        var d = document.createElement(b);
        for (var e in a) {
            d.setAttribute(e, a[e])
        }
        if (a.style) {
            d.style.cssText = a.style
        }
        if (a["class"]) {
            d.className = a["class"]
        }
        if (c) {
            d.innerHTML = c
        }
        return d
    },
    getValue: function(a) {
        a = dhtmlx.toNode(a);
        if (!a) {
            return ""
        }
        return dhtmlx.isNotDefined(a.value) ? a.innerHTML: a.value
    },
    remove: function(b) {
        if (b instanceof Array) {
            for (var a = 0; a < b.length; a++) {
                this.remove(b[a])
            }
        } else {
            if (b && b.parentNode) {
                b.parentNode.removeChild(b)
            }
        }
    },
    insertBefore: function(b, c, a) {
        if (!b) {
            return
        }
        if (c) {
            c.parentNode.insertBefore(b, c)
        } else {
            a.appendChild(b)
        }
    },
    locate: function(b, d) {
        b = b || event;
        var a = b.target || b.srcElement;
        while (a) {
            if (a.getAttribute) {
                var c = a.getAttribute(d);
                if (c) {
                    return c
                }
            }
            a = a.parentNode
        }
        return null
    },
    offset: function(d) {
        if (d.getBoundingClientRect) {
            var g = d.getBoundingClientRect();
            var h = document.body;
            var b = document.documentElement;
            var a = window.pageYOffset || b.scrollTop || h.scrollTop;
            var e = window.pageXOffset || b.scrollLeft || h.scrollLeft;
            var f = b.clientTop || h.clientTop || 0;
            var j = b.clientLeft || h.clientLeft || 0;
            var k = g.top + a - f;
            var c = g.left + e - j;
            return {
                y: Math.round(k),
                x: Math.round(c)
            }
        } else {
            var k = 0,
            c = 0;
            while (d) {
                k = k + parseInt(d.offsetTop, 10);
                c = c + parseInt(d.offsetLeft, 10);
                d = d.offsetParent
            }
            return {
                y: k,
                x: c
            }
        }
    },
    pos: function(a) {
        a = a || event;
        if (a.pageX || a.pageY) {
            return {
                x: a.pageX,
                y: a.pageY
            }
        }
        var b = ((dhtmlx._isIE) && (document.compatMode != "BackCompat")) ? document.documentElement: document.body;
        return {
            x: a.clientX + b.scrollLeft - b.clientLeft,
            y: a.clientY + b.scrollTop - b.clientTop
        }
    },
    preventEvent: function(a) {
        if (a && a.preventDefault) {
            a.preventDefault()
        }
        dhtmlx.html.stopEvent(a)
    },
    stopEvent: function(a) { (a || event).cancelBubble = true;
        return false
    },
    addCss: function(b, a) {
        b.className += " " + a
    },
    removeCss: function(b, a) {
        b.className = b.className.replace(RegExp(a, "g"), "")
    }
}; (function() {
    var a = document.getElementsByTagName("SCRIPT");
    dhtmlx.assert(a.length, "Can't locate codebase");
    if (a.length) {
        a = (a[a.length - 1].getAttribute("src") || "").split("/");
        a.splice(a.length - 1, 1);
        dhtmlx.codebase = a.slice(0, a.length).join("/") + "/"
    }
})();
if (!dhtmlx.ui) {
    dhtmlx.ui = {}
}
dhtmlx.Destruction = {
    _init: function() {
        dhtmlx.destructors.push(this)
    },
    destructor: function() {
        this.destructor = function() {};
        this._htmlmap = null;
        this._htmlrows = null;
        if (this._html) {
            document.body.appendChild(this._html)
        }
        this._html = null;
        if (this._obj) {
            this._obj.innerHTML = "";
            this._obj._htmlmap = null
        }
        this._obj = this._dataobj = null;
        this.data = null;
        this._events = this._handlers = {};
        if (this.render) {
            this.render = function() {}
        }
    }
};
dhtmlx.destructors = [];
dhtmlx.event(window, "unload",
function() {
    if (dhtmlx.destructors) {
        for (var c = 0; c < dhtmlx.destructors.length; c++) {
            dhtmlx.destructors[c].destructor()
        }
        dhtmlx.destructors = []
    }
    for (var b in dhtmlx._events) {
        var d = dhtmlx._events[b];
        if (d[0].removeEventListener) {
            d[0].removeEventListener(d[1], d[2], false)
        } else {
            if (d[0].detachEvent) {
                d[0].detachEvent("on" + d[1], d[2])
            }
        }
        delete dhtmlx._events[b]
    }
});
dhtmlx.ajax = function(a, b, c) {
    if (arguments.length !== 0) {
        var d = new dhtmlx.ajax();
        if (c) {
            d.master = c
        }
        d.get(a, null, b)
    }
    if (!this.getXHR) {
        return new dhtmlx.ajax()
    }
    return this
};
dhtmlx.ajax.prototype = {
    getXHR: function() {
        if (dhtmlx._isIE) {
            return new ActiveXObject("Microsoft.xmlHTTP")
        } else {
            return new XMLHttpRequest()
        }
    },
    send: function(e, j, g) {
        var b = this.getXHR();
        if (typeof g == "function") {
            g = [g]
        }
        if (typeof j == "object") {
            var f = [];
            for (var c in j) {
                var h = j[c];
                if (h === null || h === dhtmlx.undefined) {
                    h = ""
                }
                f.push(c + "=" + encodeURIComponent(h))
            }
            j = f.join("&")
        }
        if (j && !this.post) {
            e = e + (e.indexOf("?") != -1 ? "&": "?") + j;
            j = null
        }
        b.open(this.post ? "POST": "GET", e, !this._sync);
        if (this.post) {
            b.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        }
        var d = this;
        b.onreadystatechange = function() {
            if (!b.readyState || b.readyState == 4) {
                if (g && d) {
                    for (var a = 0; a < g.length; a++) {
                        if (g[a]) {
                            g[a].call((d.master || d), b.responseText, b.responseXML, b)
                        }
                    }
                }
                d.master = null;
                g = d = null
            }
        };
        b.send(j || null);
        return b
    },
    get: function(a, c, b) {
        this.post = false;
        return this.send(a, c, b)
    },
    post: function(a, c, b) {
        this.post = true;
        return this.send(a, c, b)
    },
    sync: function() {
        this._sync = true;
        return this
    }
};
dhtmlx.AtomDataLoader = {
    _init: function(a) {
        this.data = {};
        if (a) {
            this._settings.datatype = a.datatype || "json";
            this._after_init.push(this._load_when_ready)
        }
    },
    _load_when_ready: function() {
        this._ready_for_data = true;
        if (this._settings.url) {
            this.url_setter(this._settings.url)
        }
        if (this._settings.data) {
            this.data_setter(this._settings.data)
        }
    },
    url_setter: function(a) {
        if (!this._ready_for_data) {
            return a
        }
        this.load(a, this._settings.datatype);
        return a
    },
    data_setter: function(a) {
        if (!this._ready_for_data) {
            return a
        }
        this.parse(a, this._settings.datatype);
        return true
    },
    load: function(a, b) {
        this.callEvent("onXLS", []);
        if (typeof b == "string") {
            this.data.driver = dhtmlx.DataDriver[b];
            b = arguments[2]
        } else {
            this.data.driver = dhtmlx.DataDriver[this._settings.datatype || "xml"]
        }
        if (window.dhx4) {
            dhx4.ajax.get(a, dhtmlx.bind(function(d) {
                var c = d.xmlDoc;
                var f = c.responseText;
                var e = c.responseXML;
                if (this._onLoad) {
                    this._onLoad.call(this, f, e, c)
                }
                if (b) {
                    b.call(this, f, e, c)
                }
            },
            this))
        } else {
            dhtmlx.ajax(a, [this._onLoad, b], this)
        }
    },
    parse: function(b, a) {
        this.callEvent("onXLS", []);
        this.data.driver = dhtmlx.DataDriver[a || "xml"];
        this._onLoad(b, null)
    },
    _onLoad: function(e, b, a) {
        var c = this.data.driver;
        var d = c.getRecords(c.toObject(e, b))[0];
        this.data = (c ? c.getDetails(d) : e);
        this.callEvent("onXLE", [])
    },
    _check_data_feed: function(b) {
        if (!this._settings.dataFeed || this._ignore_feed || !b) {
            return true
        }
        var a = this._settings.dataFeed;
        if (typeof a == "function") {
            return a.call(this, (b.id || b), b)
        }
        a = a + (a.indexOf("?") == -1 ? "?": "&") + "action=get&id=" + encodeURIComponent(b.id || b);
        this.callEvent("onXLS", []);
        dhtmlx.ajax(a,
        function(d, c) {
            this._ignore_feed = true;
            this.setValues(dhtmlx.DataDriver.json.toObject(d)[0]);
            this._ignore_feed = false;
            this.callEvent("onXLE", [])
        },
        this);
        return false
    }
};
dhtmlx.DataDriver = {};
dhtmlx.DataDriver.json = {
    toObject: function(data) {
        if (!data) {
            data = "[]"
        }
        if (typeof data == "string") {
            eval("dhtmlx.temp=" + data);
            return dhtmlx.temp
        }
        return data
    },
    getRecords: function(a) {
        if (a && a.data) {
            a = a.data
        }
        if (a && !(a instanceof Array)) {
            return [a]
        }
        return a
    },
    getDetails: function(a) {
        return a
    },
    getInfo: function(a) {
        return {
            _size: (a.total_count || 0),
            _from: (a.pos || 0),
            _key: (a.dhx_security)
        }
    }
};
dhtmlx.DataDriver.json_ext = {
    toObject: function(data) {
        if (!data) {
            data = "[]"
        }
        if (typeof data == "string") {
            var temp;
            eval("temp=" + data);
            dhtmlx.temp = [];
            var header = temp.header;
            for (var i = 0; i < temp.data.length; i++) {
                var item = {};
                for (var j = 0; j < header.length; j++) {
                    if (typeof(temp.data[i][j]) != "undefined") {
                        item[header[j]] = temp.data[i][j]
                    }
                }
                dhtmlx.temp.push(item)
            }
            return dhtmlx.temp
        }
        return data
    },
    getRecords: function(a) {
        if (a && !(a instanceof Array)) {
            return [a]
        }
        return a
    },
    getDetails: function(a) {
        return a
    },
    getInfo: function(a) {
        return {
            _size: (a.total_count || 0),
            _from: (a.pos || 0)
        }
    }
};
dhtmlx.DataDriver.html = {
    toObject: function(b) {
        if (typeof b == "string") {
            var a = null;
            if (b.indexOf("<") == -1) {
                a = dhtmlx.toNode(b)
            }
            if (!a) {
                a = document.createElement("DIV");
                a.innerHTML = b
            }
            return a.getElementsByTagName(this.tag)
        }
        return b
    },
    getRecords: function(a) {
        if (a.tagName) {
            return a.childNodes
        }
        return a
    },
    getDetails: function(a) {
        return dhtmlx.DataDriver.xml.tagToObject(a)
    },
    getInfo: function(a) {
        return {
            _size: 0,
            _from: 0
        }
    },
    tag: "LI"
};
dhtmlx.DataDriver.jsarray = {
    toObject: function(data) {
        if (typeof data == "string") {
            eval("dhtmlx.temp=" + data);
            return dhtmlx.temp
        }
        return data
    },
    getRecords: function(a) {
        return a
    },
    getDetails: function(c) {
        var a = {};
        for (var b = 0; b < c.length; b++) {
            a["data" + b] = c[b]
        }
        return a
    },
    getInfo: function(a) {
        return {
            _size: 0,
            _from: 0
        }
    }
};
dhtmlx.DataDriver.csv = {
    toObject: function(a) {
        return a
    },
    getRecords: function(a) {
        return a.split(this.row)
    },
    getDetails: function(c) {
        c = this.stringToArray(c);
        var a = {};
        for (var b = 0; b < c.length; b++) {
            a["data" + b] = c[b]
        }
        return a
    },
    getInfo: function(a) {
        return {
            _size: 0,
            _from: 0
        }
    },
    stringToArray: function(b) {
        b = b.split(this.cell);
        for (var a = 0; a < b.length; a++) {
            b[a] = b[a].replace(/^[ \t\n\r]*(\"|)/g, "").replace(/(\"|)[ \t\n\r]*$/g, "")
        }
        return b
    },
    row: "\n",
    cell: ","
};
dhtmlx.DataDriver.xml = {
    toObject: function(b, a) {
        if (a && (a = this.checkResponse(b, a))) {
            return a
        }
        if (typeof b == "string") {
            return this.fromString(b)
        }
        return b
    },
    getRecords: function(a) {
        return this.xpath(a, this.records)
    },
    records: "/*/item",
    getDetails: function(a) {
        return this.tagToObject(a, {})
    },
    getInfo: function(a) {
        return {
            _size: (a.documentElement.getAttribute("total_count") || 0),
            _from: (a.documentElement.getAttribute("pos") || 0),
            _key: (a.documentElement.getAttribute("dhx_security"))
        }
    },
    xpath: function(d, k) {
        if (window.XPathResult) {
            var c = d;
            if (d.nodeName.indexOf("document") == -1) {
                d = d.ownerDocument
            }
            var h = [];
            var b = d.evaluate(k, c, null, XPathResult.ANY_TYPE, null);
            var j = b.iterateNext();
            while (j) {
                h.push(j);
                j = b.iterateNext()
            }
            return h
        } else {
            var g = true;
            try {
                if (typeof(d.selectNodes) == "undefined") {
                    g = false
                }
            } catch(f) {}
            if (g) {
                return d.selectNodes(k)
            } else {
                var a = k.split("/").pop();
                return d.getElementsByTagName(a)
            }
        }
    },
    tagToObject: function(d, k) {
        k = k || {};
        var f = false;
        var c = d.childNodes;
        var j = {};
        for (var h = 0; h < c.length; h++) {
            if (c[h].nodeType == 1) {
                var g = c[h].tagName;
                if (typeof k[g] != "undefined") {
                    if (! (k[g] instanceof Array)) {
                        k[g] = [k[g]]
                    }
                    k[g].push(this.tagToObject(c[h], {}))
                } else {
                    k[c[h].tagName] = this.tagToObject(c[h], {})
                }
                f = true
            }
        }
        var e = d.attributes;
        if (e && e.length) {
            for (var h = 0; h < e.length; h++) {
                k[e[h].name] = e[h].value
            }
            f = true
        }
        if (!f) {
            return this.nodeValue(d)
        }
        k.value = this.nodeValue(d);
        return k
    },
    nodeValue: function(a) {
        if (a.firstChild) {
            return a.firstChild.wholeText || a.firstChild.data
        }
        return ""
    },
    fromString: function(b) {
        if (window.DOMParser && !dhtmlx._isIE) {
            return (new DOMParser()).parseFromString(b, "text/xml")
        }
        if (window.ActiveXObject) {
            var a = new ActiveXObject("Microsoft.xmlDOM");
            a.loadXML(b);
            return a
        }
        dhtmlx.error("Load from xml string is not supported")
    },
    checkResponse: function(d, c) {
        if (c && (c.firstChild && c.firstChild.tagName != "parsererror")) {
            return c
        }
        var b = this.fromString(d.replace(/^[\s]+/, ""));
        if (b) {
            return b
        }
        dhtmlx.error("xml can't be parsed", d)
    }
};
dhtmlx.DataLoader = {
    _init: function(a) {
        a = a || "";
        this.name = "DataStore";
        this.data = (a.datastore) || (new dhtmlx.DataStore());
        this._readyHandler = this.data.attachEvent("onStoreLoad", dhtmlx.bind(this._call_onready, this))
    },
    load: function(a, b) {
        dhtmlx.AtomDataLoader.load.apply(this, arguments);
        if (!this.data.feed) {
            this.data.feed = function(d, c) {
                if (this._load_count) {
                    return this._load_count = [d, c]
                } else {
                    this._load_count = true
                }
                this.load(a + ((a.indexOf("?") == -1) ? "?": "&") + "posStart=" + d + "&count=" + c,
                function() {
                    var e = this._load_count;
                    this._load_count = false;
                    if (typeof e == "object") {
                        this.data.feed.apply(this, e)
                    }
                })
            }
        }
    },
    _onLoad: function(c, b, a) {
        this.data._parse(this.data.driver.toObject(c, b));
        this.callEvent("onXLE", []);
        if (this._readyHandler) {
            this.data.detachEvent(this._readyHandler);
            this._readyHandler = null
        }
    },
    dataFeed_setter: function(a) {
        this.data.attachEvent("onBeforeFilter", dhtmlx.bind(function(g, f) {
            if (this._settings.dataFeed) {
                var e = {};
                if (!g && !e) {
                    return
                }
                if (typeof g == "function") {
                    if (!f) {
                        return
                    }
                    g(f, e)
                } else {
                    e = {
                        text: f
                    }
                }
                this.clearAll();
                var b = this._settings.dataFeed;
                if (typeof b == "function") {
                    return b.call(this, f, e)
                }
                var d = [];
                for (var c in e) {
                    d.push("dhx_filter[" + c + "]=" + encodeURIComponent(e[c]))
                }
                this.load(b + (b.indexOf("?") < 0 ? "?": "&") + d.join("&"), this._settings.datatype);
                return false
            }
        },
        this));
        return a
    },
    _call_onready: function() {
        if (this._settings.ready) {
            var a = dhtmlx.toFunctor(this._settings.ready);
            if (a && a.call) {
                a.apply(this, arguments)
            }
        }
    }
};
dhtmlx.DataStore = function() {
    this.name = "DataStore";
    dhtmlx.extend(this, dhtmlx.EventSystem);
    this.setDriver("xml");
    this.pull = {};
    this.order = dhtmlx.toArray()
};
dhtmlx.DataStore.prototype = {
    setDriver: function(a) {
        dhtmlx.assert(dhtmlx.DataDriver[a], "incorrect DataDriver");
        this.driver = dhtmlx.DataDriver[a]
    },
    _parse: function(e) {
        this.callEvent("onParse", [this.driver, e]);
        if (this._filter_order) {
            this.filter()
        }
        var f = this.driver.getInfo(e);
        if (f._key) {
            dhtmlx.security_key = f._key
        }
        var d = this.driver.getRecords(e);
        var h = (f._from || 0) * 1;
        if (h === 0 && this.order[0]) {
            h = this.order.length
        }
        var b = 0;
        for (var c = 0; c < d.length; c++) {
            var a = this.driver.getDetails(d[c]);
            var g = this.id(a);
            if (!this.pull[g]) {
                this.order[b + h] = g;
                b++
            }
            this.pull[g] = a;
            if (this.extraParser) {
                this.extraParser(a)
            }
            if (this._scheme) {
                if (this._scheme.$init) {
                    this._scheme.$update(a)
                } else {
                    if (this._scheme.$update) {
                        this._scheme.$update(a)
                    }
                }
            }
        }
        for (var c = 0; c < f._size; c++) {
            if (!this.order[c]) {
                var g = dhtmlx.uid();
                var a = {
                    id: g,
                    $template: "loading"
                };
                this.pull[g] = a;
                this.order[c] = g
            }
        }
        this.callEvent("onStoreLoad", [this.driver, e]);
        this.refresh()
    },
    id: function(a) {
        return a.id || (a.id = dhtmlx.uid())
    },
    changeId: function(b, a) {
        dhtmlx.assert(this.pull[b], "Can't change id, for non existing item: " + b);
        this.pull[a] = this.pull[b];
        this.pull[a].id = a;
        this.order[this.order.find(b)] = a;
        if (this._filter_order) {
            this._filter_order[this._filter_order.find(b)] = a
        }
        this.callEvent("onIdChange", [b, a]);
        if (this._render_change_id) {
            this._render_change_id(b, a)
        }
    },
    get: function(a) {
        return this.item(a)
    },
    set: function(b, a) {
        return this.update(b, a)
    },
    item: function(a) {
        return this.pull[a]
    },
    update: function(b, a) {
        if (this._scheme && this._scheme.$update) {
            this._scheme.$update(a)
        }
        if (this.callEvent("onBeforeUpdate", [b, a]) === false) {
            return false
        }
        this.pull[b] = a;
        this.refresh(b)
    },
    refresh: function(a) {
        if (this._skip_refresh) {
            return
        }
        if (a) {
            this.callEvent("onStoreUpdated", [a, this.pull[a], "update"])
        } else {
            this.callEvent("onStoreUpdated", [null, null, null])
        }
    },
    silent: function(a) {
        this._skip_refresh = true;
        a.call(this);
        this._skip_refresh = false
    },
    getRange: function(d, c) {
        if (d) {
            d = this.indexById(d)
        } else {
            d = this.startOffset || 0
        }
        if (c) {
            c = this.indexById(c)
        } else {
            c = Math.min((this.endOffset || Infinity), (this.dataCount() - 1));
            if (c < 0) {
                c = 0
            }
        }
        if (this.min) {
            d = this.min
        }
        if (this.max) {
            c = this.max
        }
        if (d > c) {
            var b = c;
            c = d;
            d = b
        }
        return this.getIndexRange(d, c)
    },
    getIndexRange: function(d, c) {
        c = Math.min((c || Infinity), this.dataCount() - 1);
        var a = dhtmlx.toArray();
        for (var b = (d || 0); b <= c; b++) {
            a.push(this.item(this.order[b]))
        }
        return a
    },
    dataCount: function() {
        return this.order.length
    },
    exists: function(a) {
        return !! (this.pull[a])
    },
    move: function(a, d) {
        if (a < 0 || d < 0) {
            dhtmlx.error("DataStore::move", "Incorrect indexes");
            return
        }
        var c = this.idByIndex(a);
        var b = this.item(c);
        this.order.removeAt(a);
        this.order.insertAt(c, Math.min(this.order.length, d));
        this.callEvent("onStoreUpdated", [c, b, "move"])
    },
    scheme: function(a) {
        this._scheme = a
    },
    sync: function(e, d, a) {
        if (typeof d != "function") {
            a = d;
            d = null
        }
        if (dhtmlx.debug_bind) {
            this.debug_sync_master = e;
            dhtmlx.log("[sync] " + this.debug_bind_master.name + "@" + this.debug_bind_master._settings.id + " <= " + this.debug_sync_master.name + "@" + this.debug_sync_master._settings.id)
        }
        var c = e;
        if (e.name != "DataStore") {
            e = e.data
        }
        var b = dhtmlx.bind(function(h, f, g) {
            if (g != "update" || d) {
                h = null
            }
            if (!h) {
                this.order = dhtmlx.toArray([].concat(e.order));
                this._filter_order = null;
                this.pull = e.pull;
                if (d) {
                    this.silent(d)
                }
                if (this._on_sync) {
                    this._on_sync()
                }
            }
            if (dhtmlx.debug_bind) {
                dhtmlx.log("[sync:request] " + this.debug_sync_master.name + "@" + this.debug_sync_master._settings.id + " <= " + this.debug_bind_master.name + "@" + this.debug_bind_master._settings.id)
            }
            if (!a) {
                this.refresh(h)
            } else {
                a = false
            }
        },
        this);
        e.attachEvent("onStoreUpdated", b);
        this.feed = function(g, f) {
            c.loadNext(f, g)
        };
        b()
    },
    add: function(e, a) {
        if (this._scheme) {
            e = e || {};
            for (var b in this._scheme) {
                e[b] = e[b] || this._scheme[b]
            }
            if (this._scheme) {
                if (this._scheme.$init) {
                    this._scheme.$update(e)
                } else {
                    if (this._scheme.$update) {
                        this._scheme.$update(e)
                    }
                }
            }
        }
        var f = this.id(e);
        var d = this.dataCount();
        if (dhtmlx.isNotDefined(a) || a < 0) {
            a = d
        }
        if (a > d) {
            dhtmlx.log("Warning", "DataStore:add", "Index of out of bounds");
            a = Math.min(this.order.length, a)
        }
        if (this.callEvent("onBeforeAdd", [f, e, a]) === false) {
            return false
        }
        if (this.exists(f)) {
            return dhtmlx.error("Not unique ID")
        }
        this.pull[f] = e;
        this.order.insertAt(f, a);
        if (this._filter_order) {
            var c = this._filter_order.length;
            if (!a && this.order.length) {
                c = 0
            }
            this._filter_order.insertAt(f, c)
        }
        this.callEvent("onafterAdd", [f, a]);
        this.callEvent("onStoreUpdated", [f, e, "add"]);
        return f
    },
    remove: function(c) {
        if (c instanceof Array) {
            for (var a = 0; a < c.length; a++) {
                this.remove(c[a])
            }
            return
        }
        if (this.callEvent("onBeforeDelete", [c]) === false) {
            return false
        }
        if (!this.exists(c)) {
            return dhtmlx.error("Not existing ID", c)
        }
        var b = this.item(c);
        this.order.remove(c);
        if (this._filter_order) {
            this._filter_order.remove(c)
        }
        delete this.pull[c];
        this.callEvent("onafterdelete", [c]);
        this.callEvent("onStoreUpdated", [c, b, "delete"])
    },
    clearAll: function() {
        this.pull = {};
        this.order = dhtmlx.toArray();
        this.feed = null;
        this._filter_order = null;
        this.callEvent("onClearAll", []);
        this.refresh()
    },
    idByIndex: function(a) {
        if (a >= this.order.length || a < 0) {
            dhtmlx.log("Warning", "DataStore::idByIndex Incorrect index")
        }
        return this.order[a]
    },
    indexById: function(b) {
        var a = this.order.find(b);
        return a
    },
    next: function(b, a) {
        return this.order[this.indexById(b) + (a || 1)]
    },
    first: function() {
        return this.order[0]
    },
    last: function() {
        return this.order[this.order.length - 1]
    },
    previous: function(b, a) {
        return this.order[this.indexById(b) - (a || 1)]
    },
    sort: function(f, b, a) {
        var c = f;
        if (typeof f == "function") {
            c = {
                as: f,
                dir: b
            }
        } else {
            if (typeof f == "string") {
                c = {
                    by: f,
                    dir: b,
                    as: a
                }
            }
        }
        var e = [c.by, c.dir, c.as];
        if (!this.callEvent("onbeforesort", e)) {
            return
        }
        if (this.order.length) {
            var g = dhtmlx.sort.create(c);
            var d = this.getRange(this.first(), this.last());
            d.sort(g);
            this.order = d.map(function(h) {
                return this.id(h)
            },
            this)
        }
        this.refresh();
        this.callEvent("onaftersort", e)
    },
    filter: function(e, d) {
        if (!this.callEvent("onBeforeFilter", [e, d])) {
            return
        }
        if (this._filter_order) {
            this.order = this._filter_order;
            delete this._filter_order
        }
        if (!this.order.length) {
            return
        }
        if (e) {
            var b = e;
            d = d || "";
            if (typeof e == "string") {
                e = dhtmlx.Template.fromHTML(e);
                d = d.toString().toLowerCase();
                b = function(h, g) {
                    return e(h).toLowerCase().indexOf(g) != -1
                }
            }
            var c = dhtmlx.toArray();
            for (var a = 0; a < this.order.length; a++) {
                var f = this.order[a];
                if (b(this.item(f), d)) {
                    c.push(f)
                }
            }
            this._filter_order = this.order;
            this.order = c
        }
        this.refresh();
        this.callEvent("onAfterFilter", [])
    },
    each: function(c, b) {
        for (var a = 0; a < this.order.length; a++) {
            c.call((b || this), this.item(this.order[a]))
        }
    },
    provideApi: function(d, b) {
        this.debug_bind_master = d;
        if (b) {
            this.mapEvent({
                onbeforesort: d,
                onaftersort: d,
                onbeforeadd: d,
                onafteradd: d,
                onbeforedelete: d,
                onafterdelete: d,
                onbeforeupdate: d
            })
        }
        var c = ["get", "set", "sort", "add", "remove", "exists", "idByIndex", "indexById", "item", "update", "refresh", "dataCount", "filter", "next", "previous", "clearAll", "first", "last", "serialize"];
        for (var a = 0; a < c.length; a++) {
            d[c[a]] = dhtmlx.methodPush(this, c[a])
        }
        if (dhtmlx.assert_enabled()) {
            this.assert_event(d)
        }
    },
    serialize: function() {
        var c = this.order;
        var a = [];
        for (var b = 0; b < c.length; b++) {
            a.push(this.pull[c[b]])
        }
        return a
    }
};
dhtmlx.sort = {
    create: function(a) {
        return dhtmlx.sort.dir(a.dir, dhtmlx.sort.by(a.by, a.as))
    },
    as: {
        "int": function(d, c) {
            d = d * 1;
            c = c * 1;
            return d > c ? 1 : (d < c ? -1 : 0)
        },
        string_strict: function(d, c) {
            d = d.toString();
            c = c.toString();
            return d > c ? 1 : (d < c ? -1 : 0)
        },
        string: function(d, c) {
            d = d.toString().toLowerCase();
            c = c.toString().toLowerCase();
            return d > c ? 1 : (d < c ? -1 : 0)
        }
    },
    by: function(b, a) {
        if (!b) {
            return a
        }
        if (typeof a != "function") {
            a = dhtmlx.sort.as[a || "string"]
        }
        b = dhtmlx.Template.fromHTML(b);
        return function(d, c) {
            return a(b(d), b(c))
        }
    },
    dir: function(b, a) {
        if (b == "asc") {
            return a
        }
        return function(d, c) {
            return a(d, c) * -1
        }
    }
};
dhtmlx.KeyEvents = {
    _init: function() {
        dhtmlx.event(this._obj, "keypress", this._onKeyPress, this)
    },
    _onKeyPress: function(b) {
        b = b || event;
        var a = b.which || b.keyCode;
        this.callEvent((this._edit_id ? "onEditKeyPress": "onKeyPress"), [a, b.ctrlKey, b.shiftKey, b])
    }
};
dhtmlx.MouseEvents = {
    _init: function() {
        if (this.on_click) {
            dhtmlx.event(this._obj, "click", this._onClick, this);
            dhtmlx.event(this._obj, "contextmenu", this._onContext, this)
        }
        if (this.on_dblclick) {
            dhtmlx.event(this._obj, "dblclick", this._onDblClick, this)
        }
        if (this.on_mouse_move) {
            dhtmlx.event(this._obj, "mousemove", this._onMouse, this);
            dhtmlx.event(this._obj, (dhtmlx._isIE ? "mouseleave": "mouseout"), this._onMouse, this)
        }
    },
    _onClick: function(a) {
        return this._mouseEvent(a, this.on_click, "ItemClick")
    },
    _onDblClick: function(a) {
        return this._mouseEvent(a, this.on_dblclick, "ItemDblClick")
    },
    _onContext: function(a) {
        var b = dhtmlx.html.locate(a, this._id);
        if (b && !this.callEvent("onBeforeContextMenu", [b, a])) {
            return dhtmlx.html.preventEvent(a)
        }
    },
    _onMouse: function(a) {
        if (dhtmlx._isIE) {
            a = document.createEventObject(event)
        }
        if (this._mouse_move_timer) {
            window.clearTimeout(this._mouse_move_timer)
        }
        this.callEvent("onMouseMoving", [a]);
        this._mouse_move_timer = window.setTimeout(dhtmlx.bind(function() {
            if (a.type == "mousemove") {
                this._onMouseMove(a)
            } else {
                this._onMouseOut(a)
            }
        },
        this), 500)
    },
    _onMouseMove: function(a) {
        if (!this._mouseEvent(a, this.on_mouse_move, "MouseMove")) {
            this.callEvent("onMouseOut", [a || event])
        }
    },
    _onMouseOut: function(a) {
        this.callEvent("onMouseOut", [a || event])
    },
    _mouseEvent: function(g, f, b) {
        g = g || event;
        var a = g.target || g.srcElement;
        var c = "";
        var h = null;
        var d = false;
        while (a && a.parentNode) {
            if (!d && a.getAttribute) {
                h = a.getAttribute(this._id);
                if (h) {
                    if (a.getAttribute("userdata")) {
                        this.callEvent("onLocateData", [h, a, g])
                    }
                    if (!this.callEvent("on" + b, [h, g, a])) {
                        return
                    }
                    d = true
                }
            }
            c = a.className;
            if (c) {
                c = c.split(" ");
                c = c[0] || c[1];
                if (f[c]) {
                    return f[c].call(this, g, h || dhtmlx.html.locate(g, this._id), a)
                }
            }
            a = a.parentNode
        }
        return d
    }
};
dhtmlx.Settings = {
    _init: function() {
        this._settings = this.config = {}
    },
    define: function(b, a) {
        if (typeof b == "object") {
            return this._parseSeetingColl(b)
        }
        return this._define(b, a)
    },
    _define: function(b, a) {
        dhtmlx.assert_settings.call(this, b, a);
        var c = this[b + "_setter"];
        return this._settings[b] = c ? c.call(this, a) : a
    },
    _parseSeetingColl: function(c) {
        if (c) {
            for (var b in c) {
                this._define(b, c[b])
            }
        }
    },
    _parseSettings: function(c, a) {
        var b = dhtmlx.extend({},
        a);
        if (typeof c == "object" && !c.tagName) {
            dhtmlx.extend(b, c)
        }
        this._parseSeetingColl(b)
    },
    _mergeSettings: function(a, c) {
        for (var b in c) {
            switch (typeof a[b]) {
            case "object":
                a[b] = this._mergeSettings((a[b] || {}), c[b]);
                break;
            case "undefined":
                a[b] = c[b];
                break;
            default:
                break
            }
        }
        return a
    },
    _parseContainer: function(b, a, c) {
        if (typeof b == "object" && !b.tagName) {
            b = b.container
        }
        this._obj = this.$view = dhtmlx.toNode(b);
        if (!this._obj && c) {
            this._obj = c(b)
        }
        dhtmlx.assert(this._obj, "Incorrect html container");
        this._obj.className += " " + a;
        this._obj.onselectstart = function() {
            return false
        };
        this._dataobj = this._obj
    },
    _set_type: function(a) {
        if (typeof a == "object") {
            return this.type_setter(a)
        }
        dhtmlx.assert(this.types, "RenderStack :: Types are not defined");
        dhtmlx.assert(this.types[a], "RenderStack :: Inccorect type name", a);
        this.type = dhtmlx.extend({},
        this.types[a]);
        this.customize()
    },
    customize: function(a) {
        if (a) {
            dhtmlx.extend(this.type, a)
        }
        this.type._item_start = dhtmlx.Template.fromHTML(this.template_item_start(this.type));
        this.type._item_end = this.template_item_end(this.type);
        this.render()
    },
    type_setter: function(a) {
        this._set_type(typeof a == "object" ? dhtmlx.Type.add(this, a) : a);
        return a
    },
    template_setter: function(a) {
        return this.type_setter({
            template: a
        })
    },
    css_setter: function(a) {
        this._obj.className += " " + a;
        return a
    }
};
dhtmlx.Template = {
    _cache: {},
    empty: function() {
        return ""
    },
    setter: function(a) {
        return dhtmlx.Template.fromHTML(a)
    },
    obj_setter: function(b) {
        var a = dhtmlx.Template.setter(b);
        var c = this;
        return function() {
            return a.apply(c, arguments)
        }
    },
    fromHTML: function(a) {
        if (typeof a == "function") {
            return a
        }
        if (this._cache[a]) {
            return this._cache[a]
        }
        a = (a || "").toString();
        a = a.replace(/[\r\n]+/g, "\\n");
        a = a.replace(/\{obj\.([^}?]+)\?([^:]*):([^}]*)\}/g, '"+(obj.$1?"$2":"$3")+"');
        a = a.replace(/\{common\.([^}\(]*)\}/g, '"+common.$1+"');
        a = a.replace(/\{common\.([^\}\(]*)\(\)\}/g, '"+(common.$1?common.$1(obj):"")+"');
        a = a.replace(/\{obj\.([^}]*)\}/g, '"+obj.$1+"');
        a = a.replace(/#([a-z0-9_]+)#/gi, '"+obj.$1+"');
        a = a.replace(/\{obj\}/g, '"+obj+"');
        a = a.replace(/\{-obj/g, "{obj");
        a = a.replace(/\{-common/g, "{common");
        a = 'return "' + a + '";';
        return this._cache[a] = Function("obj", "common", a)
    }
};
dhtmlx.Type = {
    add: function(c, b) {
        if (!c.types && c.prototype.types) {
            c = c.prototype
        }
        if (dhtmlx.assert_enabled()) {
            this.assert_event(b)
        }
        var a = b.name || "default";
        this._template(b);
        this._template(b, "edit");
        this._template(b, "loading");
        c.types[a] = dhtmlx.extend(dhtmlx.extend({},
        (c.types[a] || this._default)), b);
        return a
    },
    _default: {
        css: "default",
        template: function() {
            return ""
        },
        template_edit: function() {
            return ""
        },
        template_loading: function() {
            return "..."
        },
        width: 150,
        height: 80,
        margin: 5,
        padding: 0
    },
    _template: function(c, a) {
        a = "template" + (a ? ("_" + a) : "");
        var b = c[a];
        if (b && (typeof b == "string")) {
            if (b.indexOf("->") != -1) {
                b = b.split("->");
                switch (b[0]) {
                case "html":
                    b = dhtmlx.html.getValue(b[1]).replace(/\"/g, '\\"');
                    break;
                case "http":
                    b = new dhtmlx.ajax().sync().get(b[1], {
                        uid: (new Date()).valueOf()
                    }).responseText;
                    break;
                default:
                    break
                }
            }
            c[a] = dhtmlx.Template.fromHTML(b)
        }
    }
};
dhtmlx.SingleRender = {
    _init: function() {},
    _toHTML: function(a) {
        return this.type._item_start(a, this.type) + this.type.template(a, this.type) + this.type._item_end
    },
    render: function() {
        if (!this.callEvent || this.callEvent("onBeforeRender", [this.data])) {
            if (this.data) {
                this._dataobj.innerHTML = this._toHTML(this.data)
            }
            if (this.callEvent) {
                this.callEvent("onAfterRender", [])
            }
        }
    }
};
dhtmlx.ui.Tooltip = function(a) {
    this.name = "Tooltip";
    if (dhtmlx.assert_enabled()) {
        this._assert()
    }
    if (typeof a == "string") {
        a = {
            template: a
        }
    }
    dhtmlx.extend(this, dhtmlx.Settings);
    dhtmlx.extend(this, dhtmlx.SingleRender);
    this._parseSettings(a, {
        type: "default",
        dy: 0,
        dx: 20
    });
    this._dataobj = this._obj = document.createElement("DIV");
    this._obj.className = "dhx_tooltip";
    dhtmlx.html.insertBefore(this._obj, document.body.firstChild)
};
dhtmlx.ui.Tooltip.prototype = {
    show: function(a, b) {
        if (this._disabled) {
            return
        }
        if (this.data != a) {
            this.data = a;
            this.render(a)
        }
        this._obj.style.top = b.y + this._settings.dy + "px";
        this._obj.style.left = b.x + this._settings.dx + "px";
        this._obj.style.display = "block"
    },
    hide: function() {
        this.data = null;
        this._obj.style.display = "none"
    },
    disable: function() {
        this._disabled = true
    },
    enable: function() {
        this._disabled = false
    },
    types: {
        "default": dhtmlx.Template.fromHTML("{obj.id}")
    },
    template_item_start: dhtmlx.Template.empty,
    template_item_end: dhtmlx.Template.empty
};
dhtmlx.AutoTooltip = {
    tooltip_setter: function(b) {
        var a = new dhtmlx.ui.Tooltip(b);
        this.attachEvent("onMouseMove",
        function(d, c) {
            a.show(this.get(d), dhtmlx.html.pos(c))
        });
        this.attachEvent("onMouseOut",
        function(d, c) {
            a.hide()
        });
        this.attachEvent("onMouseMoving",
        function(d, c) {
            a.hide()
        });
        return a
    }
};
dhtmlx.compat = function(a, b) {
    if (dhtmlx.compat[a]) {
        dhtmlx.compat[a](b)
    }
};
if (!dhtmlx.attaches) {
    dhtmlx.attaches = {}
}
dhtmlx.attaches.attachAbstract = function(b, a) {
    var e = document.createElement("DIV");
    e.id = "CustomObject_" + dhtmlx.uid();
    e.style.width = "100%";
    e.style.height = "100%";
    e.cmp = "grid";
    document.body.appendChild(e);
    this.attachObject(e.id);
    a.container = e.id;
    var d = this.vs[this.av];
    d.grid = new window[b](a);
    d.gridId = e.id;
    d.gridObj = e;
    d.grid.setSizes = function() {
        if (this.resize) {
            this.resize()
        } else {
            this.render()
        }
    };
    var c = "_viewRestore";
    return this.vs[this[c]()].grid
};
dhtmlx.attaches.attachDataView = function(a) {
    return this.attachAbstract("dhtmlXDataView", a)
};
dhtmlx.attaches.attachChart = function(a) {
    return this.attachAbstract("dhtmlXChart", a)
};
dhtmlx.compat.layout = function() {};
dhtmlx.Group = {
    _init: function() {
        dhtmlx.assert(this.data, "DataStore required for grouping");
        this.data.attachEvent("onStoreLoad", dhtmlx.bind(function() {
            if (this._settings.group) {
                this.group(this._settings.group, false)
            }
        },
        this));
        this.attachEvent("onBeforeRender", dhtmlx.bind(function(a) {
            if (this._settings.sort) {
                a.block();
                a.sort(this._settings.sort);
                a.unblock()
            }
        },
        this));
        this.data.attachEvent("onClearAll", dhtmlx.bind(function() {
            this.data._not_grouped_order = this.data._not_grouped_pull = null
        },
        this));
        this.attachEvent("onBeforeSort", dhtmlx.bind(function() {
            this._settings.sort = null
        },
        this))
    },
    _init_group_data_event: function(b, a) {
        b.attachEvent("onClearAll", dhtmlx.bind(function() {
            this.ungroup(false);
            this.block();
            this.clearAll();
            this.unblock()
        },
        a))
    },
    sum: function(b, a) {
        b = dhtmlx.Template.setter(b);
        a = a || this.data;
        var c = 0;
        a.each(function(d) {
            c += b(d) * 1
        });
        return c
    },
    min: function(c, b) {
        c = dhtmlx.Template.setter(c);
        b = b || this.data;
        var a = Infinity;
        b.each(function(d) {
            if (c(d) * 1 < a) {
                a = c(d) * 1
            }
        });
        return a * 1
    },
    max: function(c, b) {
        c = dhtmlx.Template.setter(c);
        b = b || this.data;
        var a = -Infinity;
        b.each(function(d) {
            if (c(d) * 1 > a) {
                a = c(d) * 1
            }
        });
        return a
    },
    _split_data_by: function(f) {
        var h = function(l, k) {
            l = dhtmlx.Template.setter(l);
            return l(k[0])
        };
        var j = dhtmlx.Template.setter(f.by);
        if (!f.map[j]) {
            f.map[j] = [j, h]
        }
        var c = {};
        var g = [];
        this.data.each(function(k) {
            var l = j(k);
            if (!c[l]) {
                g.push({
                    id: l
                });
                c[l] = dhtmlx.toArray()
            }
            c[l].push(k)
        });
        for (var a in f.map) {
            var e = (f.map[a][1] || h);
            if (typeof e != "function") {
                e = this[e]
            }
            for (var d = 0; d < g.length; d++) {
                g[d][a] = e.call(this, f.map[a][0], c[g[d].id])
            }
        }
        this.data._not_grouped_order = this.data.order;
        this.data._not_grouped_pull = this.data.pull;
        this.data.order = dhtmlx.toArray();
        this.data.pull = {};
        for (var d = 0; d < g.length; d++) {
            var b = this.data.id(g[d]);
            this.data.pull[b] = g[d];
            this.data.order.push(b)
        }
        this.callEvent("onStoreUpdated", [])
    },
    group: function(a, b) {
        this.ungroup(false);
        this._split_data_by(a);
        if (b !== false) {
            this.data.callEvent("onStoreUpdated", [])
        }
    },
    ungroup: function(a) {
        if (this.data._not_grouped_order) {
            this.data.order = this.data._not_grouped_order;
            this.data.pull = this.data._not_grouped_pull;
            this.data._not_grouped_pull = this.data._not_grouped_order = null
        }
        if (a !== false) {
            this.data.callEvent("onStoreUpdated", [])
        }
    },
    group_setter: function(a) {
        dhtmlx.assert(typeof a == "object", "Incorrect group value");
        dhtmlx.assert(a.by, "group.by is mandatory");
        dhtmlx.assert(a.map, "group.map is mandatory");
        return a
    },
    sort_setter: function(a) {
        if (typeof a != "object") {
            a = {
                by: a
            }
        }
        this._mergeSettings(a, {
            as: "string",
            dir: "asc"
        });
        return a
    }
};
dhtmlx.Date = {
    Locale: {
        month_full: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        month_short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        day_full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        day_short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    },
    date_part: function(a) {
        a.setHours(0);
        a.setMinutes(0);
        a.setSeconds(0);
        a.setMilliseconds(0);
        return a
    },
    time_part: function(a) {
        return (a.valueOf() / 1000 - a.getTimezoneOffset() * 60) % 86400
    },
    week_start: function(b) {
        var a = b.getDay();
        if (this.config.start_on_monday) {
            if (a === 0) {
                a = 6
            } else {
                a--
            }
        }
        return this.date_part(this.add(b, -1 * a, "day"))
    },
    month_start: function(a) {
        a.setDate(1);
        return this.date_part(a)
    },
    year_start: function(a) {
        a.setMonth(0);
        return this.month_start(a)
    },
    day_start: function(a) {
        return this.date_part(a)
    },
    add: function(b, c, d) {
        var a = new Date(b.valueOf());
        switch (d) {
        case "day":
            a.setDate(a.getDate() + c);
            break;
        case "week":
            a.setDate(a.getDate() + 7 * c);
            break;
        case "month":
            a.setMonth(a.getMonth() + c);
            break;
        case "year":
            a.setYear(a.getFullYear() + c);
            break;
        case "hour":
            a.setHours(a.getHours() + c);
            break;
        case "minute":
            a.setMinutes(a.getMinutes() + c);
            break;
        default:
            return dhtmlx.Date["add_" + d](b, c, d)
        }
        return a
    },
    to_fixed: function(a) {
        if (a < 10) {
            return "0" + a
        }
        return a
    },
    copy: function(a) {
        return new Date(a.valueOf())
    },
    date_to_str: function(b, a) {
        b = b.replace(/%[a-zA-Z]/g,
        function(c) {
            switch (c) {
            case "%d":
                return '"+dhtmlx.Date.to_fixed(date.getDate())+"';
            case "%m":
                return '"+dhtmlx.Date.to_fixed((date.getMonth()+1))+"';
            case "%j":
                return '"+date.getDate()+"';
            case "%n":
                return '"+(date.getMonth()+1)+"';
            case "%y":
                return '"+dhtmlx.Date.to_fixed(date.getFullYear()%100)+"';
            case "%Y":
                return '"+date.getFullYear()+"';
            case "%D":
                return '"+dhtmlx.Date.Locale.day_short[date.getDay()]+"';
            case "%l":
                return '"+dhtmlx.Date.Locale.day_full[date.getDay()]+"';
            case "%M":
                return '"+dhtmlx.Date.Locale.month_short[date.getMonth()]+"';
            case "%F":
                return '"+dhtmlx.Date.Locale.month_full[date.getMonth()]+"';
            case "%h":
                return '"+dhtmlx.Date.to_fixed((date.getHours()+11)%12+1)+"';
            case "%g":
                return '"+((date.getHours()+11)%12+1)+"';
            case "%G":
                return '"+date.getHours()+"';
            case "%H":
                return '"+dhtmlx.Date.to_fixed(date.getHours())+"';
            case "%i":
                return '"+dhtmlx.Date.to_fixed(date.getMinutes())+"';
            case "%a":
                return '"+(date.getHours()>11?"pm":"am")+"';
            case "%A":
                return '"+(date.getHours()>11?"PM":"AM")+"';
            case "%s":
                return '"+dhtmlx.Date.to_fixed(date.getSeconds())+"';
            case "%W":
                return '"+dhtmlx.Date.to_fixed(dhtmlx.Date.getISOWeek(date))+"';
            default:
                return c
            }
        });
        if (a) {
            b = b.replace(/date\.get/g, "date.getUTC")
        }
        return new Function("date", 'return "' + b + '";')
    },
    str_to_date: function(e, c) {
        var f = "var temp=date.split(/[^0-9a-zA-Z]+/g);";
        var a = e.match(/%[a-zA-Z]/g);
        for (var b = 0; b < a.length; b++) {
            switch (a[b]) {
            case "%j":
            case "%d":
                f += "set[2]=temp[" + b + "]||1;";
                break;
            case "%n":
            case "%m":
                f += "set[1]=(temp[" + b + "]||1)-1;";
                break;
            case "%y":
                f += "set[0]=temp[" + b + "]*1+(temp[" + b + "]>50?1900:2000);";
                break;
            case "%g":
            case "%G":
            case "%h":
            case "%H":
                f += "set[3]=temp[" + b + "]||0;";
                break;
            case "%i":
                f += "set[4]=temp[" + b + "]||0;";
                break;
            case "%Y":
                f += "set[0]=temp[" + b + "]||0;";
                break;
            case "%a":
            case "%A":
                f += "set[3]=set[3]%12+((temp[" + b + "]||'').toLowerCase()=='am'?0:12);";
                break;
            case "%s":
                f += "set[5]=temp[" + b + "]||0;";
                break
            }
        }
        var d = "set[0],set[1],set[2],set[3],set[4],set[5]";
        if (c) {
            d = " Date.UTC(" + d + ")"
        }
        return new Function("date", "var set=[0,0,1,0,0,0]; " + f + " return new Date(" + d + ");")
    },
    getISOWeek: function(c) {
        if (!c) {
            return false
        }
        var b = c.getDay();
        if (b === 0) {
            b = 7
        }
        var d = new Date(c.valueOf());
        d.setDate(c.getDate() + (4 - b));
        var a = d.getFullYear();
        var f = Math.floor((d.getTime() - new Date(a, 0, 1).getTime()) / 86400000);
        var e = 1 + Math.floor(f / 7);
        return e
    },
    getUTCISOWeek: function(a) {
        return this.getISOWeek(a)
    }
};
dhtmlx.math = {};
dhtmlx.math._toHex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
dhtmlx.math.toHex = function(b, a) {
    b = parseInt(b, 10);
    str = "";
    while (b > 0) {
        str = this._toHex[b % 16] + str;
        b = Math.floor(b / 16)
    }
    while (str.length < a) {
        str = "0" + str
    }
    return str
};
dhtmlx.math.hexToDec = function(a) {
    return parseInt(a, 16)
};
dhtmlx.math.toRgb = function(c) {
    var e, d, a, f;
    if (typeof(c) != "string") {
        e = c[0];
        d = c[1];
        a = c[2]
    } else {
        if (c.indexOf("rgb") != -1) {
            f = c.substr(c.indexOf("(") + 1, c.lastIndexOf(")") - c.indexOf("(") - 1).split(",");
            e = f[0];
            d = f[1];
            a = f[2]
        } else {
            if (c.substr(0, 1) == "#") {
                c = c.substr(1)
            }
            e = this.hexToDec(c.substr(0, 2));
            d = this.hexToDec(c.substr(2, 2));
            a = this.hexToDec(c.substr(4, 2))
        }
    }
    e = (parseInt(e, 10) || 0);
    d = (parseInt(d, 10) || 0);
    a = (parseInt(a, 10) || 0);
    if (e < 0 || e > 255) {
        e = 0
    }
    if (d < 0 || d > 255) {
        d = 0
    }
    if (a < 0 || a > 255) {
        a = 0
    }
    return [e, d, a]
};
dhtmlx.math.hsvToRgb = function(j, u, n) {
    var e, l, d, c, o, a, k, m;
    e = Math.floor((j / 60)) % 6;
    l = j / 60 - e;
    d = n * (1 - u);
    c = n * (1 - l * u);
    o = n * (1 - (1 - l) * u);
    a = 0;
    k = 0;
    m = 0;
    switch (e) {
    case 0:
        a = n;
        k = o;
        m = d;
        break;
    case 1:
        a = c;
        k = n;
        m = d;
        break;
    case 2:
        a = d;
        k = n;
        m = o;
        break;
    case 3:
        a = d;
        k = c;
        m = n;
        break;
    case 4:
        a = o;
        k = d;
        m = n;
        break;
    case 5:
        a = n;
        k = d;
        m = c;
        break
    }
    a = Math.floor(a * 255);
    k = Math.floor(k * 255);
    m = Math.floor(m * 255);
    return [a, k, m]
};
dhtmlx.math.rgbToHsv = function(c, j, k) {
    var e, d, l, a, m, o, f, n;
    e = c / 255;
    d = j / 255;
    l = k / 255;
    var a = Math.min(e, d, l);
    var m = Math.max(e, d, l);
    f = 0;
    o = m == 0 ? 0 : (1 - a / m);
    n = m;
    if (m == a) {
        f = 0
    } else {
        if (m == e && d >= l) {
            f = 60 * (d - l) / (m - a) + 0
        } else {
            if (m == e && d < l) {
                f = 60 * (d - l) / (m - a) + 360
            } else {
                if (m == d) {
                    f = 60 * (l - e) / (m - a) + 120
                } else {
                    if (m == l) {
                        f = 60 * (e - d) / (m - a) + 240
                    }
                }
            }
        }
    }
    return [f, o, n]
};
if (!dhtmlx.presets) {
    dhtmlx.presets = {}
}
dhtmlx.presets.chart = {
    simple: {
        item: {
            borderColor: "#ffffff",
            color: "#2b7100",
            shadow: false,
            borderWidth: 2
        },
        line: {
            color: "#8ecf03",
            width: 2
        }
    },
    plot: {
        color: "#1293f8",
        item: {
            borderColor: "#636363",
            borderWidth: 1,
            color: "#ffffff",
            type: "r",
            shadow: false
        },
        line: {
            color: "#1293f8",
            width: 2
        }
    },
    diamond: {
        color: "#b64040",
        item: {
            borderColor: "#b64040",
            color: "#b64040",
            type: "d",
            radius: 3,
            shadow: true
        },
        line: {
            color: "#ff9000",
            width: 2
        }
    },
    point: {
        color: "#fe5916",
        disableLines: true,
        fill: false,
        disableItems: false,
        item: {
            color: "#feb916",
            borderColor: "#fe5916",
            radius: 2,
            borderWidth: 1,
            type: "r"
        },
        alpha: 1
    },
    line: {
        line: {
            color: "#3399ff",
            width: 2
        },
        item: {
            color: "#ffffff",
            borderColor: "#3399ff",
            radius: 2,
            borderWidth: 2,
            type: "d"
        },
        fill: false,
        disableItems: false,
        disableLines: false,
        alpha: 1
    },
    area: {
        fill: "#3399ff",
        line: {
            color: "#3399ff",
            width: 1
        },
        disableItems: true,
        alpha: 0.2,
        disableLines: false
    },
    round: {
        item: {
            radius: 3,
            borderColor: "#3f83ff",
            borderWidth: 1,
            color: "#3f83ff",
            type: "r",
            shadow: false,
            alpha: 0.6
        }
    },
    square: {
        item: {
            radius: 3,
            borderColor: "#447900",
            borderWidth: 2,
            color: "#69ba00",
            type: "s",
            shadow: false,
            alpha: 1
        }
    },
    column: {
        color: "RAINBOW",
        gradient: false,
        width: 45,
        radius: 0,
        alpha: 1,
        border: true
    },
    stick: {
        width: 5,
        gradient: false,
        color: "#67b5c9",
        radius: 2,
        alpha: 1,
        border: false
    },
    alpha: {
        color: "#b9a8f9",
        width: 70,
        gradient: "falling",
        radius: 0,
        alpha: 0.5,
        border: true
    }
};
dhtmlx.ui.Map = function(a) {
    this.name = "Map";
    this._id = "map_" + dhtmlx.uid();
    this._key = a;
    this._map = [];
    this._areas = []
};
dhtmlx.ui.Map.prototype = {
    addRect: function(c, b, a) {
        this._areas.push({
            index: a,
            points: b
        });
        this._createMapArea(c, "RECT", b, a)
    },
    addPoly: function(c, b, a) {
        this._createMapArea(c, "POLY", b, a)
    },
    _createMapArea: function(e, b, d, c) {
        var a = "";
        if (arguments.length == 4) {
            a = "userdata='" + c + "'"
        }
        this._map.push("<area " + this._key + "='" + e + "' shape='" + b + "' coords='" + d.join() + "' " + a + "></area>")
    },
    addSector: function(a, k, j, g, e, c, d, f) {
        var h = [];
        h.push(g);
        h.push(Math.floor(e * d));
        for (var b = k; b < j; b += Math.PI / 18) {
            h.push(Math.floor(g + c * Math.cos(b)));
            h.push(Math.floor((e + c * Math.sin(b)) * d))
        }
        h.push(Math.floor(g + c * Math.cos(j)));
        h.push(Math.floor((e + c * Math.sin(j)) * d));
        h.push(g);
        h.push(Math.floor(e * d));
        return this.addPoly(a, h, f)
    },
    render: function(a) {
        var c = dhtmlx.html.create("DIV");
        c.style.cssText = "position:absolute; width:100%; height:100%; top:0px; left:0px;";
        a.appendChild(c);
        var b = dhtmlx._isIE ? "": "src='data:image/gif;base64,R0lGODlhEgASAIAAAP///////yH5BAUUAAEALAAAAAASABIAAAIPjI+py+0Po5y02ouz3pwXADs='";
        c.innerHTML = "<map id='" + this._id + "' name='" + this._id + "'>" + this._map.join("\n") + "</map><img " + b + " class='dhx_map_img' usemap='#" + this._id + "' onmousedown='return false;'>";
        a._htmlmap = c;
        this._map = []
    }
};
dhtmlx.chart = {};
dhtmlx.chart.scatter = {
    pvt_render_scatter: function(k, f, j, h, g, a) {
        if (!this._settings.xValue) {
            return dhtmlx.log("warning", "Undefined propery: xValue")
        }
        var c = this._getLimits();
        var e = this._getLimits("h", "xValue");
        if (!g) {
            if (!this.canvases.x) {
                this.canvases.x = new dhtmlx.ui.Canvas(this._obj, "axis_x")
            }
            if (!this.canvases.y) {
                this.canvases.y = new dhtmlx.ui.Canvas(this._obj, "axis_y")
            }
            this._drawYAxis(this.canvases.y.getCanvas(), f, j, h, c.min, c.max);
            this._drawHXAxis(this.canvases.x.getCanvas(), f, j, h, e.min, e.max)
        }
        c = {
            min: this._settings.yAxis.start,
            max: this._settings.yAxis.end
        };
        e = {
            min: this._settings.xAxis.start,
            max: this._settings.xAxis.end
        };
        var b = this._getScatterParams(k, f, j, h, e, c);
        this._mapStart = j;
        for (var d = 0; d < f.length; d++) {
            this._drawScatterItem(k, a, j, h, b, e, c, f[d], g)
        }
    },
    _getScatterParams: function(a, d, c, b, g, f) {
        var e = {};
        e.totalHeight = b.y - c.y;
        e.totalWidth = b.x - c.x;
        this._calcScatterUnit(e, g.min, g.max, e.totalWidth, "X");
        this._calcScatterUnit(e, f.min, f.max, e.totalHeight, "Y");
        return e
    },
    _drawScatterItem: function(l, a, j, h, c, e, d, f, g) {
        var b = this._calculateScatterItemPosition(c, h, j, e, f, "X");
        var k = this._calculateScatterItemPosition(c, j, h, d, f, "Y");
        this._drawItem(l, b, k, f, this._settings.label.call(this, f), g, a)
    },
    _calculateScatterItemPosition: function(c, h, g, a, e, b) {
        var k = this._settings[b == "X" ? "xValue": "value"].call(this, e);
        var d = c["valueFactor" + b];
        var l = (parseFloat(k || 0) - a.min) * d;
        var j = c["unit" + b];
        var f = g[b.toLowerCase()] - (b == "X" ? ( - 1) : 1) * Math.floor(j * l);
        if (l < 0) {
            f = g[b.toLowerCase()]
        }
        if (k > a.max) {
            f = h[b.toLowerCase()]
        }
        if (k < a.min) {
            f = g[b.toLowerCase()]
        }
        return f
    },
    _calcScatterUnit: function(f, c, a, b, d) {
        var e = this._getRelativeValue(c, a);
        d = (d || "");
        f["relValue" + d] = e[0];
        f["valueFactor" + d] = e[1];
        f["unit" + d] = (f["relValue" + d] ? b / f["relValue" + d] : 10)
    }
};
dhtmlx.chart.radar = {
    pvt_render_radar: function(b, d, a, f, c, e) {
        this._renderRadarChart(b, d, a, f, c, e)
    },
    _renderRadarChart: function(n, e, l, k, j, a) {
        if (!e.length) {
            return
        }
        var g = this._getPieParameters(l, k);
        var h = (this._settings.radius ? this._settings.radius: g.radius);
        var b = (this._settings.x ? this._settings.x: g.x);
        var m = (this._settings.y ? this._settings.y: g.y);
        var c = [];
        for (var d = 0; d < e.length; d++) {
            c.push(1)
        }
        var f = this._getRatios(c, e.length);
        this._mapStart = l;
        if (!j) {
            this._drawRadarAxises(f, b, m, h, e)
        }
        this._drawRadarData(n, f, b, m, h, e, j, a)
    },
    _drawRadarData: function(s, m, h, g, e, E, t, D) {
        var r, o, C, A, u, z, d, c, v, B, w, n, b, q, k, j, a, l, f;
        C = this._settings;
        u = C.yAxis.start;
        z = C.yAxis.end;
        f = this._getRelativeValue(u, z);
        n = f[0];
        l = (n ? e / n: e / 2);
        a = f[1];
        b = -Math.PI / 2;
        r = o = b;
        v = [];
        c = 0;
        for (A = 0; A < E.length; A++) {
            if (!j) {
                q = C.value(E[A]);
                k = (parseFloat(q || 0) - u) * a
            } else {
                k = j
            }
            B = Math.floor(l * k);
            q = C.value((A != (E.length - 1)) ? E[A + 1] : E[0]);
            j = (parseFloat(q || 0) - u) * a;
            w = Math.floor(l * j);
            r = o;
            o = ((A != (E.length - 1)) ? (b + m[A] - 0.0001) : b);
            d = (c || this._getPositionByAngle(r, h, g, B));
            c = this._getPositionByAngle(o, h, g, w);
            v.push(d)
        }
        if (C.fill) {
            this._fillRadarChart(s, v, E)
        }
        if (!C.disableLines) {
            this._strokeRadarChart(s, v, E)
        }
        if (!C.disableItems) {
            this._drawRadarItemMarkers(s, v, E, t, D)
        }
        v = null
    },
    _drawRadarItemMarkers: function(a, c, e, d, f) {
        for (var b = 0; b < c.length; b++) {
            this._drawItem(a, c[b].x, c[b].y, e[b], this._settings.label.call(this, e), d, f)
        }
    },
    _fillRadarChart: function(a, d, f) {
        var e, c;
        a.globalAlpha = this._settings.alpha.call(this, {});
        a.beginPath();
        for (var b = 0; b < d.length; b++) {
            a.fillStyle = this._settings.fill.call(this, f[b]);
            e = d[b];
            c = (d[b + 1] || d[0]);
            if (!b) {
                a.moveTo(e.x, e.y)
            }
            a.lineTo(c.x, c.y)
        }
        a.fill();
        a.globalAlpha = 1
    },
    _strokeRadarChart: function(a, d, f) {
        var e, c;
        for (var b = 0; b < d.length; b++) {
            e = d[b];
            c = (d[b + 1] || d[0]);
            this._drawLine(a, e.x, e.y, c.x, c.y, this._settings.line.color.call(this, f[b]), this._settings.line.width)
        }
    },
    _drawRadarAxises: function(s, q, o, g, G) {
        var a = this._settings.yAxis;
        var d = this._settings.xAxis;
        var h = a.start;
        var f = a.end;
        var l = a.step;
        var t = {};
        var F = this._configYAxis;
        if (typeof F.step == "undefined" || typeof F.start == "undefined" || typeof F.end == "undefined") {
            var m = this._getLimits();
            t = this._calculateScale(m.min, m.max);
            h = t.start;
            f = t.end;
            l = t.step;
            a.end = f;
            a.start = h
        }
        var A = [];
        var D, C, u;
        var E = 0;
        var b = g * l / (f - h);
        var n, r;
        if (l < 1) {
            n = Math.min(this._log10(l), (h <= 0 ? 0 : this._log10(h)));
            r = Math.pow(10, -n)
        }
        var B = [];
        if (!this.canvases.scale) {
            this.canvases.scale = new dhtmlx.ui.Canvas(this._obj, "radar_scale")
        }
        var z = this.canvases.scale.getCanvas();
        for (D = f; D >= h; D -= l) {
            if (t.fixNum) {
                D = parseFloat((new Number(D)).toFixed(t.fixNum))
            }
            A.push(Math.floor(E * b) + 0.5);
            if (r) {
                D = Math.round(D * r) / r
            }
            var k = o - g + A[A.length - 1];
            this.canvases.scale.renderTextAt("middle", "left", q, k, a.template(D.toString()), "dhx_axis_item_y dhx_radar");
            if (s.length < 2) {
                this._drawScaleSector(z, "arc", q, o, g - A[A.length - 1], -Math.PI / 2, 3 * Math.PI / 2, D);
                return
            }
            var e = -Math.PI / 2;
            var w = e;
            var v;
            for (C = 0; C < s.length; C++) {
                if (D == f) {
                    B.push(w)
                }
                v = e + s[C] - 0.0001;
                this._drawScaleSector(z, (F.lineShape || "line"), q, o, g - A[A.length - 1], w, v, D, C, G[D]);
                w = v
            }
            E++
        }
        for (D = 0; D < B.length; D++) {
            u = this._getPositionByAngle(B[D], q, o, g);
            if (d.lines.call(this, G[D], D)) {
                this._drawLine(z, q, o, u.x, u.y, (d ? d.lineColor.call(this, G[D]) : "#cfcfcf"), 1)
            }
            this._drawRadarScaleLabel(z, q, o, g, B[D], (d ? d.template.call(this, G[D]) : "&nbsp;"))
        }
    },
    _drawScaleSector: function(n, f, m, k, e, b, a, d, c) {
        var l, h;
        if (e < 0) {
            return false
        }
        l = this._getPositionByAngle(b, m, k, e);
        h = this._getPositionByAngle(a, m, k, e);
        var g = this._settings.yAxis;
        if (g.bg) {
            n.beginPath();
            n.moveTo(m, k);
            if (f == "arc") {
                n.arc(m, k, e, b, a, false)
            } else {
                n.lineTo(l.x, l.y);
                n.lineTo(h.x, h.y)
            }
            n.fillStyle = g.bg(d, c);
            n.moveTo(m, k);
            n.fill();
            n.closePath()
        }
        if (g.lines.call(this, d)) {
            n.lineWidth = 1;
            n.beginPath();
            if (f == "arc") {
                n.arc(m, k, e, b, a, false)
            } else {
                n.moveTo(l.x, l.y);
                n.lineTo(h.x, h.y)
            }
            n.strokeStyle = g.lineColor.call(this, d);
            n.stroke()
        }
    },
    _drawRadarScaleLabel: function(o, j, g, b, h, m) {
        var n = this.canvases.scale.renderText(0, 0, m, "dhx_axis_radar_title", 1);
        var c = n.scrollWidth;
        var l = n.offsetHeight;
        var k = 0.001;
        var f = this._getPositionByAngle(h, j, g, b + 5);
        var e = 0,
        d = 0;
        if (h < 0 || h > Math.PI) {
            d = -l
        }
        if (h > Math.PI / 2) {
            e = -c
        }
        if (Math.abs(h + Math.PI / 2) < k || Math.abs(h - Math.PI / 2) < k) {
            e = -c / 2
        } else {
            if (Math.abs(h) < k || Math.abs(h - Math.PI) < k) {
                d = -l / 2
            }
        }
        n.style.top = f.y + d + "px";
        n.style.left = f.x + e + "px";
        n.style.width = c + "px";
        n.style.whiteSpace = "nowrap"
    }
};
dhtmlx.chart.area = {
    pvt_render_area: function(h, w, e, d, j, t) {
        var l, s, m, k, f, r, g, v, u, q, o, b, n, a, c;
        r = this._calculateLineParams(h, w, e, d, j);
        s = this._settings;
        k = (s.eventRadius || Math.floor(r.cellWidth / 2));
        if (w.length) {
            g = [];
            q = (!s.offset ? e.x: e.x + r.cellWidth * 0.5);
            for (m = 0; m < w.length; m++) {
                f = w[m];
                u = this._getPointY(f, e, d, r);
                n = q + r.cellWidth * m;
                if (u) {
                    a = (typeof u == "object" ? u.y0: u);
                    if (m && this._settings.fixOverflow) {
                        v = this._getPointY(w[m - 1], e, d, r);
                        if (v.out && v.out == u.out) {
                            continue
                        }
                        o = r.cellWidth * (m - 1) - 0.5 + q;
                        b = (typeof v == "object" ? v.y0: v);
                        if (v.out) {
                            c = (v.out == "min" ? d.y: e.y);
                            g.push([this._calcOverflowX(o, n, b, a, c), c])
                        }
                        if (u.out) {
                            c = (u.out == "min" ? d.y: e.y);
                            g.push([this._calcOverflowX(o, n, b, a, c), c]);
                            if (m == (w.length - 1) && c == e.y) {
                                g.push([n, e.y])
                            }
                        }
                    }
                    if (!u.out) {
                        g.push([n, a]);
                        t.addRect(f.id, [n - k - e.x, a - k - e.y, n + k - e.x, a + k - e.y], j)
                    }
                    if (!s.yAxis) {
                        l = (!s.offset && (m == w.length - 1) ? "left": "center");
                        this.canvases[j].renderTextAt(false, l, n, a - s.labelOffset, s.label(f))
                    }
                }
            }
            if (g.length) {
                g.push([n, d.y]);
                g.push([g[0][0], d.y])
            }
            h.globalAlpha = this._settings.alpha.call(this, w[0]);
            h.fillStyle = this._settings.color.call(this, w[0]);
            h.beginPath();
            this._path(h, g);
            h.fill();
            if (s.border) {
                h.lineWidth = s.borderWidth || 1;
                if (s.borderColor) {
                    h.strokeStyle = s.borderColor.call(this, w[0])
                } else {
                    this._setBorderStyles(h, h.fillStyle)
                }
                h.beginPath();
                this._path(h, g);
                h.stroke()
            }
            h.lineWidth = 1;
            h.globalAlpha = 1
        }
    }
};
dhtmlx.chart.stackedArea = {
    pvt_render_stackedArea: function(k, w, b, a, l, u) {
        var A, z, o, t, r, q, e, n, f, s, h, d, c, g;
        s = this._calculateLineParams(k, w, b, a, l);
        t = this._settings;
        n = (t.eventRadius || Math.floor(s.cellWidth / 2));
        if (w.length) {
            h = [];
            g = [];
            d = (!t.offset ? b.x: b.x + s.cellWidth * 0.5);
            var v = function(j, x) {
                return l ? (w[j].$startY ? x - a.y + w[j].$startY: 0) : x
            };
            var m = function(j, C, B) {
                var y = (B.y - C.y) / (B.x - C.x);
                return y * j + C.y - y * C.x
            };
            for (r = 0; r < w.length; r++) {
                f = w[r];
                if (!r) {
                    c = v(r, a.y);
                    h.push([d, c])
                } else {
                    d += s.cellWidth
                }
                c = v(r, this._getPointY(f, b, a, s));
                g.push((isNaN(c) && !r) ? (w[r].$startY || a.y) : c);
                if (c) {
                    h.push([d, c]);
                    u.addRect(f.id, [d - n - b.x, c - n - b.y, d + n - b.x, c + n - b.y], l);
                    if (!t.yAxis) {
                        o = (!t.offset && e ? "left": "center");
                        this.canvases[l].renderTextAt(false, o, d, c - t.labelOffset, t.label(f))
                    }
                }
            }
            h.push([d, v(r - 1, a.y)]);
            if (l) {
                for (r = w.length - 2; r > 0; r--) {
                    d -= s.cellWidth;
                    c = w[r].$startY;
                    if (c) {
                        h.push([d, c])
                    }
                }
            }
            h.push([h[0][0], h[0][1]]);
            k.globalAlpha = this._settings.alpha.call(this, w[0]);
            k.fillStyle = this._settings.color.call(this, w[0]);
            k.beginPath();
            this._path(k, h);
            k.fill();
            for (r = 0; r < w.length; r++) {
                c = g[r];
                if (!c) {
                    if (r == w.length - 1) {
                        c = w[r].$startY
                    }
                    for (q = r + 1; q < w.length; q++) {
                        if (g[q]) {
                            A = {
                                x: b.x,
                                y: g[0]
                            };
                            z = {
                                x: (b.x + s.cellWidth * q),
                                y: g[q]
                            };
                            c = m(b.x + s.cellWidth * r, A, z);
                            break
                        }
                    }
                }
                w[r].$startY = c
            }
        }
    }
};
dhtmlx.chart.spline = {
    pvt_render_spline: function(k, z, d, c, l, w) {
        var v, n, h, m, u, g, f, r, q, o, e, b, a;
        u = this._calculateLineParams(k, z, d, c, l);
        v = this._settings;
        this._mapStart = d;
        h = [];
        if (z.length) {
            r = (v.offset ? d.x + u.cellWidth * 0.5 : d.x);
            for (n = 0; n < z.length; n++) {
                e = this._getPointY(z[n], d, c, u);
                if (e) {
                    f = ((!n) ? r: u.cellWidth * n - 0.5 + r);
                    h.push({
                        x: f,
                        y: e,
                        index: n
                    })
                }
            }
            g = this._getSplineParameters(h);
            for (n = 0; n < h.length; n++) {
                q = h[n].x;
                b = h[n].y;
                if (n < h.length - 1) {
                    o = h[n + 1].x;
                    a = h[n + 1].y;
                    for (m = q; m < o; m++) {
                        var t = this._getSplineYPoint(m, q, n, g.a, g.b, g.c, g.d);
                        if (t < d.y) {
                            t = d.y
                        }
                        if (t > c.y) {
                            t = c.y
                        }
                        var s = this._getSplineYPoint(m + 1, q, n, g.a, g.b, g.c, g.d);
                        if (s < d.y) {
                            s = d.y
                        }
                        if (s > c.y) {
                            s = c.y
                        }
                        this._drawLine(k, m, t, m + 1, s, v.line.color(z[n]), v.line.width)
                    }
                    this._drawLine(k, o - 1, this._getSplineYPoint(m, q, n, g.a, g.b, g.c, g.d), o, a, v.line.color(z[n]), v.line.width)
                }
                this._drawItem(k, q, b, z[h[n].index], v.label(z[h[n].index]), l, w)
            }
        }
    },
    _getSplineParameters: function(r) {
        var g, w, t, x, q, o, l, k, j = [],
        f = [],
        e = r.length;
        for (g = 0; g < e - 1; g++) {
            j[g] = r[g + 1].x - r[g].x;
            f[g] = (r[g + 1].y - r[g].y) / j[g]
        }
        w = [];
        t = [];
        w[0] = 0;
        w[1] = 2 * (j[0] + j[1]);
        t[0] = 0;
        t[1] = 6 * (f[1] - f[0]);
        for (g = 2; g < e - 1; g++) {
            w[g] = 2 * (j[g - 1] + j[g]) - j[g - 1] * j[g - 1] / w[g - 1];
            t[g] = 6 * (f[g] - f[g - 1]) - j[g - 1] * t[g - 1] / w[g - 1]
        }
        x = [];
        x[e - 1] = x[0] = 0;
        for (g = e - 2; g >= 1; g--) {
            x[g] = (t[g] - j[g] * x[g + 1]) / w[g]
        }
        q = [];
        o = [];
        l = [];
        k = [];
        for (g = 0; g < e - 1; g++) {
            q[g] = r[g].y;
            o[g] = -j[g] * x[g + 1] / 6 - j[g] * x[g] / 3 + (r[g + 1].y - r[g].y) / j[g];
            l[g] = x[g] / 2;
            k[g] = (x[g + 1] - x[g]) / (6 * j[g])
        }
        return {
            a: q,
            b: o,
            c: l,
            d: k
        }
    },
    _getSplineYPoint: function(f, h, j, g, e, l, k) {
        return g[j] + (f - h) * (e[j] + (f - h) * (l[j] + (f - h) * k[j]))
    }
};
dhtmlx.chart.barH = {
    pvt_render_barH: function(u, G, g, f, v, F) {
        var m, o, x, w, a, z, k, D, q, E, b, s, h, A, r, e, t, n, C, d, l;
        x = (f.y - g.y) / G.length;
        k = this._getLimits("h");
        D = k.max;
        q = k.min;
        e = f.x - g.x;
        l = !!this._settings.yAxis;
        if (!v) {
            this._drawHScales(u, G, g, f, q, D, x)
        }
        if (l) {
            D = parseFloat(this._settings.xAxis.end);
            q = parseFloat(this._settings.xAxis.start)
        }
        A = this._getRelativeValue(q, D);
        s = A[0];
        b = A[1];
        n = (s ? e / s: 10);
        if (!l) {
            r = 10;
            n = (s ? (e - r) / s: 10)
        }
        o = parseInt(this._settings.width, 10);
        var B = this._series.length;
        var j = this._settings.seriesMargin;
        var c = this._settings.seriesPadding;
        if (this._series && (o * B + c + (B > 2 ? j * B: 0) > x)) {
            o = x / B - c - (B > 2 ? j: 0)
        }
        m = (x - o * B - j * (B - 1)) / 2;
        if (this._settings.border) {
            o = parseInt(o, 10);
            m = parseInt(m, 10)
        }
        h = (typeof this._settings.radius != "undefined" ? parseInt(this._settings.radius, 10) : Math.round(o / 5));
        E = false;
        a = this._settings.gradient;
        if (a && typeof(a) != "function") {
            E = a;
            a = false
        } else {
            if (a) {
                a = u.createLinearGradient(g.x, g.y, f.x, g.y);
                this._settings.gradient(a)
            }
        }
        if (!l) {
            this._drawLine(u, g.x - 0.5, g.y, g.x - 0.5, f.y, "#000000", 1)
        }
        for (z = 0; z < G.length; z++) {
            t = parseFloat(this._settings.value(G[z] || 0));
            if (t > D) {
                t = D
            }
            t -= q;
            t *= b;
            C = g.x;
            d = g.y + m + (B > 2 ? j * v: 0) + parseInt(z * x, 10) + o * v;
            if ((t < 0 && this._settings.origin == "auto") || (this._settings.xAxis && t === 0 && !(this._settings.origin != "auto" && this._settings.origin > q))) {
                this.canvases[v].renderTextAt("middle", "right", C + 10, d + o / 2 + m, this._settings.label(G[z]));
                continue
            }
            if (t < 0 && this._settings.origin != "auto" && this._settings.origin > q) {
                t = 0
            }
            if (!l) {
                t += r / n
            }
            w = a || this._settings.color.call(this, G[z]);
            if (this._settings.border) {
                this._drawBarHBorder(u, C, d, o, q, h, n, t, w)
            }
            u.globalAlpha = this._settings.alpha.call(this, G[z]);
            var y = this._drawBarH(u, f, C, d, o, q, h, n, t, w, a, E);
            if (E != false) {
                this._drawBarHGradient(u, C, d, o, q, h, n, t, w, E)
            }
            u.globalAlpha = 1;
            if (y[3] == d) {
                this.canvases[v].renderTextAt("middle", "left", y[0] - 5, y[3] + Math.floor(o / 2), this._settings.label(G[z]));
                F.addRect(G[z].id, [y[0] - g.x, y[3] - g.y, y[2] - g.x, y[3] + o - g.y], v)
            } else {
                this.canvases[v].renderTextAt("middle", false, y[2] + 5, y[1] + Math.floor(o / 2), this._settings.label(G[z]));
                F.addRect(G[z].id, [y[0] - g.x, d - g.y, y[2] - g.x, y[3] - g.y], v)
            }
        }
    },
    _setBarHPoints: function(q, d, n, r, g, o, m, f, e) {
        var b = 0;
        if (g > o * m) {
            var l = (g - o * m) / g;
            b = -Math.asin(l) + Math.PI / 2
        }
        q.moveTo(d, n + f);
        var c = d + o * m - g - (g ? 0 : f);
        if (g < o * m) {
            q.lineTo(c, n + f)
        }
        var k = n + g;
        if (g && g > 0) {
            q.arc(c, k, g - f, -Math.PI / 2 + b, 0, false)
        }
        var j = n + r - g - (g ? 0 : f);
        var a = c + g - (g ? f: 0);
        q.lineTo(a, j);
        if (g && g > 0) {
            q.arc(c, j, g - f, 0, Math.PI / 2 - b, false)
        }
        var h = n + r - f;
        q.lineTo(d, h);
        if (!e) {
            q.lineTo(d, n + f)
        }
        return [a, h]
    },
    _drawHScales: function(c, g, f, e, h, b, d) {
        var a = 0;
        if (this._settings.xAxis) {
            if (!this.canvases.x) {
                this.canvases.x = new dhtmlx.ui.Canvas(this._obj)
            }
            a = this._drawHXAxis(this.canvases.x.getCanvas(), g, f, e, h, b)
        }
        if (this._settings.yAxis) {
            if (!this.canvases.y) {
                this.canvases.y = new dhtmlx.ui.Canvas(this._obj)
            }
            this._drawHYAxis(this.canvases.y.getCanvas(), g, f, e, d, a)
        }
    },
    _drawHYAxis: function(m, e, j, g, c, a) {
        if (!this._settings.yAxis) {
            return
        }
        var f;
        var b = parseInt((a ? a: j.x), 10) - 0.5;
        var k = g.y + 0.5;
        var h = j.y;
        this._drawLine(m, b, k, b, h, this._settings.yAxis.color, 1);
        for (var d = 0; d < e.length; d++) {
            var l = ((this._settings.origin != "auto") && (this._settings.view == "barH") && (parseFloat(this._settings.value(e[d])) < this._settings.origin));
            f = h + c / 2 + d * c;
            this.canvases.y.renderTextAt("middle", (l ? false: "left"), (l ? b + 5 : b - 5), f, this._settings.yAxis.template(e[d]), "dhx_axis_item_y", (l ? 0 : b - 10));
            if (this._settings.yAxis.lines.call(this, e[d])) {
                this._drawLine(m, j.x, f, g.x, f, this._settings.yAxis.lineColor.call(this, e[d]), 1)
            }
        }
        this._drawLine(m, j.x + 0.5, h + 0.5, g.x, h + 0.5, this._settings.yAxis.lineColor.call(this, {}), 1);
        this._setYAxisTitle(j, g)
    },
    _drawHXAxis: function(r, w, f, e, h, g) {
        var j;
        var o = {};
        var b = this._settings.xAxis;
        if (!b) {
            return
        }
        var d = e.y + 0.5;
        var u = f.x - 0.5;
        var t = e.x - 0.5;
        var n = f.x;
        this._drawLine(r, u, d, t, d, b.color, 1);
        if (b.step) {
            j = parseFloat(b.step)
        }
        if (typeof this._configXAxis.step == "undefined" || typeof this._configXAxis.start == "undefined" || typeof this._configXAxis.end == "undefined") {
            o = this._calculateScale(h, g);
            h = o.start;
            g = o.end;
            j = o.step;
            this._settings.xAxis.end = g;
            this._settings.xAxis.start = h;
            this._settings.xAxis.step = j
        }
        if (j === 0) {
            return
        }
        var a = (t - u) * j / (g - h);
        var v = 0;
        for (var s = h; s <= g; s += j) {
            if (o.fixNum) {
                s = parseFloat((new Number(s)).toFixed(o.fixNum))
            }
            var q = Math.floor(u + v * a) + 0.5;
            if (! (s == h && this._settings.origin == "auto") && b.lines.call(this, s)) {
                this._drawLine(r, q, d, q, f.y, this._settings.xAxis.lineColor.call(this, s), 1)
            }
            if (s == this._settings.origin) {
                n = q + 1
            }
            var k = s;
            if (j < 1) {
                var l = Math.min(this._log10(j), (h <= 0 ? 0 : this._log10(h)));
                var m = Math.pow(10, -l);
                k = Math.round(s * m) / m
            }
            this.canvases.x.renderTextAt(false, true, q, d + 2, b.template(k.toString()), "dhx_axis_item_x");
            v++
        }
        this.canvases.x.renderTextAt(true, false, u, e.y + this._settings.padding.bottom - 3, this._settings.xAxis.title, "dhx_axis_title_x", e.x - f.x);
        if (!b.lines.call(this, {})) {
            this._drawLine(r, u, f.y - 0.5, t, f.y - 0.5, this._settings.xAxis.color, 0.2)
        }
        return n
    },
    _correctBarHParams: function(h, e, c, f, g, j, d) {
        var a = this._settings.yAxis;
        var b = e;
        if ( !! a && this._settings.origin != "auto" && (this._settings.origin > d)) {
            e += (this._settings.origin - d) * g;
            b = e;
            f = f - (this._settings.origin - d);
            if (f < 0) {
                f *= ( - 1);
                h.translate(e, c + j);
                h.rotate(Math.PI);
                e = 0.5;
                c = 0
            }
            e += 0.5
        }
        return {
            value: f,
            x0: e,
            y0: c,
            start: b
        }
    },
    _drawBarH: function(n, e, t, d, j, k, f, h, m, o, a, g) {
        var q;
        n.save();
        var l = this._correctBarHParams(n, t, d, m, h, j, k);
        n.fillStyle = o;
        n.beginPath();
        if (h * l.value > 0) {
            q = this._setBarHPoints(n, l.x0, l.y0, j, f, h, l.value, (this._settings.border ? 1 : 0));
            if (a && !g) {
                n.lineTo(e.x, l.y0 + (this._settings.border ? 1 : 0))
            }
        } else {
            q = [l.x0, l.y0 + 1]
        }
        n.fill();
        n.restore();
        var c = l.y0;
        var b = (l.y0 != d ? d: q[1]);
        var s = (l.y0 != d ? (l.start - q[0]) : l.start);
        var r = (l.y0 != d ? l.start: q[0]);
        return [s, c, r, b]
    },
    _drawBarHBorder: function(j, b, g, k, e, d, h, f, c) {
        j.save();
        var a = this._correctBarHParams(j, b, g, f, h, k, e);
        j.beginPath();
        this._setBorderStyles(j, c);
        j.globalAlpha = 0.9;
        if (h * a.value > 0) {
            this._setBarHPoints(j, a.x0, a.y0, k, d, h, a.value, j.lineWidth / 2, 1)
        }
        j.stroke();
        j.restore()
    },
    _drawBarHGradient: function(l, c, j, m, g, f, k, h, d, a) {
        l.save();
        var b = this._correctBarHParams(l, c, j, h, k, m, g);
        var e = this._setBarGradient(l, b.x0, b.y0 + m, b.x0 + k * b.value, b.y0, a, d, "x");
        l.fillStyle = e.gradient;
        l.beginPath();
        if (k * b.value > 0) {
            this._setBarHPoints(l, b.x0, b.y0 + e.offset, m - e.offset * 2, f, k, b.value, e.offset)
        }
        l.fill();
        l.globalAlpha = 1;
        l.restore()
    }
};
dhtmlx.assert(dhtmlx.chart.barH);
dhtmlx.chart.stackedBarH = {
    pvt_render_stackedBarH: function(u, G, e, d, v, F) {
        var E, o;
        var b;
        var q;
        var s = d.x - e.x;
        var h = !!this._settings.yAxis;
        var g = this._getStackedLimits(G);
        E = g.max;
        o = g.min;
        var x = Math.floor((d.y - e.y) / G.length);
        if (!v) {
            this._drawHScales(u, G, e, d, o, E, x)
        }
        if (h) {
            E = parseFloat(this._settings.xAxis.end);
            o = parseFloat(this._settings.xAxis.start)
        }
        var B = this._getRelativeValue(o, E);
        q = B[0];
        b = B[1];
        var m = (q ? s / q: 10);
        if (!h) {
            var r = 10;
            m = (q ? (s - r) / q: 10)
        }
        var n = parseInt(this._settings.width, 10);
        if ((n + 4) > x) {
            n = x - 4
        }
        var j = (x - n) / 2;
        var f = 0;
        var k = false;
        var a = this._settings.gradient;
        if (a) {
            k = true
        }
        if (!h) {
            this._drawLine(u, e.x - 0.5, e.y, e.x - 0.5, d.y, "#000000", 1)
        }
        var D = 0;
        var A = 0;
        for (z = 0; z < this._series.length; z++) {
            if (z == v) {
                A = D
            }
            if (this._series[z].view == "stackedBarH") {
                D++
            }
        }
        for (var z = 0; z < G.length; z++) {
            if (!A) {
                G[z].$startX = e.x
            }
            var t = parseFloat(this._settings.value(G[z] || 0));
            if (t > E) {
                t = E
            }
            t -= o;
            t *= b;
            var C = e.x;
            var c = e.y + j + z * x;
            if (!A) {
                G[z].$startX = C
            } else {
                C = G[z].$startX
            }
            if (t < 0 || (this._settings.yAxis && t === 0)) {
                this.canvases.y.renderTextAt("middle", true, C + 10, c + n / 2, this._settings.label(G[z]));
                continue
            }
            if (!h) {
                t += r / m
            }
            var w = this._settings.color.call(this, G[z]);
            u.globalAlpha = this._settings.alpha.call(this, G[z]);
            u.fillStyle = this._settings.color.call(this, G[z]);
            u.beginPath();
            var y = this._setBarHPoints(u, C, c, n, f, m, t, (this._settings.border ? 1 : 0));
            if (a && !k) {
                u.lineTo(e.x + s, c + (this._settings.border ? 1 : 0))
            }
            u.fill();
            if (k != false) {
                var l = this._setBarGradient(u, C, c + n, C, c, k, w, "x");
                u.fillStyle = l.gradient;
                u.beginPath();
                y = this._setBarHPoints(u, C, c, n, f, m, t, 0);
                u.fill()
            }
            if (this._settings.border) {
                this._drawBarHBorder(u, C, c, n, o, f, m, t, w)
            }
            u.globalAlpha = 1;
            this.canvases[v].renderTextAt("middle", true, G[z].$startX + (y[0] - G[z].$startX) / 2 - 1, c + (y[1] - c) / 2, this._settings.label(G[z]));
            F.addRect(G[z].id, [G[z].$startX - e.x, c - e.y, y[0] - e.x, y[1] - e.y], v);
            G[z].$startX = y[0]
        }
    }
};
dhtmlx.chart.stackedBar = {
    pvt_render_stackedBar: function(v, I, f, e, w, G) {
        var D, r, a, C, d;
        var b;
        var s;
        var F = this._settings;
        var t = e.y - f.y;
        var h = !!F.yAxis;
        var E = !!F.xAxis;
        var g = this._getStackedLimits(I);
        var H = (F.origin === 0);
        D = g.max;
        r = g.min;
        if (!I.length) {
            return
        }
        var y = (e.x - f.x) / I.length;
        if (!w) {
            a = this._drawScales(I, f, e, r, D, y)
        }
        if (h) {
            D = parseFloat(F.yAxis.end);
            r = parseFloat(F.yAxis.start)
        }
        var B = this._getRelativeValue(r, D);
        s = B[0];
        b = B[1];
        var o = (s ? t / s: 10);
        var q = parseInt(F.width, 10);
        if (q + 4 > y) {
            q = y - 4
        }
        var j = Math.floor((y - q) / 2);
        var l = (F.gradient ? F.gradient: false);
        if (!E) {
            this._drawLine(v, f.x, e.y + 0.5, e.x, e.y + 0.5, "#000000", 1)
        }
        for (var A = 0; A < I.length; A++) {
            var u = parseFloat(F.value(I[A] || 0));
            if (this._logScaleCalc) {
                u = this._log10(u)
            }
            C = f.x + j + A * y;
            var k = H && u < 0;
            if (!w) {
                d = a - 1;
                I[A].$startY = d;
                if (H) {
                    if (k) {
                        d = a + 1
                    }
                    I[A].$startYN = a + 1
                }
            } else {
                d = k ? I[A].$startYN: I[A].$startY
            }
            if (!u) {
                continue
            }
            if (!w && !H) {
                u -= r
            }
            u *= b;
            if (d < (f.y + 1)) {
                continue
            }
            if (F.yAxis && u === 0) {
                this.canvases.y.renderTextAt(true, true, C + Math.floor(q / 2), d, this._settings.label(I[A]));
                continue
            }
            var x = this._settings.color.call(this, I[A]);
            var n = Math.abs(d - (H ? (e.y + r * o) : e.y)) < 3;
            v.globalAlpha = F.alpha.call(this, I[A]);
            v.fillStyle = v.strokeStyle = F.color.call(this, I[A]);
            v.beginPath();
            var c = d - o * u + (n ? (k ? -1 : 1) : 0);
            var z = this._setStakedBarPoints(v, C - (F.border ? 0.5 : 0), d, q + (F.border ? 0.5 : 0), c, 0, f.y);
            v.fill();
            v.stroke();
            if (l) {
                v.save();
                var m = this._setBarGradient(v, C, d, C + q, z[1], l, x, "y");
                v.fillStyle = m.gradient;
                v.beginPath();
                z = this._setStakedBarPoints(v, C + m.offset, d, q - m.offset * 2, c, (F.border ? 1 : 0), f.y);
                v.fill();
                v.restore()
            }
            if (F.border) {
                v.save();
                if (typeof F.border == "string") {
                    v.strokeStyle = F.border
                } else {
                    this._setBorderStyles(v, x)
                }
                v.beginPath();
                this._setStakedBarPoints(v, C - 0.5, parseInt(d, 10) + 0.5, q + 1, parseInt(c, 10) + 0.5, 0, f.y, n);
                v.stroke();
                v.restore()
            }
            v.globalAlpha = 1;
            this.canvases[w].renderTextAt(false, true, C + Math.floor(q / 2), (z[1] + (d - z[1]) / 2) - 7, this._settings.label(I[A]));
            G.addRect(I[A].id, [C - f.x, z[1] - f.y, z[0] - f.x, I[A][k ? "$startYN": "$startY"] - f.y], w);
            I[A][k ? "$startYN": "$startY"] = z[1]
        }
    },
    _setStakedBarPoints: function(k, b, h, l, g, d, c, e) {
        k.moveTo(b, h);
        if (g < c) {
            g = c
        }
        k.lineTo(b, g);
        var a = b + l;
        var f = g;
        k.lineTo(a, f);
        var j = b + l;
        k.lineTo(j, h);
        if (!e) {
            k.lineTo(b, h)
        }
        return [j, f]
    }
};
dhtmlx.chart.line = {
    pvt_render_line: function(g, t, e, d, h, r) {
        var q, j, f, n, m, l, k, b, a, c, s, o;
        n = this._calculateLineParams(g, t, e, d, h);
        q = this._settings;
        if (t.length) {
            m = (q.offset ? e.x + n.cellWidth * 0.5 : e.x);
            f = [];
            for (j = 0; j < t.length; j++) {
                o = this._getPointY(t[j], e, d, n);
                if (o) {
                    k = ((!j) ? m: n.cellWidth * j - 0.5 + m);
                    a = (typeof o == "object" ? o.y0: o);
                    if (j && this._settings.fixOverflow) {
                        s = this._getPointY(t[j - 1], e, d, n);
                        if (s.out && s.out == o.out) {
                            continue
                        }
                        l = n.cellWidth * (j - 1) - 0.5 + m;
                        b = (typeof s == "object" ? s.y0: s);
                        if (s.out) {
                            c = (s.out == "min" ? d.y: e.y);
                            f.push({
                                x: this._calcOverflowX(l, k, b, a, c),
                                y: c
                            })
                        }
                        if (o.out) {
                            c = (o.out == "min" ? d.y: e.y);
                            f.push({
                                x: this._calcOverflowX(l, k, b, a, c),
                                y: c
                            })
                        }
                    }
                    if (!o.out) {
                        f.push({
                            x: k,
                            y: o,
                            index: j
                        })
                    }
                }
            }
            this._mapStart = e;
            for (j = 1; j <= f.length; j++) {
                l = f[j - 1].x;
                b = f[j - 1].y;
                if (j < f.length) {
                    k = f[j].x;
                    a = f[j].y;
                    this._drawLine(g, l, b, k, a, q.line.color.call(this, t[j - 1]), q.line.width);
                    if (q.line && q.line.shadow) {
                        g.globalAlpha = 0.3;
                        this._drawLine(g, l + 2, b + q.line.width + 8, k + 2, a + q.line.width + 8, "#eeeeee", q.line.width + 3);
                        g.globalAlpha = 1
                    }
                }
                if (typeof f[j - 1].index != "undefined") {
                    this._drawItem(g, l, b, t[f[j - 1].index], q.label(t[f[j - 1].index]), h, r, e)
                }
            }
        }
    },
    _calcOverflowX: function(b, a, d, c, e) {
        return b + (e - d) * (a - b) / (c - d)
    },
    _drawItem: function(n, c, m, j, l, k, b) {
        var d = this._settings.item;
        var h = parseInt(d.radius.call(this, j), 10) || 0;
        var g = this._mapStart;
        if (h) {
            n.save();
            if (d.shadow) {
                n.lineWidth = 1;
                n.strokeStyle = "#bdbdbd";
                n.fillStyle = "#bdbdbd";
                var a = [0.1, 0.2, 0.3];
                for (var f = (a.length - 1); f >= 0; f--) {
                    n.globalAlpha = a[f];
                    n.strokeStyle = "#d0d0d0";
                    n.beginPath();
                    this._strokeChartItem(n, c, m + 2 * h / 3, h + f + 1, d.type);
                    n.stroke()
                }
                n.beginPath();
                n.globalAlpha = 0.3;
                n.fillStyle = "#bdbdbd";
                this._strokeChartItem(n, c, m + 2 * h / 3, h + 1, d.type);
                n.fill()
            }
            n.restore();
            if (d.type == "image" && d.src) {
                this._drawImage(n, c - h, m - h, d.src, h * 2, h * 2)
            } else {
                n.lineWidth = d.borderWidth;
                n.fillStyle = d.color.call(this, j);
                n.strokeStyle = d.borderColor.call(this, j);
                n.globalAlpha = d.alpha.call(this, j);
                n.beginPath();
                this._strokeChartItem(n, c, m, h + 1, d.type);
                n.fill();
                n.stroke();
                n.globalAlpha = 1
            }
        }
        if (l) {
            this.canvases[k].renderTextAt(false, true, c, m - h - this._settings.labelOffset, this._settings.label.call(this, j))
        }
        var e = (this._settings.eventRadius || h + 1);
        b.addRect(j.id, [c - e - g.x, m - e - g.y, c + e - g.x, m + e - g.y], k)
    },
    _drawImage: function(c, b, h, f, d, a) {
        var e = document.createElement("img");
        e.style.display = "none";
        e.style.width = d + "px";
        e.style.height = a + "px";
        document.body.appendChild(e);
        e.src = f;
        var g = function() {
            c.drawImage(e, b, h)
        };
        if (e.complete) {
            g(e)
        } else {
            e.onload = g
        }
    },
    _strokeChartItem: function(a, b, e, d, c) {
        var f = [];
        b = parseInt(b, 10);
        e = parseInt(e, 10);
        if (c && (c == "square" || c == "s")) {
            d *= Math.sqrt(2) / 2;
            f = [[b - d - a.lineWidth / 2, e - d], [b + d, e - d], [b + d, e + d], [b - d, e + d], [b - d, e - d]]
        } else {
            if (c && (c == "diamond" || c == "d")) {
                var g = (a.lineWidth > 1 ? a.lineWidth * Math.sqrt(2) / 4 : 0);
                f = [[b, e - d], [b + d, e], [b, e + d], [b - d, e], [b + g, e - d - g]]
            } else {
                if (c && (c == "triangle" || c == "t")) {
                    f = [[b, e - d], [b + Math.sqrt(3) * d / 2, e + d / 2], [b - Math.sqrt(3) * d / 2, e + d / 2], [b, e - d]]
                } else {
                    f = [[b, e, d, 0, Math.PI * 2, true]]
                }
            }
        }
        this._path(a, f)
    },
    _getPointY: function(c, h, f, a) {
        var g = a.minValue;
        var d = a.maxValue;
        var k = a.unit;
        var b = a.valueFactor;
        var j = this._settings.value(c);
        var l = (parseFloat(j || 0) - g) * b;
        if (!this._settings.yAxis) {
            l += a.startValue / k
        }
        var e = f.y - k * l;
        if (this._settings.fixOverflow && (this._settings.view == "line" || this._settings.view == "area")) {
            if (j > d) {
                e = {
                    y: h.y,
                    y0: e,
                    out: "max"
                }
            } else {
                if (l < 0 || j < g) {
                    e = {
                        y: f.y,
                        y0: e,
                        out: "min"
                    }
                }
            }
        } else {
            if (j > d) {
                e = h.y
            }
            if (l < 0 || j < g) {
                e = f.y
            }
        }
        return e
    },
    _calculateLineParams: function(j, d, g, f, e) {
        var b = {};
        var k;
        b.totalHeight = f.y - g.y;
        b.cellWidth = (f.x - g.x) / ((!this._settings.offset) ? (d.length - 1) : d.length);
        var c = !!this._settings.yAxis;
        var a = (this._settings.view.indexOf("stacked") != -1 ? this._getStackedLimits(d) : this._getLimits());
        b.maxValue = a.max;
        b.minValue = a.min;
        if (!e) {
            this._drawScales(d, g, f, b.minValue, b.maxValue, b.cellWidth)
        }
        if (c) {
            b.maxValue = parseFloat(this._settings.yAxis.end);
            b.minValue = parseFloat(this._settings.yAxis.start)
        }
        var h = this._getRelativeValue(b.minValue, b.maxValue);
        k = h[0];
        b.valueFactor = h[1];
        b.unit = (k ? b.totalHeight / k: 10);
        b.startValue = 0;
        if (!c) {
            b.startValue = 10;
            if (b.unit != b.totalHeight) {
                b.unit = (k ? (b.totalHeight - b.startValue) / k: 10)
            }
        }
        return b
    }
};
dhtmlx.chart.bar = {
    pvt_render_bar: function(u, I, f, e, v, H) {
        var o, x, A, j, F, q, r, b, B, s, n, E, k, G = e.y - f.y;
        k = !!this._settings.yAxis;
        E = !!this._settings.xAxis;
        j = this._getLimits();
        F = j.max;
        q = j.min;
        x = (e.x - f.x) / I.length;
        if (!v && !(this._settings.origin != "auto" && !k)) {
            this._drawScales(I, f, e, q, F, x)
        }
        if (k) {
            F = parseFloat(this._settings.yAxis.end);
            q = parseFloat(this._settings.yAxis.start)
        }
        B = this._getRelativeValue(q, F);
        r = B[0];
        b = B[1];
        n = (r ? G / r: r);
        if (!k && !(this._settings.origin != "auto" && E)) {
            s = 10;
            n = (r ? (G - s) / r: s)
        }
        if (!v && (this._settings.origin != "auto" && !k) && this._settings.origin > q) {
            this._drawXAxis(u, I, f, e, x, e.y - n * (this._settings.origin - q))
        }
        o = parseInt(this._settings.width, 10);
        var D = 0;
        var z = 0;
        for (A = 0; A < this._series.length; A++) {
            if (A == v) {
                z = D
            }
            if (this._series[A].view == "bar") {
                D++
            }
        }
        var h = this._settings.seriesMargin;
        var d = this._settings.seriesPadding;
        if (this._series && (o * D + d + (D > 2 ? h * D: 0) > x)) {
            o = x / D - d - (D > 2 ? h: 0)
        }
        var l = (x - o * D - h * (D - 1)) / 2;
        if (this._settings.border) {
            o = parseInt(o, 10);
            l = parseInt(l, 10)
        }
        var g = (typeof this._settings.radius != "undefined" ? parseInt(this._settings.radius, 10) : Math.round(o / 5));
        var m = false;
        var a = this._settings.gradient;
        if (a && typeof(a) != "function") {
            m = a;
            a = false
        } else {
            if (a) {
                a = u.createLinearGradient(0, e.y, 0, f.y);
                this._settings.gradient(a)
            }
        }
        if (!E) {
            this._drawLine(u, f.x, e.y + 0.5, e.x, e.y + 0.5, "#000000", 1)
        }
        for (A = 0; A < I.length; A++) {
            var t = parseFloat(this._settings.value(I[A]) || 0);
            if (isNaN(t)) {
                continue
            }
            if (t > F) {
                t = F
            }
            t -= q;
            t *= b;
            var C = f.x + l + (D > 2 ? h * z: 0) + A * x + o * z;
            var c = e.y;
            if (t < 0 || (this._settings.yAxis && t === 0 && !(this._settings.origin != "auto" && this._settings.origin > q))) {
                this.canvases[v].renderTextAt(true, true, C + Math.floor(o / 2), c, this._settings.label(I[A]));
                continue
            }
            if (!k && !(this._settings.origin != "auto" && E)) {
                t += s / n
            }
            var w = a || this._settings.color.call(this, I[A]);
            u.globalAlpha = this._settings.alpha.call(this, I[A]);
            var y = this._drawBar(u, f, C, c, o, q, g, n, t, w, a, m);
            if (m) {
                this._drawBarGradient(u, C, c, o, q, g, n, t, w, m)
            }
            if (this._settings.border) {
                this._drawBarBorder(u, C, c, o, q, g, n, t, w)
            }
            u.globalAlpha = 1;
            if (y[0] != C) {
                this.canvases[v].renderTextAt(false, true, C + Math.floor(o / 2), y[1], this._settings.label(I[A]))
            } else {
                this.canvases[v].renderTextAt(true, true, C + Math.floor(o / 2), y[3], this._settings.label(I[A]))
            }
            H.addRect(I[A].id, [C - f.x, y[3] - f.y, y[2] - f.x, y[1] - f.y], v)
        }
    },
    _correctBarParams: function(h, e, c, f, g, j, d) {
        var a = this._settings.xAxis;
        var b = c;
        if ( !! a && this._settings.origin != "auto" && (this._settings.origin > d)) {
            c -= (this._settings.origin - d) * g;
            b = c;
            f = f - (this._settings.origin - d);
            if (f < 0) {
                f *= ( - 1);
                h.translate(e + j, c);
                h.rotate(Math.PI);
                e = 0;
                c = 0
            }
            c -= 0.5
        }
        return {
            value: f,
            x0: e,
            y0: c,
            start: b
        }
    },
    _drawBar: function(n, e, t, d, j, k, f, h, m, o, a, g) {
        var q;
        n.save();
        n.fillStyle = o;
        var l = this._correctBarParams(n, t, d, m, h, j, k);
        if (h * l.value > 0) {
            q = this._setBarPoints(n, l.x0, l.y0, j, f, h, l.value, (this._settings.border ? 1 : 0))
        } else {
            q = [l.x0, l.y0]
        }
        if (a && !g) {
            n.lineTo(l.x0 + (this._settings.border ? 1 : 0), e.y)
        }
        n.fill();
        n.restore();
        var s = l.x0;
        var r = (l.x0 != t ? t + q[0] : q[0]);
        var c = (l.x0 != t ? (l.start - q[1] - l.y0) : l.y0);
        var b = (l.x0 != t ? l.start - l.y0: q[1]);
        return [s, c, r, b]
    },
    _drawBarBorder: function(j, b, g, k, e, d, h, f, c) {
        var a;
        j.save();
        a = this._correctBarParams(j, b, g, f, h, k, e);
        this._setBorderStyles(j, c);
        if (h * a.value > 0) {
            this._setBarPoints(j, a.x0, a.y0, k, d, h, a.value, j.lineWidth / 2, 1)
        }
        j.stroke();
        j.restore()
    },
    _drawBarGradient: function(m, d, k, n, h, g, l, j, e, b) {
        m.save();
        var c = this._correctBarParams(m, d, k, j, l, n, h);
        var f = this._setBarGradient(m, c.x0, c.y0, c.x0 + n, c.y0 - l * c.value + 2, b, e, "y");
        var a = this._settings.border ? 1 : 0;
        m.fillStyle = f.gradient;
        if (l * c.value > 0) {
            this._setBarPoints(m, c.x0 + f.offset, c.y0, n - f.offset * 2, g, l, c.value, f.offset + a)
        }
        m.fill();
        m.restore()
    },
    _setBarPoints: function(q, d, m, r, h, n, l, e, g) {
        q.beginPath();
        var b = 0;
        if (h > n * l) {
            var f = (h - n * l) / h;
            if (f <= 1 && f >= -1) {
                b = -Math.acos(f) + Math.PI / 2
            }
        }
        q.moveTo(d + e, m);
        var k = m - Math.floor(n * l) + h + (h ? 0 : e);
        if (h < n * l) {
            q.lineTo(d + e, k)
        }
        var c = d + h;
        if (h && h > 0) {
            q.arc(c, k, h - e, -Math.PI + b, -Math.PI / 2, false)
        }
        var a = d + r - h - e;
        var j = k - h + (h ? e: 0);
        q.lineTo(a, j);
        if (h && h > 0) {
            q.arc(a, k, h - e, -Math.PI / 2, 0 - b, false)
        }
        var o = d + r - e;
        q.lineTo(o, m);
        if (!g) {
            q.lineTo(d + e, m)
        }
        return [o, j]
    }
};
dhtmlx.chart.pie = {
    pvt_render_pie: function(b, d, a, f, c, e) {
        this._renderPie(b, d, a, f, 1, e, c)
    },
    _renderPie: function(m, x, e, d, v, w, n) {
        if (!x.length) {
            return
        }
        var o = this._getPieParameters(e, d);
        var g = (this._settings.radius ? this._settings.radius: o.radius);
        if (g < 0) {
            return
        }
        var a = this._getValues(x);
        var f = this._getTotalValue(a);
        var h = this._getRatios(a, f);
        var u = (this._settings.x ? this._settings.x: o.x);
        var c = (this._settings.y ? this._settings.y: o.y);
        if (v == 1 && this._settings.shadow) {
            this._addShadow(m, u, c, g)
        }
        c = c / v;
        var l = -Math.PI / 2;
        var k;
        var r = [];
        m.scale(1, v);
        if (this._settings.gradient) {
            var t = (v != 1 ? u + g / 3 : u);
            var b = (v != 1 ? c + g / 3 : c);
            this._showRadialGradient(m, u, c, g, t, b)
        }
        if (this._settings.labelLines) {
            this._labelMargins = this._getLabelMargins(h, g)
        }
        for (var s = 0; s < x.length; s++) {
            if (!a[s]) {
                continue
            }
            m.strokeStyle = (x.length == 1 ? this._settings.color.call(this, x[s]) : this._settings.lineColor.call(this, x[s]));
            m.beginPath();
            m.moveTo(u, c);
            r.push(l);
            k = -Math.PI / 2 + h[s] - 0.0001;
            m.arc(u, c, g, l, k, false);
            m.lineTo(u, c);
            var q = this._settings.color.call(this, x[s]);
            m.fillStyle = q;
            m.fill();
            if (this._settings.pieInnerText) {
                this._drawSectorLabel(u, c, 5 * g / 6, l, k, v, this._settings.pieInnerText(x[s], f), true)
            }
            if (this._settings.label) {
                this._drawSectorLabel(u, c, g, l, k, v, this._settings.label(x[s]), 0, (this._labelMargins ? this._labelMargins[s] : {}), m)
            }
            if (v != 1) {
                this._createLowerSector(m, u, c, l, k, g, true);
                m.fillStyle = "#000000";
                m.globalAlpha = 0.2;
                this._createLowerSector(m, u, c, l, k, g, false);
                m.globalAlpha = 1;
                m.fillStyle = q
            }
            w.addSector(x[s].id, l, k, u - e.x, c - e.y / v, g, v, n);
            l = k
        }
        m.globalAlpha = 0.8;
        var j;
        if (r.length > 1) {
            for (s = 0; s < r.length; s++) {
                j = this._getPositionByAngle(r[s], u, c, g);
                this._drawLine(m, u, c, j.x, j.y, this._settings.lineColor.call(this, x[s]), 2)
            }
        }
        if (v == 1) {
            m.lineWidth = 2;
            m.strokeStyle = "#ffffff";
            m.beginPath();
            m.arc(u, c, g + 1, 0, 2 * Math.PI, false);
            m.stroke()
        }
        m.globalAlpha = 1;
        m.scale(1, 1 / v)
    },
    _getLabelMargins: function(o, f) {
        var x, w, C, B, a = [],
        s = [];
        var F = {
            1 : [0]
        };
        for (C = 1; C < o.length; C++) {
            x = -Math.PI / 2 + (C > 1 ? (o[C - 1] - (o[C - 1] - o[C - 2]) / 2) : o[C - 1] / 2);
            w = -Math.PI / 2 + o[C] - (o[C] - o[C - 1]) / 2;
            var e = Math.cos(w);
            var u = Math.sin(w);
            var g = Math.cos(x);
            var v = Math.sin(x);
            var y = Math.round((f + 8) * Math.abs(Math.sin(w) - Math.sin(x)));
            var m = (e < 0 ? (u < 0 ? 4 : 3) : (u < 0 ? 1 : 2));
            var n = (g < 0 ? (v < 0 ? 4 : 3) : (v < 0 ? 1 : 2));
            if (!F[m]) {
                F[m] = []
            }
            F[m].push(n == m ? y: 0)
        }
        var z = [];
        var E = 0;
        for (var t in F) {
            var d = 0;
            var b = F[t].length;
            var l = 0;
            var h = 0;
            if (t == 1 || t == 3) {
                B = t - 1;
                var D = 0;
                while (B > 0) {
                    if (F[B]) {
                        D += F[B].length
                    }
                    B--
                }
                z[D + F[t].length - 1] = {
                    y: 0,
                    x: 0
                };
                var B = F[t].length - 2;
                while (B >= 0) {
                    if ((l || B) && F[t][B + 1] - l < 18) {
                        l += 18 - F[t][B + 1]
                    } else {
                        l = 0
                    }
                    z[D + B] = {
                        y: l * (t == 1 ? -1 : 1)
                    };
                    B--
                }
                for (var A = z.length - F[t].length; A < z.length; A++) {
                    if (z[A]["y"] != 0) {
                        h += 6;
                        z[A]["x"] = h
                    } else {
                        z[A]["x"] = 0;
                        h = 0
                    }
                }
            } else {
                var B = 1;
                z.push({
                    y: 0,
                    x: 0
                });
                while (B < F[t].length) {
                    if (F[t][B] - l < 18) {
                        l += 18 - F[t][B]
                    } else {
                        l = 0
                    }
                    z.push({
                        y: l * (t == 4 ? -1 : 1)
                    });
                    B++
                }
                for (var A = z.length - 1; A >= z.length - F[t].length; A--) {
                    if (z[A]["y"] != 0) {
                        h += 8;
                        z[A]["x"] = h
                    } else {
                        h = 0;
                        z[A]["x"] = 0
                    }
                }
            }
        }
        return z
    },
    _getValues: function(c) {
        var a = [];
        for (var b = 0; b < c.length; b++) {
            a.push(parseFloat(this._settings.value(c[b]) || 0))
        }
        return a
    },
    _getTotalValue: function(a) {
        var c = 0;
        for (var b = 0; b < a.length; b++) {
            c += a[b]
        }
        return c
    },
    _getRatios: function(b, a) {
        var f;
        var e = [];
        var d = 0;
        a = a || this._getTotalValue(b);
        for (var c = 0; c < b.length; c++) {
            f = b[c];
            e[c] = Math.PI * 2 * (a ? ((f + d) / a) : (1 / b.length));
            d += f
        }
        return e
    },
    _getPieParameters: function(g, e) {
        var d = e.x - g.x;
        var b = e.y - g.y;
        var c = g.x + d / 2;
        var f = g.y + b / 2;
        var a = Math.min(d / 2, b / 2);
        return {
            x: c,
            y: f,
            radius: a
        }
    },
    _createLowerSector: function(d, e, g, c, a, f, b) {
        d.lineWidth = 1;
        if (! ((c <= 0 && a >= 0) || (c >= 0 && a <= Math.PI) || (Math.abs(c - Math.PI) > 0.003 && c <= Math.PI && a >= Math.PI))) {
            return
        }
        if (c <= 0 && a >= 0) {
            c = 0;
            b = false;
            this._drawSectorLine(d, e, g, f, c, a)
        }
        if (c <= Math.PI && a >= Math.PI) {
            a = Math.PI;
            b = false;
            this._drawSectorLine(d, e, g, f, c, a)
        }
        var h = (this._settings.height || Math.floor(f / 4)) / this._settings.cant;
        d.beginPath();
        d.arc(e, g, f, c, a, false);
        d.lineTo(e + f * Math.cos(a), g + f * Math.sin(a) + h);
        d.arc(e, g + h, f, a, c, true);
        d.lineTo(e + f * Math.cos(c), g + f * Math.sin(c));
        d.fill();
        if (b) {
            d.stroke()
        }
    },
    _drawSectorLine: function(c, d, f, e, b, a) {
        c.beginPath();
        c.arc(d, f, e, b, a, false);
        c.stroke()
    },
    _addShadow: function(b, a, f, d) {
        b.globalAlpha = 0.5;
        var e = ["#c4c4c4", "#c6c6c6", "#cacaca", "#dcdcdc", "#dddddd", "#e0e0e0", "#eeeeee", "#f5f5f5", "#f8f8f8"];
        for (var c = e.length - 1; c > -1; c--) {
            b.beginPath();
            b.fillStyle = e[c];
            b.arc(a + 1, f + 1, d + c, 0, Math.PI * 2, true);
            b.fill()
        }
        b.globalAlpha = 1
    },
    _getGrayGradient: function(a) {
        a.addColorStop(0, "#ffffff");
        a.addColorStop(0.7, "#7a7a7a");
        a.addColorStop(1, "#000000");
        return a
    },
    _showRadialGradient: function(c, b, g, a, d, e) {
        c.beginPath();
        var f;
        if (typeof this._settings.gradient != "function") {
            f = c.createRadialGradient(d, e, a / 4, b, g, a);
            f = this._getGrayGradient(f)
        } else {
            f = this._settings.gradient(f)
        }
        c.fillStyle = f;
        c.arc(b, g, a, 0, Math.PI * 2, true);
        c.fill();
        c.globalAlpha = 0.7
    },
    _drawSectorLabel: function(E, d, g, v, u, F, r, a, s, z) {
        var q = this.canvases[0].renderText(0, 0, r, 0, 1);
        if (!q) {
            return
        }
        var G = q.scrollWidth;
        q.style.width = G + "px";
        if (G > E) {
            G = E
        }
        var w = (u - v < 0.2 ? 4 : 8);
        if (a) {
            w = G / 1.8
        }
        var f = v + (u - v) / 2;
        var e = g;
        g = (a ? 5 * g / 6 : g + this._settings.labelOffset);
        g = g - (w - 8) / 2;
        var l = -w;
        var k = -8;
        var A = "right";
        if (f >= Math.PI / 2 && f < Math.PI || f <= 3 * Math.PI / 2 && f >= Math.PI) {
            l = -G - l;
            A = "left"
        }
        var h = 0;
        if (!a && F < 1 && (f > 0 && f < Math.PI)) {
            h = (this._settings.height || Math.floor(g / 4)) / F
        }
        var m = (d + Math.floor(g + h) * Math.sin(f)) * F + k;
        var n = E + Math.floor(g + w / 2) * Math.cos(f) + l;
        var j = (u < Math.PI / 2 + 0.01);
        var o = (v < Math.PI / 2);
        if (o && j) {
            n = Math.max(n, E + 3)
        } else {
            if (!o && !j) {
                n = Math.min(n, E - G)
            } else {
                if (!a && !this._settings.labelLines && (f >= Math.PI / 2 && f < Math.PI || f <= 3 * Math.PI / 2 && f >= Math.PI)) {
                    n += G / 3
                }
            }
        }
        if (this._settings.labelLines && !a) {
            var B = Math.abs((Math.abs(s || 0) + Math.abs(e * Math.sin(f))) / Math.sin(f));
            if (s.y) {
                m += s.y
            }
            if (A == "left") {
                n -= s.x
            } else {
                n += s.x
            }
            z.beginPath();
            z.strokeStyle = "#555";
            var D = E + e * Math.cos(f);
            var c = d + e * Math.sin(f);
            z.moveTo(D, c);
            var C = n - (A == "left" ? l - 8 : 2);
            var b = m;
            if (A == "left" && C > D) {
                C = D - Math.abs(b - c + 16) / Math.tan(f - Math.PI);
                b = b + 16;
                if (f < Math.PI) {
                    b -= 8
                }
            } else {
                b += 8
            }
            z.lineTo(C, b);
            z.lineTo(C + (A == "left" ? -5 : 5), b);
            z.stroke();
            m = b - 8;
            n = C + l + (A == "left" ? -15 : 15)
        }
        q.style.top = m + "px";
        q.style.left = n + "px";
        q.style.width = G + "px";
        q.style.textAlign = A;
        q.style.whiteSpace = "nowrap"
    }
};
dhtmlx.chart.pie3D = {
    pvt_render_pie3D: function(b, d, a, f, c, e) {
        this._renderPie(b, d, a, f, this._settings.cant, e)
    }
};
dhtmlx.chart.donut = {
    pvt_render_donut: function(m, e, k, j, g, b) {
        if (!e.length) {
            return
        }
        this._renderPie(m, e, k, j, 1, b);
        var d = this._settings;
        var f = this._getPieParameters(k, j);
        var a = (d.radius ? d.radius: f.radius);
        var h = ((d.innerRadius && (d.innerRadius < a)) ? d.innerRadius: a / 3);
        var c = (d.x ? d.x: f.x);
        var l = (d.y ? d.y: f.y);
        m.fillStyle = "#ffffff";
        m.beginPath();
        m.arc(c, l, h, 0, Math.PI * 2, true);
        m.fill()
    }
};
dhtmlx.DataDriver.dhtmlxgrid = {
    _grid_getter: "_get_cell_value",
    toObject: function(a) {
        this._grid = a;
        return a
    },
    getRecords: function(a) {
        return a.rowsBuffer
    },
    getDetails: function(c) {
        var a = {};
        for (var b = 0; b < this._grid.getColumnsNum(); b++) {
            a["data" + b] = this._grid[this._grid_getter](c, b)
        }
        return a
    },
    getInfo: function(a) {
        return {
            _size: 0,
            _from: 0
        }
    }
};
dhtmlx.ui.Canvas = function(b, c, e) {
    this._canvas_labels = [];
    this._canvas_name = c;
    this._obj = b;
    var d = b.offsetWidth * (window.devicePixelRatio || 1);
    var a = b.offsetHeight * (window.devicePixelRatio || 1);
    var e = e || "";
    e += ";width:" + b.offsetWidth + "px;height:" + b.offsetHeight + "px;";
    this._prepareCanvas(c, e, d, a)
};
dhtmlx.ui.Canvas.prototype = {
    _prepareCanvas: function(b, d, c, a) {
        this._canvas = dhtmlx.html.create("canvas", {
            width: c,
            height: a,
            canvas_id: b,
            style: (d || "")
        });
        this._obj.appendChild(this._canvas);
        if (!this._canvas.getContext) {
            if (dhtmlx._isIE) {
                dhtmlx.require("thirdparty/excanvas/excanvas.js");
                G_vmlCanvasManager.init_(document);
                G_vmlCanvasManager.initElement(this._canvas)
            } else {
                dhtmlx.error("Canvas is not supported in the current browser")
            }
        }
        return this._canvas
    },
    getCanvas: function(b) {
        var a = (this._canvas || this._prepareCanvas()).getContext(b || "2d");
        if (!this._dhtmlxDevicePixelRatio) {
            this._dhtmlxDevicePixelRatio = true;
            a.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1)
        }
        return a
    },
    _resizeCanvas: function() {
        if (this._canvas) {
            var a = this._canvas.parentNode.offsetWidth;
            var b = this._canvas.parentNode.offsetHeight;
            this._canvas.setAttribute("width", a * (window.devicePixelRatio || 1));
            this._canvas.setAttribute("height", b * (window.devicePixelRatio || 1));
            this._canvas.style.width = a + "px";
            this._canvas.style.height = b + "px";
            this._dhtmlxDevicePixelRatio = false
        }
    },
    renderText: function(a, f, e, d, b) {
        if (!e) {
            return
        }
        var c = dhtmlx.html.create("DIV", {
            "class": "dhx_canvas_text" + (d ? (" " + d) : ""),
            style: "left:" + a + "px; top:" + f + "px;"
        },
        e);
        this._obj.appendChild(c);
        this._canvas_labels.push(c);
        if (b) {
            c.style.width = b + "px"
        }
        return c
    },
    renderTextAt: function(e, j, a, h, d, g, b) {
        var f = this.renderText.call(this, a, h, d, g, b);
        if (f) {
            if (e) {
                if (e == "middle") {
                    f.style.top = parseInt(h - f.offsetHeight / 2, 10) + "px"
                } else {
                    f.style.top = h - f.offsetHeight + "px"
                }
            }
            if (j) {
                if (j == "left") {
                    f.style.left = a - f.offsetWidth + "px"
                } else {
                    f.style.left = parseInt(a - f.offsetWidth / 2, 10) + "px"
                }
            }
        }
        return f
    },
    clearCanvas: function(a) {
        var b = [],
        c;
        for (c = 0; c < this._canvas_labels.length; c++) {
            this._obj.removeChild(this._canvas_labels[c])
        }
        this._canvas_labels = [];
        if (!a && this._obj._htmlmap) {
            b = this._getMapAreas();
            while (b.length) {
                b[0].parentNode.removeChild(b[0]);
                b.splice(0, 1)
            }
            b = null;
            if (!this._obj._htmlmap.getElementsByTagName("AREA").length) {
                this._obj._htmlmap.parentNode.removeChild(this._obj._htmlmap);
                this._obj._htmlmap = null
            }
        }
        this.getCanvas().clearRect(0, 0, this._canvas.width, this._canvas.height)
    },
    toggleCanvas: function() {
        this._toggleCanvas(this._canvas.style.display == "none")
    },
    showCanvas: function() {
        this._toggleCanvas(true)
    },
    hideCanvas: function() {
        this._toggleCanvas(false)
    },
    _toggleCanvas: function(a) {
        var b, c;
        for (c = 0; c < this._canvas_labels.length; c++) {
            this._canvas_labels[c].style.display = (a ? "": "none")
        }
        if (this._obj._htmlmap) {
            b = this._getMapAreas();
            for (c = 0; c < b.length; c++) {
                if (a) {
                    b[c].removeAttribute("disabled")
                } else {
                    b[c].setAttribute("disabled", "true")
                }
            }
        }
        this._canvas.style.display = (a ? "": "none")
    },
    _getMapAreas: function() {
        var c = [],
        a,
        b;
        a = this._obj._htmlmap.getElementsByTagName("AREA");
        for (b = 0; b < a.length; b++) {
            if (a[b].getAttribute("userdata") == this._canvas_name) {
                c.push(a[b])
            }
        }
        return c
    }
};
dhtmlXChart = function(a) {
    this.name = "Chart";
    if (dhtmlx.assert_enabled()) {
        this._assert()
    }
    dhtmlx.extend(this, dhtmlx.Settings);
    this._parseContainer(a, "dhx_chart");
    dhtmlx.extend(this, dhtmlx.AtomDataLoader);
    dhtmlx.extend(this, dhtmlx.DataLoader);
    this.data.provideApi(this, true);
    dhtmlx.extend(this, dhtmlx.EventSystem);
    dhtmlx.extend(this, dhtmlx.MouseEvents);
    dhtmlx.destructors.push(this);
    dhtmlx.extend(this, dhtmlx.Group);
    dhtmlx.extend(this, dhtmlx.AutoTooltip);
    for (var b in dhtmlx.chart) {
        dhtmlx.extend(this, dhtmlx.chart[b])
    }
    if (a.preset) {
        this.definePreset(a)
    }
    this._parseSettings(a, this.defaults);
    this._series = [this._settings];
    this.data.attachEvent("onStoreUpdated", dhtmlx.bind(function() {
        this.render()
    },
    this));
    this.attachEvent("onLocateData", this._switchSerie)
};
dhtmlXChart.prototype = {
    _id: "dhx_area_id",
    on_click: {
        dhx_chart_legend_item: function(g, h, f) {
            var d = f.getAttribute("series_id");
            if (this.callEvent("onLegendClick", [g, d, f])) {
                var c = this._settings;
                var b = c.legend.values;
                var a = (b && (typeof b[d].toggle != "undefined")) ? b[d].toggle: c.legend.toggle;
                if ((typeof d != "undefined") && this._series.length > 1) {
                    if (a) {
                        if (f.className.indexOf("hidden") != -1) {
                            this.showSeries(d)
                        } else {
                            this.hideSeries(d)
                        }
                    }
                }
            }
        }
    },
    on_dblclick: {},
    on_mouse_move: {},
    destructor: function() {
        dhtmlx.Destruction.destructor.apply(this, arguments);
        if (this.canvases) {
            for (var a in this.canvases) {
                this.canvases[a]._obj = null;
                this.canvases[a] = null
            }
            this.canvases = null
        }
        if (this.legendObj) {
            this.legendObj.innerHTML = "";
            this.legendObj = null
        }
        if (this.config.tooltip) {
            this.config.tooltip._obj = null;
            this.config.tooltip._dataobj = null
        }
    },
    bind: function() {
        dhtmlx.BaseBind.legacyBind.apply(this, arguments)
    },
    sync: function() {
        dhtmlx.BaseBind.legacySync.apply(this, arguments)
    },
    resize: function() {
        for (var a in this.canvases) {
            this.canvases[a]._resizeCanvas()
        }
        this.render()
    },
    view_setter: function(a) {
        if (!dhtmlx.chart[a]) {
            dhtmlx.error("Chart type extension is not loaded: " + a)
        }
        if (typeof this._settings.offset == "undefined") {
            this._settings.offset = !(a == "area" || a == "stackedArea")
        }
        if (a == "radar" && !this._settings.yAxis) {
            this.define("yAxis", {})
        }
        if (a == "scatter") {
            if (!this._settings.yAxis) {
                this.define("yAxis", {})
            }
            if (!this._settings.xAxis) {
                this.define("xAxis", {})
            }
        }
        return a
    },
    clearCanvas: function() {
        if (this.canvases && typeof this.canvases == "object") {
            for (var a in this.canvases) {
                this.canvases[a].clearCanvas()
            }
        }
    },
    render: function() {
        var c, b, d, e, a;
        if (!this.callEvent("onBeforeRender", [this.data])) {
            return
        }
        if (this.canvases && typeof this.canvases == "object") {
            for (b in this.canvases) {
                this.canvases[b].clearCanvas()
            }
        } else {
            this.canvases = {}
        }
        if (this._settings.legend) {
            if (!this.canvases.legend) {
                this.canvases.legend = new dhtmlx.ui.Canvas(this._obj, "legend")
            }
            this._drawLegend(this.data.getRange(), this._obj.offsetWidth)
        }
        c = this._getChartBounds(this._obj.offsetWidth, this._obj.offsetHeight);
        this._map = e = new dhtmlx.ui.Map(this._id);
        a = this._settings;
        d = this._getChartData();
        for (b = 0; b < this._series.length; b++) {
            this._settings = this._series[b];
            if (!this.canvases[b]) {
                this.canvases[b] = new dhtmlx.ui.Canvas(this._obj, b, "z-index:" + (2 + b))
            }
            this["pvt_render_" + this._settings.view](this.canvases[b].getCanvas(), d, c.start, c.end, b, e)
        }
        e.render(this._obj);
        this._obj.lastChild.style.zIndex = 1000;
        this._applyBounds(this._obj.lastChild, c);
        this.callEvent("onAfterRender", []);
        this._settings = a
    },
    _applyBounds: function(c, b) {
        var a = {};
        a.left = b.start.x;
        a.top = b.start.y;
        a.width = b.end.x - b.start.x;
        a.height = b.end.y - b.start.y;
        for (var d in a) {
            c.style[d] = a[d] + "px"
        }
    },
    _getChartData: function() {
        var d, g, c, e, f, k, a, h, j, b;
        e = this.data.getRange();
        d = (this._settings.view.toLowerCase().indexOf("barh") != -1 ? "yAxis": "xAxis");
        g = this._settings[d];
        if (g && g.units && (typeof g.units == "object")) {
            c = g.units;
            h = [];
            if (typeof c.start != "undefined" && typeof c.end != "undefined" && typeof c.next != "undefined") {
                a = c.start;
                while (a <= c.end) {
                    h.push(a);
                    a = c.next.call(this, a)
                }
            } else {
                if (Object.prototype.toString.call(c) === "[object Array]") {
                    h = c
                }
            }
            k = [];
            if (h.length) {
                j = g.value;
                b = {};
                for (f = 0; f < e.length; f++) {
                    b[j(e[f])] = f
                }
                for (f = 0; f < h.length; f++) {
                    if (typeof b[h[f]] != "undefined") {
                        e[b[h[f]]].$unit = h[f];
                        k.push(e[b[h[f]]])
                    } else {
                        k.push({
                            $unit: h[f]
                        })
                    }
                }
            }
            return k
        }
        return e
    },
    value_setter: dhtmlx.Template.obj_setter,
    xValue_setter: dhtmlx.Template.obj_setter,
    yValue_setter: function(a) {
        this.define("value", a)
    },
    alpha_setter: dhtmlx.Template.obj_setter,
    label_setter: dhtmlx.Template.obj_setter,
    lineColor_setter: dhtmlx.Template.obj_setter,
    borderColor_setter: dhtmlx.Template.obj_setter,
    pieInnerText_setter: dhtmlx.Template.obj_setter,
    gradient_setter: function(a) {
        if ((typeof(a) != "function") && a && (a === true)) {
            a = "light"
        }
        return a
    },
    colormap: {
        RAINBOW: function(a) {
            var b = Math.floor(this.indexById(a.id) / this.dataCount() * 1536);
            if (b == 1536) {
                b -= 1
            }
            return this._rainbow[Math.floor(b / 256)](b % 256)
        }
    },
    color_setter: function(a) {
        return this.colormap[a] || dhtmlx.Template.obj_setter(a)
    },
    fill_setter: function(a) {
        return ((!a || a == 0) ? false: dhtmlx.Template.obj_setter(a))
    },
    definePreset: function(a) {
        this.define("preset", a.preset);
        delete a.preset
    },
    preset_setter: function(f) {
        var d, c, e;
        this.defaults = dhtmlx.extend({},
        this.defaults);
        if (typeof dhtmlx.presets.chart[f] == "object") {
            e = dhtmlx.presets.chart[f];
            for (d in e) {
                if (typeof e[d] == "object") {
                    if (!this.defaults[d] || typeof this.defaults[d] != "object") {
                        this.defaults[d] = dhtmlx.extend({},
                        e[d])
                    } else {
                        this.defaults[d] = dhtmlx.extend({},
                        this.defaults[d]);
                        for (c in e[d]) {
                            this.defaults[d][c] = e[d][c]
                        }
                    }
                } else {
                    this.defaults[d] = e[d]
                }
            }
            return f
        }
        return false
    },
    legend_setter: function(a) {
        if (!a) {
            if (this.legendObj) {
                this.legendObj.innerHTML = "";
                this.legendObj = null
            }
            return false
        }
        if (typeof(a) != "object") {
            a = {
                template: a
            }
        }
        this._mergeSettings(a, {
            width: 150,
            height: 18,
            layout: "y",
            align: "left",
            valign: "bottom",
            template: "",
            toggle: (this._settings.view.toLowerCase().indexOf("stacked") != -1 ? "": "hide"),
            marker: {
                type: "square",
                width: 15,
                height: 15,
                radius: 3
            },
            margin: 4,
            padding: 3
        });
        a.template = dhtmlx.Template.setter(a.template);
        return a
    },
    defaults: {
        color: "RAINBOW",
        alpha: "1",
        label: false,
        value: "{obj.value}",
        padding: {},
        view: "pie",
        lineColor: "#ffffff",
        cant: 0.5,
        width: 30,
        labelWidth: 100,
        line: {
            width: 2,
            color: "#1293f8"
        },
        seriesMargin: 1,
        seriesPadding: 4,
        item: {
            radius: 3,
            borderColor: "#636363",
            borderWidth: 1,
            color: "#ffffff",
            alpha: 1,
            type: "r",
            shadow: false
        },
        shadow: true,
        gradient: false,
        border: true,
        labelOffset: 20,
        origin: "auto"
    },
    item_setter: function(a) {
        if (typeof(a) != "object") {
            a = {
                color: a,
                borderColor: a
            }
        }
        this._mergeSettings(a, dhtmlx.extend({},
        this.defaults.item));
        var c = ["alpha", "borderColor", "color", "radius"];
        for (var b = 0; b < c.length; b++) {
            a[c[b]] = dhtmlx.Template.setter(a[c[b]])
        }
        return a
    },
    line_setter: function(a) {
        if (typeof(a) != "object") {
            a = {
                color: a
            }
        }
        dhtmlx.extend(this.defaults.line, a);
        a = dhtmlx.extend({},
        this.defaults.line);
        a.color = dhtmlx.Template.setter(a.color);
        return a
    },
    padding_setter: function(a) {
        if (typeof(a) != "object") {
            a = {
                left: a,
                right: a,
                top: a,
                bottom: a
            }
        }
        this._mergeSettings(a, {
            left: 50,
            right: 20,
            top: 35,
            bottom: 40
        });
        return a
    },
    xAxis_setter: function(a) {
        if (!a) {
            return false
        }
        if (typeof(a) != "object") {
            a = {
                template: a
            }
        }
        if (!a.value) {
            a.value = a.template
        }
        this._mergeSettings(a, {
            title: "",
            color: "#000000",
            lineColor: "#cfcfcf",
            template: "{obj}",
            value: "{obj}",
            lines: true
        });
        var b = ["lineColor", "template", "lines", "value"];
        this._converToTemplate(b, a);
        this._configXAxis = dhtmlx.extend({},
        a);
        return a
    },
    yAxis_setter: function(a) {
        if (!a) {
            return false
        }
        this._mergeSettings(a, {
            title: "",
            color: "#000000",
            lineColor: "#cfcfcf",
            template: "{obj}",
            lines: true,
            bg: "#ffffff"
        });
        var b = ["lineColor", "template", "lines", "bg"];
        this._converToTemplate(b, a);
        this._configYAxis = dhtmlx.extend({},
        a);
        return a
    },
    _converToTemplate: function(a, b) {
        for (var c = 0; c < a.length; c++) {
            b[a[c]] = dhtmlx.Template.setter(b[a[c]])
        }
    },
    _drawScales: function(e, d, c, g, a, b) {
        var f = 0;
        if (this._settings.yAxis) {
            if (!this.canvases.y) {
                this.canvases.y = new dhtmlx.ui.Canvas(this._obj, "axis_y")
            }
            f = this._drawYAxis(this.canvases.y.getCanvas(), e, d, c, g, a)
        }
        if (this._settings.xAxis) {
            if (!this.canvases.x) {
                this.canvases.x = new dhtmlx.ui.Canvas(this._obj, "axis_x")
            }
            this._drawXAxis(this.canvases.x.getCanvas(), e, d, c, b, f)
        }
        return f
    },
    _drawXAxis: function(o, f, m, l, d, k) {
        var c = m.x - 0.5;
        var n = parseInt((k ? k: l.y), 10) + 0.5;
        var b = l.x;
        var g;
        var a = true;
        var h = (this._settings.origin === 0 && this._settings.view == "stackedBar") ? l.y + 0.5 : n;
        for (var e = 0; e < f.length; e++) {
            if (this._settings.offset === true) {
                g = c + d / 2 + e * d
            } else {
                g = (e == f.length - 1) ? l.x: c + e * d;
                a = !!e
            }
            g = Math.ceil(g) - 0.5;
            var j = ((this._settings.origin != "auto") && (this._settings.view == "bar") && (parseFloat(this._settings.value(f[e])) < this._settings.origin));
            this._drawXAxisLabel(g, h, f[e], a, j);
            if ((this._settings.offset || e) && this._settings.xAxis.lines.call(this, f[e])) {
                this._drawXAxisLine(o, g, l.y, m.y, f[e])
            }
        }
        this.canvases.x.renderTextAt(true, false, c, l.y + this._settings.padding.bottom - 3, this._settings.xAxis.title, "dhx_axis_title_x", l.x - m.x);
        this._drawLine(o, c, n, b, n, this._settings.xAxis.color, 1);
        if (!this._settings.xAxis.lines.call(this, {}) || !this._settings.offset) {
            return
        }
        this._drawLine(o, b + 0.5, l.y, b + 0.5, m.y + 0.5, this._settings.xAxis.color, 0.2)
    },
    _drawYAxis: function(q, v, f, e, h, g) {
        var j;
        var n = {};
        if (!this._settings.yAxis) {
            return
        }
        var s = f.x - 0.5;
        var d = e.y;
        var b = f.y;
        var o = e.y;
        if (this._settings.yAxis.step) {
            j = parseFloat(this._settings.yAxis.step)
        }
        if (typeof this._configYAxis.step == "undefined" || typeof this._configYAxis.start == "undefined" || typeof this._configYAxis.end == "undefined") {
            n = this._calculateScale(h, g);
            h = n.start;
            g = n.end;
            j = n.step;
            this._settings.yAxis.end = g;
            this._settings.yAxis.start = h
        }
        this._setYAxisTitle(f, e);
        if (j === 0) {
            g = h;
            j = 1
        }
        var a = (g == h ? d - b: (d - b) * j / (g - h));
        var t = 0;
        for (var r = h; r <= g; r += j) {
            if (n.fixNum) {
                r = parseFloat((new Number(r)).toFixed(n.fixNum))
            }
            var u = Math.floor(d - t * a) + 0.5;
            if (! (r == h && this._settings.origin == "auto") && this._settings.yAxis.lines.call(this, r)) {
                this._drawLine(q, s, u, e.x, u, this._settings.yAxis.lineColor.call(this, r), 1)
            }
            if (r == this._settings.origin) {
                o = u
            }
            var k = r;
            if (j < 1) {
                var l = Math.min(this._log10(j), (h <= 0 ? 0 : this._log10(h)));
                var m = Math.pow(10, -l);
                k = Math.round(r * m) / m;
                r = k
            }
            this.canvases.y.renderText(0, u - 5, this._settings.yAxis.template(k.toString()), "dhx_axis_item_y", f.x - 5);
            t++
        }
        this._drawLine(q, s, d + 1, s, b, this._settings.yAxis.color, 1);
        return o
    },
    _setYAxisTitle: function(c, b) {
        var a = "dhx_axis_title_y" + (dhtmlx._isIE && dhtmlx._isIE != 9 ? " dhx_ie_filter": "");
        var d = this.canvases.y.renderTextAt("middle", false, 0, parseInt((b.y - c.y) / 2 + c.y, 10), this._settings.yAxis.title, a);
        if (d) {
            d.style.left = (dhtmlx.env.transform ? (d.offsetHeight - d.offsetWidth) / 2 : 0) + "px"
        }
    },
    _calculateScale: function(k, b) {
        if (this._settings.origin != "auto" && this._settings.origin < k) {
            k = this._settings.origin
        }
        var e, d, g;
        e = ((b - k) / 8) || 1;
        var c = Math.floor(this._log10(e));
        var a = Math.pow(10, c);
        var f = e / a;
        f = (f > 5 ? 10 : 5);
        e = parseInt(f, 10) * a;
        if (e > Math.abs(k)) {
            d = (k < 0 ? -e: 0)
        } else {
            var l = Math.abs(k);
            var j = Math.floor(this._log10(l));
            var h = l / Math.pow(10, j);
            d = Math.ceil(h * 10) / 10 * Math.pow(10, j) - e;
            if (l > 1 && e > 0.1) {
                d = Math.ceil(d)
            }
            while (k < 0 ? d <= k: d >= k) {
                d -= e
            }
            if (k < 0) {
                d = -d - 2 * e
            }
        }
        g = d;
        while (g < b) {
            g += e;
            g = parseFloat((new Number(g)).toFixed(Math.abs(c)))
        }
        return {
            start: d,
            end: g,
            step: e,
            fixNum: Math.abs(c)
        }
    },
    _getLimits: function(b, g) {
        var h, f;
        var e = ((arguments.length && b == "h") ? this._configXAxis: this._configYAxis);
        g = g || "value";
        if (e && (typeof e.end != "undefined") && (typeof e.start != "undefined") && e.step) {
            h = parseFloat(e.end);
            f = parseFloat(e.start)
        } else {
            h = this.max(this._series[0][g]);
            f = (e && (typeof e.start != "undefined")) ? parseFloat(e.start) : this.min(this._series[0][g]);
            if (this._series.length > 1) {
                for (var d = 1; d < this._series.length; d++) {
                    var a = this.max(this._series[d][g]);
                    var c = this.min(this._series[d][g]);
                    if (a > h) {
                        h = a
                    }
                    if (c < f) {
                        f = c
                    }
                }
            }
        }
        return {
            max: h,
            min: f
        }
    },
    _log10: function(b) {
        var a = "log";
        return Math.floor((Math[a](b) / Math.LN10))
    },
    _drawXAxisLabel: function(b, f, e, a, d) {
        if (!this._settings.xAxis) {
            return
        }
        var c = this.canvases.x.renderTextAt(d, a, b, f - (d ? 2 : 0), this._settings.xAxis.template(e));
        if (c) {
            c.className += " dhx_axis_item_x"
        }
    },
    _drawXAxisLine: function(b, a, d, c, e) {
        if (!this._settings.xAxis || !this._settings.xAxis.lines) {
            return
        }
        this._drawLine(b, a, d, a, c, this._settings.xAxis.lineColor.call(this, e), 1)
    },
    _drawLine: function(a, d, g, c, e, b, f) {
        a.strokeStyle = b;
        a.lineWidth = f;
        a.beginPath();
        a.moveTo(d, g);
        a.lineTo(c, e);
        a.stroke();
        a.lineWidth = 1
    },
    _getRelativeValue: function(d, e) {
        var c, a;
        var b = 1;
        if (e != d) {
            c = e - d
        } else {
            c = d
        }
        return [c, b]
    },
    _rainbow: [function(a) {
        return "#FF" + dhtmlx.math.toHex(a / 2, 2) + "00"
    },
    function(a) {
        return "#FF" + dhtmlx.math.toHex(a / 2 + 128, 2) + "00"
    },
    function(a) {
        return "#" + dhtmlx.math.toHex(255 - a, 2) + "FF00"
    },
    function(a) {
        return "#00FF" + dhtmlx.math.toHex(a, 2)
    },
    function(a) {
        return "#00" + dhtmlx.math.toHex(255 - a, 2) + "FF"
    },
    function(a) {
        return "#" + dhtmlx.math.toHex(a, 2) + "00FF"
    }],
    addSeries: function(b) {
        var a = this._settings;
        this._settings = dhtmlx.extend({},
        a);
        this._parseSettings(b, {});
        this._series.push(this._settings);
        this._settings = a
    },
    _switchSerie: function(f, a, d) {
        var c;
        this._active_serie = (this._series.length == 1 ? a.getAttribute("userdata") : this._getActiveSeries(d));
        if (!this._series[this._active_serie]) {
            return
        }
        for (var b = 0; b < this._series.length; b++) {
            c = this._series[b].tooltip;
            if (c) {
                c.disable()
            }
        }
        if (!a.getAttribute("disabled")) {
            c = this._series[this._active_serie].tooltip;
            if (c) {
                c.enable()
            }
        }
    },
    _getActiveSeries: function(f) {
        var j, b, d, c, h, l, k, g;
        b = this._map._areas;
        c = dhtmlx.html.offset(this._obj._htmlmap);
        h = dhtmlx.html.pos(f);
        k = h.x - c.x;
        g = h.y - c.y;
        for (d = 0; d < b.length; d++) {
            j = b[d].points;
            if (k <= j[2] && k >= j[0] && g <= j[3] && g >= j[1]) {
                if (l) {
                    if (b[d].index > l.index) {
                        l = b[d]
                    }
                } else {
                    l = b[d]
                }
            }
        }
        return l ? l.index: 0
    },
    hideSeries: function(a) {
        this.canvases[a].hideCanvas();
        if (this._settings.legend.values && this._settings.legend.values[a]) {
            this._settings.legend.values[a].$hidden = true
        }
        this._drawLegend()
    },
    showSeries: function(a) {
        this.canvases[a].showCanvas();
        if (this._settings.legend.values && this._settings.legend.values[a]) {
            delete this._settings.legend.values[a].$hidden
        }
        this._drawLegend()
    },
    _changeColorSV: function(b, e, a) {
        var d, c;
        c = dhtmlx.math.toRgb(b);
        d = dhtmlx.math.rgbToHsv(c[0], c[1], c[2]);
        d[1] *= e;
        d[2] *= a;
        return "rgb(" + dhtmlx.math.hsvToRgb(d[0], d[1], d[2]) + ")"
    },
    _setBorderStyles: function(a, b) {
        var d, c;
        c = dhtmlx.math.toRgb(b);
        d = dhtmlx.math.rgbToHsv(c[0], c[1], c[2]);
        d[2] /= 2;
        b = "rgb(" + dhtmlx.math.hsvToRgb(d[0], d[1], d[2]) + ")";
        a.strokeStyle = b;
        if (a.globalAlpha == 1) {
            a.globalAlpha = 0.9
        }
    },
    _drawLegend: function(e, b) {
        var f, l, r, m, g, n, a, j = 0,
        h = 0,
        q, k, d, o;
        e = e || [];
        b = b || this._obj.offsetWidth;
        q = this.canvases.legend.getCanvas();
        l = this._settings.legend;
        a = (this._settings.legend.layout != "x" ? "width:" + l.width + "px": "");
        if (this.legendObj) {
            this.legendObj.innerHTML = "";
            this.legendObj.parentNode.removeChild(this.legendObj)
        }
        this.canvases.legend.clearCanvas(true);
        r = dhtmlx.html.create("DIV", {
            "class": "dhx_chart_legend",
            style: "left:" + j + "px; top:" + h + "px;" + a
        },
        "");
        if (l.padding) {
            r.style.padding = l.padding + "px"
        }
        this.legendObj = r;
        this._obj.appendChild(r);
        g = [];
        if (!l.values) {
            for (f = 0; f < e.length; f++) {
                g.push(this._drawLegendText(r, l.template(e[f])))
            }
        } else {
            for (f = 0; f < l.values.length; f++) {
                g.push(this._drawLegendText(r, l.values[f].text, (typeof l.values[f].id != "undefined" ? typeof l.values[f].id: f), l.values[f].$hidden))
            }
        }
        n = r.offsetWidth;
        m = r.offsetHeight;
        if (n < this._obj.offsetWidth) {
            if (l.layout == "x" && l.align == "center") {
                j = (this._obj.offsetWidth - n) / 2
            }
            if (l.align == "right") {
                j = this._obj.offsetWidth - n
            }
            if (l.margin && l.align != "center") {
                j += (l.align == "left" ? 1 : -1) * l.margin
            }
        }
        if (m < this._obj.offsetHeight) {
            if (l.valign == "middle" && l.align != "center" && l.layout != "x") {
                h = (this._obj.offsetHeight - m) / 2
            } else {
                if (l.valign == "bottom") {
                    h = this._obj.offsetHeight - m
                }
            }
            if (l.margin && l.valign != "middle") {
                h += (l.valign == "top" ? 1 : -1) * l.margin
            }
        }
        r.style.left = j + "px";
        r.style.top = h + "px";
        q.save();
        for (f = 0; f < g.length; f++) {
            o = g[f];
            if (l.values && l.values[f].$hidden) {
                d = true;
                k = (l.values[f].disableColor ? l.values[f].disableColor: "#d9d9d9")
            } else {
                d = false;
                k = (l.values ? l.values[f].color: this._settings.color.call(this, e[f]))
            }
            var c = (l.marker.position == "right" ? o.offsetWidth - l.marker.width: 0);
            this._drawLegendMarker(q, o.offsetLeft + j + c, o.offsetTop + h, k, o.offsetHeight, d, f)
        }
        q.restore();
        g = null
    },
    _drawLegendText: function(a, f, b, e) {
        var d = "";
        var c = this._settings.legend;
        if (c.layout == "x") {
            d = "float:left;"
        }
        var h = c.marker.position;
        var g = dhtmlx.html.create("DIV", {
            style: d + "padding-" + (h && h == "right" ? "right": "left") + ":" + (10 + c.marker.width) + "px",
            "class": "dhx_chart_legend_item" + (e ? " hidden": "")
        },
        f);
        if (arguments.length > 2) {
            g.setAttribute("series_id", b)
        }
        a.appendChild(g);
        return g
    },
    _drawLegendMarker: function(r, m, l, e, q, f, h) {
        var b = [];
        var g = this._settings.legend.marker;
        var o = this._settings.legend.values;
        var k = (o && o[h].markerType ? o[h].markerType: g.type);
        if (e) {
            r.fillStyle = e;
            r.strokeStyle = this._getDarkenColor(e, 0.75)
        }
        r.beginPath();
        if (k == "round" || !g.radius) {
            r.lineWidth = g.height;
            r.lineCap = k;
            m += r.lineWidth / 2 + 5;
            l += q / 2;
            r.moveTo(m, l);
            var a = m + g.width - g.height + 1;
            r.lineTo(a, l)
        } else {
            if (k == "item") {
                if (this._settings.line && this._settings.view != "scatter" && !this._settings.disableLines) {
                    r.beginPath();
                    r.lineWidth = this._series[h].line.width;
                    r.strokeStyle = f ? e: this._series[h].line.color.call(this, {});
                    var c = m + 5;
                    var n = l + q / 2;
                    r.moveTo(c, n);
                    var a = c + g.width;
                    r.lineTo(a, n);
                    r.stroke()
                }
                var d = this._series[h].item;
                var j = parseInt(d.radius.call(this, {}), 10) || 0;
                if (j) {
                    if (d.type == "image" && d.src) {
                        this._drawImage(r, m + 5, l + g.height / 2 - 5, d.src, j * 2, j * 2);
                        return
                    } else {
                        r.beginPath();
                        if (f) {
                            r.lineWidth = d.borderWidth;
                            r.strokeStyle = e;
                            r.fillStyle = e
                        } else {
                            r.lineWidth = d.borderWidth;
                            r.fillStyle = d.color.call(this, {});
                            r.strokeStyle = d.borderColor.call(this, {});
                            r.globalAlpha = d.alpha.call(this, {})
                        }
                        r.beginPath();
                        m += g.width / 2 + 5;
                        l += q / 2;
                        this._strokeChartItem(r, m, l, j + 1, d.type);
                        r.fill();
                        r.stroke()
                    }
                }
                r.globalAlpha = 1
            } else {
                r.lineWidth = 1;
                m += 5;
                l += parseInt(q / 2 - g.height / 2, 10);
                b = [[m + g.radius, l + g.radius, g.radius, Math.PI, 3 * Math.PI / 2, false], [m + g.width - g.radius, l], [m + g.width - g.radius, l + g.radius, g.radius, -Math.PI / 2, 0, false], [m + g.width, l + g.height - g.radius], [m + g.width - g.radius, l + g.height - g.radius, g.radius, 0, Math.PI / 2, false], [m + g.radius, l + g.height], [m + g.radius, l + g.height - g.radius, g.radius, Math.PI / 2, Math.PI, false], [m, l + g.radius]];
                this._path(r, b)
            }
        }
        r.stroke();
        r.fill()
    },
    _getDarkenColor: function(a, d) {
        var c, b;
        b = dhtmlx.math.toRgb(a);
        c = dhtmlx.math.rgbToHsv(b[0], b[1], b[2]);
        c[2] = c[2] * d;
        return "rgb(" + dhtmlx.math.hsvToRgb(c[0], c[1], c[2]) + ")"
    },
    _getChartBounds: function(a, g) {
        var j, c, h, b;
        j = this._settings.padding.left;
        c = this._settings.padding.top;
        h = a - this._settings.padding.right;
        b = g - this._settings.padding.bottom;
        if (this._settings.legend) {
            var e = this._settings.legend;
            var f = this._settings.legend.width;
            var d = this._settings.legend.height;
            if (e.layout == "x") {
                if (e.valign == "center") {
                    if (e.align == "right") {
                        h -= f
                    } else {
                        if (e.align == "left") {
                            j += f
                        }
                    }
                } else {
                    if (e.valign == "bottom") {
                        b -= d
                    } else {
                        c += d
                    }
                }
            } else {
                if (e.align == "right") {
                    h -= f
                } else {
                    if (e.align == "left") {
                        j += f
                    }
                }
            }
        }
        return {
            start: {
                x: j,
                y: c
            },
            end: {
                x: h,
                y: b
            }
        }
    },
    _getStackedLimits: function(e) {
        var b, a, f, d, c;
        if (this._settings.yAxis && (typeof this._settings.yAxis.end != "undefined") && (typeof this._settings.yAxis.start != "undefined") && this._settings.yAxis.step) {
            f = parseFloat(this._settings.yAxis.end);
            d = parseFloat(this._settings.yAxis.start)
        } else {
            for (b = 0; b < e.length; b++) {
                e[b].$sum = 0;
                e[b].$min = Infinity;
                for (a = 0; a < this._series.length; a++) {
                    c = parseFloat(this._series[a].value(e[b]) || 0);
                    if (isNaN(c)) {
                        continue
                    }
                    if (this._series[a].view.toLowerCase().indexOf("stacked") != -1) {
                        e[b].$sum += c
                    }
                    if (c < e[b].$min) {
                        e[b].$min = c
                    }
                }
            }
            f = -Infinity;
            d = Infinity;
            for (b = 0; b < e.length; b++) {
                if (e[b].$sum > f) {
                    f = e[b].$sum
                }
                if (e[b].$min < d) {
                    d = e[b].$min
                }
            }
            if (d > 0) {
                d = 0
            }
        }
        return {
            max: f,
            min: d
        }
    },
    _setBarGradient: function(o, b, l, a, j, h, d, c) {
        var k, e, g, f, n, m;
        if (h == "light") {
            if (c == "x") {
                k = o.createLinearGradient(b, l, a, l)
            } else {
                k = o.createLinearGradient(b, l, b, j)
            }
            m = [[0, "#FFFFFF"], [0.9, d], [1, d]];
            e = 2
        } else {
            if (h == "falling" || h == "rising") {
                if (c == "x") {
                    k = o.createLinearGradient(b, l, a, l)
                } else {
                    k = o.createLinearGradient(b, l, b, j)
                }
                g = dhtmlx.math.toRgb(d);
                f = dhtmlx.math.rgbToHsv(g[0], g[1], g[2]);
                f[1] *= 1 / 2;
                n = "rgb(" + dhtmlx.math.hsvToRgb(f[0], f[1], f[2]) + ")";
                if (h == "falling") {
                    m = [[0, n], [0.7, d], [1, d]]
                } else {
                    if (h == "rising") {
                        m = [[0, d], [0.3, d], [1, n]]
                    }
                }
                e = 0
            } else {
                o.globalAlpha = 0.37;
                e = 0;
                if (c == "x") {
                    k = o.createLinearGradient(b, j, b, l)
                } else {
                    k = o.createLinearGradient(b, l, a, l)
                }
                m = [[0, "#9d9d9d"], [0.3, "#e8e8e8"], [0.45, "#ffffff"], [0.55, "#ffffff"], [0.7, "#e8e8e8"], [1, "#9d9d9d"]]
            }
        }
        this._gradient(k, m);
        return {
            gradient: k,
            offset: e
        }
    },
    _getPositionByAngle: function(c, b, e, d) {
        c *= ( - 1);
        b = b + Math.cos(c) * d;
        e = e - Math.sin(c) * d;
        return {
            x: b,
            y: e
        }
    },
    _gradient: function(c, b) {
        for (var a = 0; a < b.length; a++) {
            c.addColorStop(b[a][0], b[a][1])
        }
    },
    _path: function(a, c) {
        var b, d;
        for (b = 0; b < c.length; b++) {
            d = (b ? "lineTo": "moveTo");
            if (c[b].length > 2) {
                d = "arc"
            }
            a[d].apply(a, c[b])
        }
    },
    _circle: function(b, a, d, c) {
        b.arc(a, d, c, Math.PI * 2, true)
    },
    _addMapRect: function(d, e, a, c, b) {
        d.addRect(e, [a[0].x - c.x, a[0].y - c.y, a[1].x - c.x, a[1].y - c.y], b)
    }
};
dhtmlx.compat("layout");
if (typeof(window.dhtmlXCellObject) != "undefined") {
    dhtmlXCellObject.prototype.attachChart = function(a) {
        this.callEvent("_onBeforeContentAttach", ["chart"]);
        var b = document.createElement("DIV");
        b.id = "dhxChartObj_" + window.dhx4.newId();
        b.style.width = "100%";
        b.style.height = "100%";
        document.body.appendChild(b);
        this._attachObject(b);
        a.container = b.id;
        this.dataType = "chart";
        this.dataObj = new dhtmlXChart(a);
        if (!this.dataObj.setSizes) {
            this.dataObj.setSizes = function() {
                if (this.resize) {
                    this.resize()
                } else {
                    this.render()
                }
            }
        }
        return this.dataObj
    }
};