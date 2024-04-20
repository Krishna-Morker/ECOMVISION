import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import clientroutes from "./routes/client.js";
import generalroutes from "./routes/general.js";
import managementroutes from "./routes/management.js";
import salesroutes from "./routes/sales.js";



/* Configuration */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Routes */
app.use("/client",clientroutes);
app.use("/general",generalroutes);
app.use("/management",managementroutes);
app.use("/sales",salesroutes);


/* Mongoose Setup */
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
}).then(()=>{
    app.listen(PORT,()=>console.log(`Server Port: ${PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));