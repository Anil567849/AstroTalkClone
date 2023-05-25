
import dotenv from 'dotenv';
dotenv.config({path : './config/config.env'});
import {server, app} from './socket/socket.js';
import AuthRouter from './routes/auth.js';
import AstroAuthRouter from './routes/astrologer/auth.js';
import AstroRouter from './routes/astrologer/route.js';
import MainRouter from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import './db/conn.js';
import './kafka/kafka.js';




const corsOptions = {
  origin:'http://localhost:3000', 
  credentials:true,
  methods : ['GET', 'POST'],
  optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser())

app.use('/', MainRouter);
app.use('/auth', AuthRouter);

// Astro Router
app.use('/auth/astrologer', AstroAuthRouter);
app.use('/astrologer', AstroRouter);


server.listen(8000, () => {
    console.log(`server listening on port 8000`);
});