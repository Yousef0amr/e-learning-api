

import sequelize from './config/database_config.js'
import { configDotenv } from 'dotenv';
import express from 'express'
import mainRouter from './routes/index.js';
import morgan from 'morgan';
import authJwt from './middlewares/authJwt.js';
import globelError from './middlewares/errorMiddleware.js';
import ApiError from './utils/apiResponse.js';
import errorMessages from './utils/errorMessages.js';
import { join, dirname } from 'path';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { rateLimit } from 'express-rate-limit'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001', "https://dainty-choux-5628a9.netlify.app"],  // Replace with your front-end URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,  // If you need to allow cookies or authentication headers
};


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
})

const init = async () => {
    configDotenv()

    const app = express()

    app.use(cookieParser());
    app.use(cors(corsOptions));


    app.use(express.json());
    app.use(express.static(join(__dirname, '../client/build')))


    if (process.env.NODE_ENV === 'dev') {
        app.use(morgan('dev'))
    }

    app.use(authJwt())

    app.use('/uploads', express.static(join(__dirname, 'uploads')))
    app.use('/', mainRouter)


    app.all('*', (req, res, next) => {
        return next(new ApiError(errorMessages.notFound, 404))
    })


    app.use(globelError)


    await sequelize.authenticate();

    app.listen(process.env.PORT, () => {
        console.log('connecting to port => ' + process.env.PORT)
    })
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});



init();