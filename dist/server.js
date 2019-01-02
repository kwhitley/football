(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.target = "server";
// allowSyntheticDefaultImports
FuseBox.sdep = true;
Object.assign(process.env, {"NODE_ENV":"production","foo":"bar"})
FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("server/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
// include other main deps
const express_1 = require("express");
const body_parser_1 = require("body-parser");
const cookie_parser_1 = require("cookie-parser");
const compression_1 = require("compression");
const path_1 = require("path");
const http_1 = require("http");
const serve_favicon_1 = require("serve-favicon");
const api_1 = require("./api");
const imager_api_1 = require("./imager-api");
// instantiate express
const app = express_1.default();
const isProduction = process.env.NODE_ENV === 'production';
app.use(cookie_parser_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(compression_1.default());
// static serving from /dist/client
const staticPath = path_1.default.join(__dirname, `../${isProduction ? 'dist' : '.dist-dev'}/client`);
console.log(`serving static content from ${staticPath}`);
app.use(express_1.default.static(staticPath));
app.use(serve_favicon_1.default(path_1.default.join(__dirname, '../src/client/images', 'favicon.ico')));
// add api layers
app.use('/api', api_1.default);
app.use('/i', imager_api_1.default);
const serverPort = process.env.PORT || 3000;
const server = http_1.default.createServer(app);
server.listen(serverPort);
console.log(`Express server @ http://localhost:${serverPort} (${isProduction ? 'production' : 'development'})\n`);
//# sourceMappingURL=index.js.map
});
___scope___.file("server/api.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const globby_1 = require("globby");
const dropbox_1 = require("./dropbox");
const apicache_1 = require("apicache");
// create an express app
const app = express_1.default();
const cache = apicache_1.default.middleware;
// add a route
app.get('/tmp', async (req, res) => {
    const paths = await globby_1.default(['/Users/kevinwhitley/Documents/*.*']);
    res.json(paths);
});
app.get('/env', (req, res) => {
    res.json(process.env);
});
app.get('/list', cache('30 seconds'), (req, res) => {
    dropbox_1.list().then((response) => res.json(response));
});
// export the express app
exports.default = app;
//# sourceMappingURL=api.js.map
});
___scope___.file("server/dropbox.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dropbox_1 = require("dropbox");
const isomorphic_fetch_1 = require("isomorphic-fetch");
const { DROPBOX_ACCESS_TOKEN } = process.env;
exports.list = () => {
    console.log('attempting to use dropbox api');
    var dbx = new dropbox_1.Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN, fetch: isomorphic_fetch_1.default });
    return dbx
        .filesListFolder({
        recursive: true,
        path: '',
    })
        .catch(console.error);
};
exports.download = (path) => {
    console.log('attempting to use dropbox api', { path: `rev:${path}` });
    var dbx = new dropbox_1.Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN, fetch: isomorphic_fetch_1.default });
    return dbx.filesDownload({ path: `rev:${path}` })
        .then((response) => response.fileBinary)
        .catch(console.error);
};
//# sourceMappingURL=dropbox.js.map
});
___scope___.file("server/imager-api.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imager_1 = require("./imager");
const app = express_1.default();
// single route catches all requests to imager and passes them to worker
app.get('*.(png|jpg)', (req, res) => {
    imager_1.getImage(req.path)
        .then((image) => {
        res.type('image/jpeg');
        res.set('Cache-Control', "public, max-age=345600"); // 4 days
        res.set('Expires', new Date(Date.now() + 345600000).toUTCString());
        res.end(image);
    })
        .catch((err) => {
        console.error(err);
        res.status(500).send(err);
    });
});
exports.default = app;
//# sourceMappingURL=imager-api.js.map
});
___scope___.file("server/imager.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gm_1 = require("gm");
const fs_1 = require("fs");
const path_1 = require("path");
const dropbox_1 = require("./dropbox");
const isProduction = process.env.NODE_ENV === 'production';
exports.getImage = (requestedImagePath) => {
    return new Promise(async function (resolve, reject) {
        let decodedPath = decodeURI(requestedImagePath);
        let optionsSegment = decodedPath.replace(/^.*::(.*)\.\w{3,4}$/i, '$1') || '';
        let revisionId = decodedPath.replace(/.*?(\w+).*/g, '$1');
        let options = optionsSegment
            .split(',')
            .reduce((a, b) => {
            let [key, value] = b.split('=');
            if (value === undefined) {
                a[key] = true;
            }
            else {
                let numValue = Number(value);
                a[key] = isNaN(numValue) ? value : numValue;
            }
            return a;
        }, {});
        // begin: save final output and stream output to response
        let savefolder = path_1.default.join(__dirname, `../${isProduction ? 'dist' : '.dist-dev'}/client/i`);
        let savepath = savefolder + requestedImagePath;
        let originalpath = savefolder + '/' + revisionId + '.jpg';
        let saveoriginal = false;
        console.log('IMAGER', {
            decodedPath,
            optionsSegment,
            savepath,
            originalpath,
            options,
            revisionId,
        });
        if (options.width && options.height) {
            options.targetRatio = options.width / options.height;
            if (!options.background && !options.fit) {
                options.crop = true;
            }
        }
        // ensure folder exists before file stream opening
        await fs_1.default.promises.mkdir(savefolder, { recursive: true }).catch(e => e);
        let image = await fs_1.default.promises.readFile(originalpath).catch(console.error);
        if (!image) {
            image = await dropbox_1.download(revisionId);
            console.log('image file loaded from dropbox');
            console.log(`saving original to ${originalpath}...`);
            saveoriginal = true;
            // fs.promises.writeFile(originalpath, image)
            //   .then(() => console.log('original file saved to', originalpath))
            //   .catch(console.error)
        }
        else {
            console.log('image binary loaded from local content', image);
        }
        if (!image)
            return reject('Image not found in database');
        gm_1.default(image).autoOrient().toBuffer(function (err, buffer) {
            console.log('buffer', buffer);
            gm_1.default(buffer).size(async function (err, geometry) {
                err && console.log('geometry.error', err);
                let gmImage = gm_1.default(buffer);
                if (!geometry) {
                    console.error(`Image geometry not found for ${requestedImagePath}`);
                    return reject(`Image geometry not found for ${requestedImagePath}`);
                }
                if (saveoriginal) {
                    gmImage.write(originalpath, (err) => {
                        if (err) {
                            console.error('error saving original', err);
                        }
                        else {
                            console.log('original saved to', originalpath);
                        }
                    });
                }
                let { height, width } = geometry;
                if (err) {
                    return reject(err);
                }
                let actualRatio = width / height;
                gmImage.setFormat('jpg');
                // black and white filter
                if (options.mono) {
                    gmImage.type('GrayScale');
                }
                // negative filter
                if (options.negative) {
                    gmImage.negative();
                }
                if (options.crop) {
                    let rw, rh;
                    let center = options.center !== undefined ? parseFloat(options.center, 10) : 0.5;
                    let tx = 0;
                    let ty = 0;
                    if (actualRatio > options.targetRatio) {
                        // actual aspect is wider than target aspect
                        // scale to height, leaving excess in horizontal
                        gmImage.resize(null, options.height);
                        rw = options.height * actualRatio; // resizedWidth
                        tx = Math.max(0, Math.round(rw * center - options.width / 2)); // prevent clipping on left
                        tx = Math.min(tx, rw - options.width); // prevent clipping on right
                    }
                    else {
                        // console.log('scaling to width')
                        gmImage.resize(options.width, null);
                        rh = options.width / actualRatio; // resizedHeight
                        ty = Math.max(0, Math.round(rh * center - options.height / 2)); // prevent clipping on top
                        ty = Math.min(ty, rh - options.height); // prevent clipping on bottom
                    }
                    gmImage.crop(options.width, options.height, tx, ty); //, tx, ty)
                    options.sharpen = options.sharpen || 2;
                }
                else if (options) {
                    gmImage.resize(options.width, options.height);
                }
                // sharpen pass
                if (options.sharpen) {
                    var sharpenValue = parseInt(options.sharpen, 10);
                    gmImage.sharpen(sharpenValue, sharpenValue / 5);
                }
                // add black letterboxing for background requests
                if (options.background) {
                    gmImage
                        .gravity("Center")
                        .background("black")
                        .extent(options.width, options.height);
                    options.quality = options.quality || 98; // maximize quality for background renders
                }
                // quality filter (default = 80)
                options.quality = options.quality || 90;
                if (options.quality) {
                    gmImage.quality(options.quality);
                }
                console.log(`saving image fragment to ${savepath}...`);
                gmImage.write(savepath, (err) => {
                    if (err) {
                        console.error('error saving fragment', err);
                        reject(err);
                    }
                    else {
                        console.log('fragment saved to', savepath);
                        fs_1.default.promises.readFile(savepath)
                            .then(resolve)
                            .catch(reject);
                    }
                });
                // fs.promises.writeFile(savepath, image)
                //   .then(() => console.log('image fragment saved to', savepath))
                //   .catch(console.error)
                // return resolve(gmImage)
            });
        });
    });
};
//# sourceMappingURL=imager.js.map
});
return ___scope___.entry = "server/index.js";
});

