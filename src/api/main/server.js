const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const compression = require('compression')
const fs = require('fs')
const express = require('express')
const path = require('path')


module.exports = function (pathToDb, cleanDB) {

    const server = express()
    const db = require(path.join(__dirname, '/config/db'))(pathToDb)
    const env = require(path.join(__dirname, '/config/env'))

    const { STATUS_UPDATE, emitter } = require(path.join(
        __dirname,
        '/../../socketConstants'
    ))

    const patientsRoute = require(path.join(
        __dirname,
        '/routes/patients'
    ))
    const configurationsRoute = require(path.join(
        __dirname,
        '/routes/configurations'
    ))
    const sourceFilesRoute = require(path.join(
        __dirname,
        '/routes/source_files'
    ))

    const serverInfo =
        `express/${require('express/package.json').version} ` +
        `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

    const resolve = (file) => path.resolve(__dirname, file)
    const isProd = process.env.NODE_ENV !== 'dev'

    server.db = db

    server.use(morgan('combined'))
    server.use(bodyParser.json())

    server.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
        next()
    })

    const sequelizePromise = db.sequelize.sync({ force: cleanDB })

    server.use(async (req, res, next) => {
        await sequelizePromise
        req.db = db
        next()
    })

    server.use(patientsRoute)
    server.use(configurationsRoute)
    server.use(sourceFilesRoute)

    const { createBundleRenderer } = require('vue-server-renderer')

    function createRenderer(bundle, options) {
        return createBundleRenderer(
            bundle,
            Object.assign(options, {
                basedir: resolve('./dist'),
                runInNewContext: false,
            })
        )
    }

    let renderer
    let readyPromise
    const templatePath = resolve('../../../index.template.html')
    if (isProd) {
        const template = fs.readFileSync(templatePath, 'utf-8')
        const bundle = require('../../../dist/vue-ssr-server-bundle.json')
        const clientManifest = require('../../../dist/vue-ssr-client-manifest.json')
        renderer = createRenderer(bundle, {
            template,
            clientManifest,
        })
    } else {
        readyPromise = require(path.join(__dirname, '/../../../build/setup-dev-server'))(
            server,
            templatePath,
            (bundle, options) => {
                renderer = createRenderer(bundle, options)
            }
        )
    }
    function render(req, res) {
        const context = { url: req.url }

        res.setHeader('Content-Type', 'text/html')
        res.setHeader('Server', serverInfo)

        const handleError = (err) => {
            if (err.url) {
                res.redirect(err.url)
            } else if (err.code === 404) {
                res.status(404).send('404 | Page Not Found')
            } else {
                // Render Error Page or Redirect
                res.status(500).send('500 | Internal Server Error')
                console.error(`error during render : ${req.url}`)
                console.error(err.stack)
            }
        }
        renderer.renderToString(context, (err, html) => {
            if (err) {
                console.error(err)
                if (err.code === 404) {
                    res.status(404).end('Page not found')
                } else {
                    res.status(500).end('Internal Server Error')
                }
            } else {
                res.send(html, { 'Content-Type': 'text/html' }, 201)
            }
        })
    }

    const serve = (path, cache) =>
        express.static(resolve(path), {
            maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0,
        })

    server.use(compression({ threshold: 0 }))
    server.use('/dist', serve('./dist', true))
    server.use('/public', serve('./public', true))

    server.get(
        '*',
        isProd
            ? render
            : (req, res) => {
                readyPromise.then(() => render(req, res))
            }
    )

    const httpServer = http.createServer(server)
    const io = require('socket.io')(httpServer)

    httpServer.listen(env.PORT, () => {
        console.log(`Server listening on port ${env.PORT}`)
    })

    const clientSocket = io.of('/connection/client')
    emitter.on(STATUS_UPDATE, (statusObj) => {
        clientSocket.emit(STATUS_UPDATE, statusObj)
    })
    clientSocket.on('connection', (socket) => {
        socket.on(STATUS_UPDATE, (statusObj) => {
            socket.emit(STATUS_UPDATE, statusObj)
        })
    })


    return server
}