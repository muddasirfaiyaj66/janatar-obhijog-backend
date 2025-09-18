import cookieParser from 'cookie-parser';
import express from 'express';
import { Application } from 'express';
import bodyparser from 'body-parser';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

//parser
app.use(express.json());
app.use(cookieParser());
// app.use(
//     cors({
//         origin:['http://localhost:3000','https://janatar-obhijog.vercel.app'],
//         credentials:true
//     })
// );

// Application route

app.use(bodyparser.urlencoded());
app.use(bodyparser.json());
app.use('/api/v1', router);

app.use(globalErrorHandler);

//
app.use(notFound);
export default app;
