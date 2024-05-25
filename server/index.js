import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import User from "./models/User.js";
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';
import connectMongoDBSession from 'connect-mongodb-session';
import session from 'express-session';
const MongoStore = connectMongoDBSession(session);
import clientroutes from "./routes/client.js";
import generalroutes from "./routes/general.js";
import managementroutes from "./routes/management.js";
import salesroutes from "./routes/sales.js";
import  OverallStat  from "./models/OverallStat.js";
import passport from 'passport';
import configurePassport from './config/passport.js';
configurePassport(passport);
import allowedOrigin from './config/allowedOrigin.js';

/* data imports */
import { dataUser, dataProduct, dataProductStat , dataTransaction, dataOverallStat,} from "./data/index.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js"; 
import ProductStat from "./models/ProductStat.js";
import AffiliateStat from "./models/AffiliateStat.js";

/* Configuration */
const app = express();
const corsOptions ={
    origin: allowedOrigin, 
    credentials:true,            
    optionSuccessStatus:200,
    sameSite:'none',
    secure:true,
  }
app.use(cors(corsOptions));
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.get("/login/sucess",async(req,res)=>{
    try {
    // console.log(req.cookies);
      const token=req.cookies.jwt;
    //   console.log(token,"toke");
      let islog=0;
      if(token){
      const verifyuser= jwt.verify(token,process.env.Secret_Key);
      const user= await User.findOne({email:verifyuser.email});
      user.tokens.map((e)=>{
        if(e.token==token) islog=1;
      });
      req.user=user;
      
      res.status(200).json({sta:islog,user:req.user})
      }
  } catch (error) {
    console.log(error)
      res.status(401).send(error);
  }
  })
  
  app.get("/check/:id",async(req,res)=>{
    try {
   
      const id=req.params.id;
      //const token=id;
      //console.log(token,"toke");
      if(id){
      const verifyuser= jwt.verify(id,process.env.Secret_Key);
      
      const user= await User.findOne({email:verifyuser.email});
      let k=false;
     // console.log(user,"user");
     user.tokens.map((tok)=>{ 
    //   console.log(tok);     
    if(tok!=undefined &&  tok.token==id) k=true;
    })
  
      
     // console.log(k,"lkklk");
    res.json({chk:k,user:req.user})
  
    }
  
  } catch (error) {
    console.log(error)
      res.status(401).send(error);
  }
  })
    

/* Routes */
app.use("/client",clientroutes);
app.use("/general",generalroutes);
app.use("/management",managementroutes);
app.use("/sales",salesroutes);
app.use("/api/auth",authRoutes);

app.get("/",(req,res)=>{
    res.send("Server is working successfully !")
  })


/* Mongoose Setup */
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
}).then(()=>{
    app.listen(PORT,()=>console.log(`Server Port: ${PORT}`));
    // Add data one by one
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    //    Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser); 
})
.catch((error) => console.log(`${error} did not connect`));