FuseBox.import("default/server/index.js");
FuseBox.main("default/server/index.js");
})
((function(__root__){
if (__root__["FuseBox"]) return __root__["FuseBox"];
var $isServiceWorker = typeof ServiceWorkerGlobalScope !== "undefined";
var $isWebWorker = typeof WorkerGlobalScope !== "undefined";
var $isBrowser = (typeof window !== "undefined" && typeof window.navigator !== "undefined") || $isWebWorker || $isServiceWorker;
var g = $isBrowser ? ($isWebWorker || $isServiceWorker ? {} : window) : global;
if ($isBrowser) {
    g["global"] = $isWebWorker || $isServiceWorker ? {} : window;
}
__root__ = !$isBrowser || typeof __fbx__dnm__ !== "undefined" ? module.exports : __root__;
var $fsbx = $isBrowser
    ? $isWebWorker || $isServiceWorker
        ? {}
        : (window["__fsbx__"] = window["__fsbx__"] || {})
    : (g["$fsbx"] = g["$fsbx"] || {});
if (!$isBrowser) {
    g["require"] = require;
}
var $packages = ($fsbx.p = $fsbx.p || {});
var $events = ($fsbx.e = $fsbx.e || {});
function $getNodeModuleName(name) {
    var n = name.charCodeAt(0);
    var s = name.charCodeAt(1);
    if (!$isBrowser && s === 58) {
        return;
    }
    if ((n >= 97 && n <= 122) || n === 64) {
        if (n === 64) {
            var s_1 = name.split("/");
            var target = s_1.splice(2, s_1.length).join("/");
            return [s_1[0] + "/" + s_1[1], target || undefined];
        }
        var index = name.indexOf("/");
        if (index === -1) {
            return [name];
        }
        var first = name.substring(0, index);
        var second = name.substring(index + 1);
        return [first, second];
    }
}
function $getDir(filePath) {
    return filePath.substring(0, filePath.lastIndexOf("/")) || "./";
}
function $pathJoin() {
    var string = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        string[_i] = arguments[_i];
    }
    var parts = [];
    for (var i = 0, l = arguments.length; i < l; i++) {
        parts = parts.concat(arguments[i].split("/"));
    }
    var newParts = [];
    for (var i = 0, l = parts.length; i < l; i++) {
        var part = parts[i];
        if (!part || part === ".")
            continue;
        if (part === "..") {
            newParts.pop();
        }
        else {
            newParts.push(part);
        }
    }
    if (parts[0] === "")
        newParts.unshift("");
    return newParts.join("/") || (newParts.length ? "/" : ".");
}
function $ensureExtension(name) {
    var matched = name.match(/\.(\w{1,})$/);
    if (matched) {
        if (!matched[1]) {
            return name + ".js";
        }
        return name;
    }
    return name + ".js";
}
function $loadURL(url) {
    if ($isBrowser) {
        var d = document;
        var head = d.getElementsByTagName("head")[0];
        var target;
        if (/\.css$/.test(url)) {
            target = d.createElement("link");
            target.rel = "stylesheet";
            target.type = "text/css";
            target.href = url;
        }
        else {
            target = d.createElement("script");
            target.type = "text/javascript";
            target.src = url;
            target.async = true;
        }
        head.insertBefore(target, head.firstChild);
    }
}
function $loopObjKey(obj, func) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            func(key, obj[key]);
        }
    }
}
function $serverRequire(path) {
    return { server: require(path) };
}
function $getRef(name, o) {
    var basePath = o.path || "./";
    var pkgName = o.pkg || "default";
    var nodeModule = $getNodeModuleName(name);
    if (nodeModule) {
        basePath = "./";
        pkgName = nodeModule[0];
        if (o.v && o.v[pkgName]) {
            pkgName = pkgName + "@" + o.v[pkgName];
        }
        name = nodeModule[1];
    }
    if (name) {
        if (name.charCodeAt(0) === 126) {
            name = name.slice(2, name.length);
            basePath = "./";
        }
        else {
            if (!$isBrowser && (name.charCodeAt(0) === 47 || name.charCodeAt(1) === 58)) {
                return $serverRequire(name);
            }
        }
    }
    var pkg = $packages[pkgName];
    if (!pkg) {
        if ($isBrowser && FuseBox.target !== "electron") {
            throw "Package not found " + pkgName;
        }
        else {
            return $serverRequire(pkgName + (name ? "/" + name : ""));
        }
    }
    name = name ? name : "./" + pkg.s.entry;
    var filePath = $pathJoin(basePath, name);
    var validPath = $ensureExtension(filePath);
    var file = pkg.f[validPath];
    var wildcard;
    if (!file && validPath.indexOf("*") > -1) {
        wildcard = validPath;
    }
    if (!file && !wildcard) {
        validPath = $pathJoin(filePath, "/", "index.js");
        file = pkg.f[validPath];
        if (!file && filePath === ".") {
            validPath = (pkg.s && pkg.s.entry) || "index.js";
            file = pkg.f[validPath];
        }
        if (!file) {
            validPath = filePath + ".js";
            file = pkg.f[validPath];
        }
        if (!file) {
            file = pkg.f[filePath + ".jsx"];
        }
        if (!file) {
            validPath = filePath + "/index.jsx";
            file = pkg.f[validPath];
        }
    }
    return {
        file: file,
        wildcard: wildcard,
        pkgName: pkgName,
        versions: pkg.v,
        filePath: filePath,
        validPath: validPath,
    };
}
function $async(file, cb, o) {
    if (o === void 0) { o = {}; }
    if ($isBrowser) {
        if (o && o.ajaxed === file) {
            return console.error(file, "does not provide a module");
        }
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var contentType = xmlhttp.getResponseHeader("Content-Type");
                    var content = xmlhttp.responseText;
                    if (/json/.test(contentType)) {
                        content = "module.exports = " + content;
                    }
                    else {
                        if (!/javascript/.test(contentType)) {
                            content = "module.exports = " + JSON.stringify(content);
                        }
                    }
                    var normalized = $pathJoin("./", file);
                    FuseBox.dynamic(normalized, content);
                    cb(FuseBox.import(file, { ajaxed: file }));
                }
                else {
                    console.error(file, "not found on request");
                    cb(undefined);
                }
            }
        };
        xmlhttp.open("GET", file, true);
        xmlhttp.send();
    }
    else {
        if (/\.(js|json)$/.test(file))
            return cb(g["require"](file));
        return cb("");
    }
}
function $trigger(name, args) {
    var e = $events[name];
    if (e) {
        for (var i in e) {
            var res = e[i].apply(null, args);
            if (res === false) {
                return false;
            }
        }
    }
}
function syntheticDefaultExportPolyfill(input) {
    if (input === null ||
        ["function", "object", "array"].indexOf(typeof input) === -1 ||
        input.hasOwnProperty("default")) {
        return;
    }
    if (Object.isFrozen(input)) {
        input.default = input;
        return;
    }
    Object.defineProperty(input, "default", {
        value: input,
        writable: true,
        enumerable: false,
    });
}
function $import(name, o) {
    if (o === void 0) { o = {}; }
    if (name.charCodeAt(4) === 58 || name.charCodeAt(5) === 58) {
        return $loadURL(name);
    }
    var ref = $getRef(name, o);
    if (ref.server) {
        return ref.server;
    }
    var file = ref.file;
    if (ref.wildcard) {
        var safeRegEx = new RegExp(ref.wildcard
            .replace(/\*/g, "@")
            .replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
            .replace(/@@/g, ".*")
            .replace(/@/g, "[a-z0-9$_-]+"), "i");
        var pkg_1 = $packages[ref.pkgName];
        if (pkg_1) {
            var batch = {};
            for (var n in pkg_1.f) {
                if (safeRegEx.test(n)) {
                    batch[n] = $import(ref.pkgName + "/" + n);
                }
            }
            return batch;
        }
    }
    if (!file) {
        var asyncMode_1 = typeof o === "function";
        var processStopped = $trigger("async", [name, o]);
        if (processStopped === false) {
            return;
        }
        return $async(name, function (result) { return (asyncMode_1 ? o(result) : null); }, o);
    }
    var pkg = ref.pkgName;
    if (file.locals && file.locals.module)
        return file.locals.module.exports;
    var locals = (file.locals = {});
    var path = $getDir(ref.validPath);
    locals.exports = {};
    locals.module = { exports: locals.exports };
    locals.require = function (name, optionalCallback) {
        var result = $import(name, {
            pkg: pkg,
            path: path,
            v: ref.versions,
        });
        if (FuseBox["sdep"]) {
            syntheticDefaultExportPolyfill(result);
        }
        return result;
    };
    if ($isBrowser || !g["require"].main) {
        locals.require.main = { filename: "./", paths: [] };
    }
    else {
        locals.require.main = g["require"].main;
    }
    var args = [locals.module.exports, locals.require, locals.module, ref.validPath, path, pkg];
    $trigger("before-import", args);
    file.fn.apply(args[0], args);
    $trigger("after-import", args);
    return locals.module.exports;
}
var FuseBox = (function () {
    function FuseBox() {
    }
    FuseBox.global = function (key, obj) {
        if (obj === undefined)
            return g[key];
        g[key] = obj;
    };
    FuseBox.import = function (name, o) {
        return $import(name, o);
    };
    FuseBox.on = function (n, fn) {
        $events[n] = $events[n] || [];
        $events[n].push(fn);
    };
    FuseBox.exists = function (path) {
        try {
            var ref = $getRef(path, {});
            return ref.file !== undefined;
        }
        catch (err) {
            return false;
        }
    };
    FuseBox.remove = function (path) {
        var ref = $getRef(path, {});
        var pkg = $packages[ref.pkgName];
        if (pkg && pkg.f[ref.validPath]) {
            delete pkg.f[ref.validPath];
        }
    };
    FuseBox.main = function (name) {
        this.mainFile = name;
        return FuseBox.import(name, {});
    };
    FuseBox.expose = function (obj) {
        var _loop_1 = function (k) {
            var alias = obj[k].alias;
            var xp = $import(obj[k].pkg);
            if (alias === "*") {
                $loopObjKey(xp, function (exportKey, value) { return (__root__[exportKey] = value); });
            }
            else if (typeof alias === "object") {
                $loopObjKey(alias, function (exportKey, value) { return (__root__[value] = xp[exportKey]); });
            }
            else {
                __root__[alias] = xp;
            }
        };
        for (var k in obj) {
            _loop_1(k);
        }
    };
    FuseBox.dynamic = function (path, str, opts) {
        this.pkg((opts && opts.pkg) || "default", {}, function (___scope___) {
            ___scope___.file(path, function (exports, require, module, __filename, __dirname) {
                var res = new Function("__fbx__dnm__", "exports", "require", "module", "__filename", "__dirname", "__root__", str);
                res(true, exports, require, module, __filename, __dirname, __root__);
            });
        });
    };
    FuseBox.flush = function (shouldFlush) {
        var def = $packages["default"];
        for (var fileName in def.f) {
            if (!shouldFlush || shouldFlush(fileName)) {
                delete def.f[fileName].locals;
            }
        }
    };
    FuseBox.pkg = function (name, v, fn) {
        if ($packages[name])
            return fn($packages[name].s);
        var pkg = ($packages[name] = {});
        pkg.f = {};
        pkg.v = v;
        pkg.s = {
            file: function (name, fn) { return (pkg.f[name] = { fn: fn }); },
        };
        return fn(pkg.s);
    };
    FuseBox.addPlugin = function (plugin) {
        this.plugins.push(plugin);
    };
    FuseBox.packages = $packages;
    FuseBox.isBrowser = $isBrowser;
    FuseBox.isServer = !$isBrowser;
    FuseBox.plugins = [];
    return FuseBox;
}());
if (!$isBrowser) {
    g["FuseBox"] = FuseBox;
}

return __root__["FuseBox"] = FuseBox; } )(this))
//# sourceMappingURL=server.js.map