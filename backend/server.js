import express  from "express";
import dotenv from 'dotenv'
import router from "./routes/userRoutes.js";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import db from './config/db.js'
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/users',router)
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000;
db();
app.get('/',(req,res,next) =>{
    res.json({message:"d"})
})

app.listen(port,() =>{
    console.log(`Server Listening: http://localhost:${port}`)
})