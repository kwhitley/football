(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.target = "server";
// allowSyntheticDefaultImports
FuseBox.sdep = true;
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
const express_session_1 = require("express-session");
const heroku_ssl_redirect_1 = require("heroku-ssl-redirect");
const path_1 = require("path");
const http_1 = require("http");
const serve_favicon_1 = require("serve-favicon");
const db_1 = require("./db");
const cache_warmer_1 = require("./imager/cache-warmer");
const paths_1 = require("./paths");
// API
const api_1 = require("./api");
const api_2 = require("./imager/api");
const api_3 = require("./users/api");
// instantiate express
const app = express_1.default();
const isProduction = process.env.NODE_ENV === 'production';
// force SSL on production
app.use(heroku_ssl_redirect_1.default([
    'production',
]));
app.use(express_session_1.default({
    secret: 'my cat',
    resave: false,
    saveUninitialized: true,
}));
app.use(cookie_parser_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(compression_1.default());
// static serving from /dist/client
console.log(`serving static content from ${paths_1.clientPath}`);
app.use(express_1.default.static(paths_1.clientPath));
app.use(serve_favicon_1.default(path_1.default.join(__dirname, '../src/client/images', 'favicon.ico')));
// cache and sync collections when idle
app.use(cache_warmer_1.cacheWhenIdle);
// add api layers
app.use('/api', api_1.default);
app.use('/user', api_3.default);
app.use('/i', api_2.default);
// all other client requests that lack an extension redirected to client
app.get(/.*(?<!\.\w{1,4})$/, (req, res) => {
    console.log('redirecting request for', req.path, 'to', paths_1.clientPath + '/index.html');
    res.sendFile('/index.html', { root: paths_1.clientPath });
});
const serverPort = process.env.PORT || 3000;
const server = http_1.default.createServer(app);
const initialize = async () => {
    await db_1.connectDatabase();
    // start the cache warmer
    cache_warmer_1.checkForUpdates();
    // begin listening
    server.listen(serverPort);
    console.log(`Express server @ http://localhost:${serverPort} (${isProduction ? 'production' : 'development'})\n`);
};
initialize();
//# sourceMappingURL=index.js.map
});
___scope___.file("server/db/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_URI, } = process.env;
const shards = (uri) => Array(3).fill(0).map((v, i) => uri.replace(/^(.*)?-(.*)$/, `$1-shard-00-0${i}-$2`));
const replicaSet = (uri) => uri.replace(/^(.*)?-(.*)$/, `$1-shard-0`);
exports.URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${shards(DB_URI).join(',')}/${DB_DATABASE}?replicaSet=${replicaSet(DB_URI)}&ssl=true&authSource=admin`;
const db = {
    connection: undefined,
};
exports.connectDatabase = async () => mongodb_1.MongoClient
    .connect(exports.URI, { useNewUrlParser: true })
    .then((client) => {
    console.log('connected to database.');
    db.connection = client.db(DB_DATABASE);
    return dbCollection;
})
    .catch((err) => {
    console.log('error', err);
});
const find = (collection) => (match) => collection
    .find(match)
    .toArray();
const remove = (collection) => (condition) => {
    console.log('deleting from', collection, 'where', condition);
    return collection.deleteOne(condition || { safe: true });
};
const create = (collection) => (content = {}) => collection.insertOne(content);
const update = (collection) => (slug, content = {}) => collection
    .updateOne({ slug }, { $set: content })
    .then(find(collection)({ slug }));
exports.collection = (name) => {
    return {
        create: create(db.connection.collection(name)),
        find: find(db.connection.collection(name)),
        update: update(db.connection.collection(name)),
        remove: remove(db.connection.collection(name)),
    };
};
const dbCollection = (collectionName) => {
    if (!db.connection) {
        return ;
        throw new Error('database connection not instantiated before use');
    }
    return db.connection.collection(collectionName);
};
exports.default = dbCollection;
//# sourceMappingURL=index.js.map
});
___scope___.file("server/imager/cache-warmer.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const time_1 = require("supergeneric/time");
const collections_1 = require("supergeneric/collections");
const imager_js_1 = require("./imager.js");
const collections_2 = require("../collections/collections");
// persist list of paths processed and pending to be processed
const pendingImages = new Set;
const cachedImages = new Set;
const IDLE_CACHE_DELAY = time_1.getMilliseconds('10 seconds');
const SYNC_INTERVAL = time_1.getMilliseconds('1 minute');
// global timer to debounce effects
let timer = undefined;
let stallDate = new Date();
let globalUpdate;
// delay updates whenever middleware is triggered from a route
exports.cacheWhenIdle = (req, res, next) => {
    console.log('DELAY IDLE CACHING...', IDLE_CACHE_DELAY, 'ms');
    resetTimer(IDLE_CACHE_DELAY);
    next();
};
exports.checkForUpdates = async () => {
    console.log('cache-warmer: checking for updates...');
    let collections = await collections_2.getCollections({
        'source.service': 'dropbox',
        'source.apiKey': { $exists: true },
    });
    for (var collection of collections) {
        await collections_2.syncCollection({ _id: collection._id });
    }
    // get updated collections
    collections = await collections_2.getCollections({
        'source.service': 'dropbox',
        'source.apiKey': { $exists: true },
    });
    for (var collection of collections) {
        for (var item of collection.items) {
            let path = `${collection.slug}/${item.id}`;
            if (!pendingImages.has(path) && !cachedImages.has(path)) {
                console.log('image to be cached', { path });
                pendingImages.add(path);
            }
        }
    }
    if (pendingImages.size && !timer) {
        resetTimer();
    }
};
const resetTimer = (delay = 10) => {
    let timeDiff = (new Date() - stallDate);
    console.log('resetTimer, delay=', delay, 'timeDiff=', timeDiff);
    if (timeDiff > 0) {
        stallDate = new Date(new Date() - -delay); // shorthand to add delay to current Date
        timer && clearTimeout(timer);
        if (pendingImages.size) {
            timer = setTimeout(cacheAnImage, delay);
        }
        else {
            timer = undefined;
        }
    }
    else {
        // resetTimer(delay)
    }
};
const cacheAnImage = async () => {
    if (pendingImages.size) {
        let path = collections_1.randomItem(Array.from(pendingImages));
        await loadFragments(path);
        pendingImages.delete(path);
        cachedImages.add(path);
        console.log({
            service: 'cache-warmer',
            pending: pendingImages.size,
            cached: cachedImages.size,
        });
        // begin caching at full speed
        resetTimer();
    }
};
const loadFragments = async (path) => {
    try {
        await imager_js_1.getImage(`/${path}::width=400,height=400,preview.jpg`);
        await imager_js_1.getImage(`/${path}::width=400,height=400.jpg`);
        await imager_js_1.getImage(`/${path}::width=1500,height=1500,fit=inside,preview.jpg`);
        await imager_js_1.getImage(`/${path}::width=1500,height=1500,fit=inside.jpg`);
        return true;
    }
    catch (err) {
        console.log('loadFragments:error', err);
        return false;
    }
};
// set up constant update interval for app in background
setInterval(exports.checkForUpdates, SYNC_INTERVAL);
//# sourceMappingURL=cache-warmer.js.map
});
___scope___.file("server/imager/imager.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const sharp_1 = require("sharp");
const get_base_image_1 = require("./get-base-image");
const paths_1 = require("../paths");
exports.getImage = (requestedImagePath) => {
    // console.log('getImage:', requestedImagePath)
    return new Promise(async function (resolve, reject) {
        let decodedPath = decodeURI(requestedImagePath);
        let collectionId = decodedPath.replace(/\/([^\/]+).*/g, '$1');
        let optionsSegment = decodedPath.replace(/^.*::(.*)\.\w{3,4}$/i, '$1') || '';
        let revisionId = decodedPath.replace(/.*\/(\w+).*/g, '$1');
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
        let savepath = paths_1.imagePath + requestedImagePath;
        // console.log('getImage', {
        //   requestedImagePath,
        //   decodedPath,
        //   collectionId,
        //   optionsSegment,
        //   revisionId,
        //   options,
        //   savepath,
        // })
        let file = await get_base_image_1.getBaseImage(`/${collectionId}/${revisionId}.jpg`)
            .catch((err) => console.error('failure fetching image', err));
        try {
            var image = sharp_1.default(file).rotate();
        }
        catch (err) {
            console.log('error loading image', requestedImagePath, err);
            return false;
        }
        if (options.preview) {
            if (options.width) {
                options.width = 75;
            }
            if (options.height) {
                options.height = 75;
            }
            if (!options.fit) {
                options.fit = (options.height && options.width ? 'cover' : 'inside');
            }
            options.quality = 70;
        }
        let data = await image
            .resize({
            width: options.width,
            height: options.height,
            fit: options.fit || 'cover',
        })
            .jpeg({
            quality: options.quality || 90,
        })
            .toFile(savepath);
        console.log('generated', requestedImagePath);
        fs_1.default.promises.readFile(savepath)
            .then(resolve)
            .catch(reject);
    });
};
//# sourceMappingURL=imager.js.map
});
___scope___.file("server/imager/get-base-image.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const sharp_1 = require("sharp");
const dropbox_1 = require("./dropbox");
const collections_1 = require("../collections/collections");
const paths_1 = require("../paths");
// gets image locally, or downloads from dropbox and returns the saved image
exports.getBaseImage = async (requestedImagePath) => {
    return new Promise(async function (resolve, reject) {
        let decodedPath = decodeURI(requestedImagePath);
        let collectionId = decodedPath.replace(/\/([^\/]+).*/g, '$1');
        let revisionId = decodedPath.replace(/.*\/(\w+).*/g, '$1');
        // begin: save final output and stream output to response
        let savepath = paths_1.imagePath + requestedImagePath;
        let originalpath = paths_1.imagePath + '/' + collectionId + '/' + revisionId + '.jpg';
        // console.log('getBaseImage', {
        //   requestedImagePath,
        //   decodedPath,
        //   collectionId,
        //   revisionId,
        //   savepath,
        //   originalpath,
        // })
        // throw new Error('exit')
        let image = await fs_1.default.promises.readFile(originalpath)
            .catch((err) => console.log('loading image from dropbox...'));
        // download image from dropbox if not found base locally
        if (!image) {
            let collection = await collections_1.getCollection({ slug: collectionId });
            let { source } = collection;
            let binary = await dropbox_1.download(source.apiKey, revisionId);
            // ensure folder exists before file stream opening
            await fs_1.default.promises.mkdir(paths_1.imagePath + '/' + collectionId, { recursive: true }).catch(e => e);
            console.log('saving base image', originalpath);
            let image = await sharp_1.default(binary)
                .rotate()
                .jpeg({ quality: 95 })
                .toFile(originalpath);
        }
        // console.log('returning', savepath)
        fs_1.default.promises.readFile(savepath)
            .then(resolve)
            .catch(reject);
    });
};
//# sourceMappingURL=get-base-image.js.map
});
___scope___.file("server/imager/dropbox.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dropbox_1 = require("dropbox");
const isomorphic_fetch_1 = require("isomorphic-fetch");
const toFileItem = (i) => ({
    id: i.rev,
    filename: i.name,
    folder: i.path_display.replace(/(.*\/).*/gi, '$1'),
    size: i.size,
    dateCreated: i.server_modified,
});
exports.getIndex = (accessToken) => {
    var dbx = new dropbox_1.Dropbox({ accessToken, fetch: isomorphic_fetch_1.default });
    return dbx
        .filesListFolder({
        recursive: true,
        path: '',
    })
        .then(r => r.entries)
        .then(entries => entries.filter(i => i['.tag'] === 'file'))
        .then(entries => entries.map(toFileItem))
        .catch(console.error);
};
exports.download = (accessToken, path) => {
    console.log('dropbox:download', { path: `rev:${path}` });
    var dbx = new dropbox_1.Dropbox({ accessToken, fetch: isomorphic_fetch_1.default });
    return dbx.filesDownload({ path: `rev:${path}` })
        .then((response) => {
        console.log(`${path} downloaded`);
        return response.fileBinary;
    })
        .catch(console.error);
};
//# sourceMappingURL=dropbox.js.map
});
___scope___.file("server/collections/collections.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const dropbox_1 = require("../imager/dropbox");
exports.createCollection = (user) => async (content) => {
    if (!user || !user._id) {
        return false;
    }
    // extend content with dates and owner
    content = Object.assign({
        dateCreated: new Date(),
        dateModified: new Date(),
        owner: user._id,
    }, content);
    console.log('creating collection', content);
    return db_1.default('collections').insertOne(content);
};
exports.updateCollection = ({ slug, owner }) => (content) => db_1.default('collections')
    .updateOne({ slug, owner }, { $set: content });
exports.isAvailable = (slug) => db_1.default('collections')
    .findOne({ slug })
    .then(r => !r);
exports.addItemToCollection = ({ slug, owner }) => (item) => {
    console.log('adding item to collection', slug, item);
    return db_1.default('collections')
        .updateOne({
        slug,
        owner,
        'items.item.id': { $ne: item.id },
    }, {
        $addToSet: { items: item },
    });
};
exports.removeItemFromCollection = ({ slug, owner }) => (where) => db_1.default('collections')
    .updateMany({ slug, owner }, {
    $pull: {
        items: where,
    }
});
exports.updateItemInCollection = ({ slug, owner }) => (id) => (content) => {
    const updateify = (content) => {
        let base = Object.keys(content).reduce((obj, key) => {
            obj[`items.$.${key}`] = content[key];
            return obj;
        }, {});
        base['items.$.dateModified'] = new Date();
        console.log('updateify', content, base);
        return base;
    };
    return db_1.default('collections')
        .updateOne({
        slug,
        owner,
        'items.id': id,
    }, {
        $set: updateify(content),
    });
};
exports.getCollection = (where = {}) => db_1.default('collections').findOne(where);
exports.getCollections = (where = {}) => db_1.default('collections')
    .find(where, {
    items: 0,
})
    .toArray();
exports.getCollectionList = (where = {}) => db_1.default('collections')
    .find(where)
    .toArray();
exports.getCollectionItems = (where = {}) => db_1.default('collections')
    .findOne(where)
    .then(r => r.items || []);
exports.getCollectionItem = (where = {}) => (itemWhere = {}) => db_1.default('collections')
    .findOne(where, { foo: 1, dateCreated: 0 })
    .then(r => r.items || []);
exports.syncCollection = async (where = {}) => {
    try {
        let collection = await exports.getCollection(where);
        let collectionItems = collection.items || [];
        let { source, owner, slug } = collection;
        if (!source || !source.apiKey)
            return false;
        let dropboxItems = await dropbox_1.getIndex(source.apiKey) || [];
        for (var dbItem of dropboxItems) {
            if (!collectionItems.find(i => i.id === dbItem.id)) {
                console.log('id', dbItem.id, 'not found in collection... inserting', dbItem);
                await exports.addItemToCollection({ slug, owner })(dbItem);
            }
        }
        for (var collectionItem of collectionItems) {
            if (!dropboxItems.find(i => i.id === collectionItem.id)) {
                console.log('id', collectionItem.id, 'not found in dropbox... removing from collection/archiving');
                exports.removeItemFromCollection({ slug, owner })({ id: collectionItem.id });
                // TODO: clean up files
            }
        }
        return {
            collectionItems,
            dropboxItems,
        };
    }
    catch (err) {
        throw new Error(err);
    }
};
//# sourceMappingURL=collections.js.map
});
___scope___.file("server/paths.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const isProduction = process.env.NODE_ENV === 'production';
const isDevelop = process.env.NODE_ENV === 'development';
console.log('NODE_ENV=', process.env.NODE_ENV);
console.log('isProduction=', isProduction);
console.log('isDevelop=', isDevelop);
exports.serverPath = path_1.default.join(__dirname, `../${isDevelop ? '.dist-dev' : 'dist'}`);
exports.clientPath = exports.serverPath + '/client';
exports.imagePath = exports.clientPath + '/i';
//# sourceMappingURL=paths.js.map
});
___scope___.file("server/api.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apicache_1 = require("apicache");
const users_1 = require("./users/users");
const api_1 = require("./collections/api");
// create an express app
const app = express_1.default();
const cache = apicache_1.default.middleware;
app.use('/collections', api_1.default);
app.get('/env', users_1.isAdmin, (req, res) => {
    res.json(process.env);
});
// 404
app.get('*', (req, res) => {
    res.sendStatus(404);
});
// export the express app
exports.default = app;
//# sourceMappingURL=api.js.map
});
___scope___.file("server/users/users.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
exports.getUsersList = () => db_1.collection('users').find({});
exports.createUser = async (profile) => await db_1.collection('users')
    .create(Object.assign({
    dateCreated: new Date()
}, profile));
exports.getUser = async (match) => db_1.collection('users').find(match);
exports.isAuthenticated = (req, res, next) => req.session.user
    ? (req.user = req.session.user) && next()
    : res.sendStatus(401);
exports.isAdmin = (req, res, next) => req.session.user & req.session.user.email === 'krwhitley@gmail.com'
    ? next()
    : res.sendStatus(401);
//# sourceMappingURL=users.js.map
});
___scope___.file("server/collections/api.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const collections_1 = require("./collections");
const users_1 = require("../users/users");
const db_1 = require("../db");
const app = express_1.default();
// GET colections index
app.get('/', async (req, res) => {
    let result = await collections_1.getCollections();
    if (!result) {
        return res.sendStatus(404);
    }
    res.json(result);
});
// GET collection
app.get('/:slug', async (req, res) => {
    let { slug } = req.params;
    let result = await collections_1.getCollection({ slug });
    if (!result) {
        return res.sendStatus(404);
    }
    console.log('GET getCollection', { slug }, 'result = ', result);
    delete result.source;
    delete result.owner;
    result.items = result.items || [];
    result.items = result.items.map(i => {
        delete i.filename;
        delete i.size;
        return i;
    });
    res.json(result);
    // let syncResponse = await syncCollection({ slug })
    //                           .catch(err => console.error(err))
});
// PATCH collection update
app.patch('/:slug', users_1.isAuthenticated, async (req, res) => {
    const collections = db_1.collection('collections');
    const { slug } = req.params;
    const { user } = req;
    console.log('updating collection', slug, req.body);
    // return res.sendStatus(200)
    await collections_1.updateCollection({ slug, owner: user._id })(req.body)
        .catch((err) => {
        console.error(err);
        res.sendStatus(400);
    });
    let response = await collections_1.getCollections({ slug });
    user.collections = await collections_1.getCollections({ owner: user._id });
    if (response) {
        res.json(response);
    }
    else {
        res.sendStatus(400);
    }
});
// DELETE collection
app.delete('/:slug', users_1.isAuthenticated, async (req, res) => {
    const collections = db_1.collection('collections');
    const { slug } = req.params;
    const { user } = req;
    let response = await collections.remove({ slug, owner: String(user._id) });
    user.collections = await collections_1.getCollections({ owner: String(user._id) });
    if (response) {
        res.json(response);
    }
    else {
        res.sendStatus(400);
    }
});
// GET collection items
app.get('/:slug/items', async (req, res) => {
    let { slug, item } = req.params;
    let items = await collections_1.getCollectionItems({ slug })
        .catch(err => console.error(err));
    items ? res.json(await items) : res.sendStatus(400);
});
// GET collection item (single) by id
app.get('/:slug/items/:id', async (req, res) => {
    let { slug, id } = req.params;
    let allItems = await collections_1.getCollectionItems({ slug })
        .catch(err => console.error(err));
    res.json(allItems.find(i => i.id === id));
});
// PATCH collection item (single) by id
app.patch('/:slug/items/:id', users_1.isAuthenticated, async (req, res) => {
    let { slug, id } = req.params;
    let { user } = req;
    let content = req.body;
    let update = await collections_1.updateItemInCollection({ slug, owner: user._id })(id)(content)
        .catch(err => console.error(err));
    let results = await collections_1.getCollection({ slug })
        .catch(err => res.sendStatus(500));
    res.json(await results);
});
// GET collection sync (trigger)
app.get('/:slug/sync', async (req, res) => {
    let { slug } = req.params;
    let syncResponse = await collections_1.syncCollection({ slug })
        .catch(err => console.error(err));
    return res.json(syncResponse);
    console.log('syncResponse = ', syncResponse);
    let response = await collections_1.getCollection({ slug }).catch(err => console.error(err));
    response ? res.json(await response) : res.sendStatus(400);
});
// GET collection name is available (returns 200 || 409)
app.get('/:slug/available', async (req, res) => {
    let available = await collections_1.isAvailable(req.params.slug);
    res.sendStatus(available ? 200 : 409);
});
// POST collection
app.post('/', users_1.isAuthenticated, async (req, res) => {
    let { name, slug } = req.body;
    let { user } = req;
    let available = await collections_1.isAvailable(slug);
    if (!available) {
        return res.sendStatus(409);
    }
    let response = await collections_1.createCollection(req.user)(req.body)
        .catch((err) => {
        console.error(err);
        res.sendStatus(400);
    });
    user.collections = await collections_1.getCollections({ owner: String(user._id) });
    if (response) {
        res.json(response.ops[0]);
    }
    else {
        res.sendStatus(400);
    }
});
exports.default = app;
//# sourceMappingURL=api.js.map
});
___scope___.file("server/imager/api.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imager_js_1 = require("./imager.js");
const app = express_1.default();
// single route catches all requests to imager and passes them to worker
app.get('*.(png|jpg)', (req, res) => {
    imager_js_1.getImage(req.path)
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
//# sourceMappingURL=api.js.map
});
___scope___.file("server/users/api.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const xs_blowfish_1 = require("xs-blowfish");
const users_1 = require("./users");
const collections_1 = require("../collections/collections");
const security_1 = require("./security");
const app = express_1.default();
const safeUserProfile = (user) => {
    let response = Object.assign({}, user);
    delete response._id;
    delete response.apiKey;
    delete response.password;
    return response;
};
app.get('/all', users_1.isAuthenticated, users_1.isAdmin, async (req, res) => {
    let users = await users_1.getUsersList()
        .catch((err) => res.status(400).json(err));
    console.log('users', users);
    res.json(users);
});
app.get('/profile', users_1.isAuthenticated, async (req, res) => {
    let { user } = req;
    let response = safeUserProfile(user);
    response.collections = await collections_1.getCollections({ owner: user._id });
    res.json(response);
});
app.get('/collections', users_1.isAuthenticated, async (req, res) => {
    let { user } = req;
    let response = await collections_1.getCollections({ owner: user._id });
    response ? res.json(response) : res.sendStatus(400);
});
app.get('/logout', (req, res) => {
    delete req.session.user;
    res.sendStatus(200);
});
app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.sendStatus(400);
    }
    let user = await users_1.getUser({ email })
        .then(users => users[0])
        .catch(() => {
        console.log('user not found with email', email);
        res.sendStatus(401);
    });
    if (user) {
        console.log('user found', user);
        let valid = await security_1.checkPassword(password, user.password);
        if (valid) {
            // decrpyt API token
            // let bf = new Blowfish(user.password)
            // user.apiKey = bf.decrypt(user.apiKey)
            // console.log('decrypted API key', user.apiKey)
            console.log('getting collections where', { owner: String(user._id) });
            let collections = await collections_1.getCollections({ owner: String(user._id) });
            console.log('matching collections', collections);
            user.collections = collections;
            req.session.user = user;
            res.json(safeUserProfile(user));
        }
        else {
            res.sendStatus(401);
        }
    }
    else {
        res.sendStatus(401);
    }
});
app.post('/signup', async (req, res) => {
    let { email, password, passwordConfirmation, apiKey } = req.body;
    if (!email || !password) {
        return res.sendStatus(400);
    }
    let existingUser = await users_1.getUser({ email })
        .then(users => users[0])
        .catch(() => { });
    if (existingUser) {
        return res.sendStatus(409);
    }
    password = await security_1.getHash(password);
    console.log('hash', password);
    // encrypt apiKey based on new password
    let bf = new xs_blowfish_1.default(password);
    console.log('apiKey', apiKey);
    apiKey = apiKey ? bf.encrypt(apiKey) : undefined;
    console.log('encrypted apiKey', apiKey);
    await users_1.createUser({ email, password, apiKey }).catch(() => res.sendStatus(401));
    let user = await users_1.getUser({ email, password })
        .then(users => users[0])
        .catch(() => res.sendStatus(401));
    if (user) {
        req.session.user = user;
        res.json(user);
    }
});
exports.default = app;
//# sourceMappingURL=api.js.map
});
___scope___.file("server/users/security.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const saltRounds = 8;
exports.getHash = (password) => bcryptjs_1.default.hash(password, saltRounds);
exports.checkPassword = (password, hash) => bcryptjs_1.default.compare(password, hash);
//# sourceMappingURL=security.js.map
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