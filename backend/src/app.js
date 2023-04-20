import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";


const app = express();

app.use(cors());
app.use(cookieParser());
const port = 3002; 
app.use(express.json());
app.use(
express.urlencoded({
    extended: false,
})
);

app.listen(port, () => console.log("[backend] listening on port " + port));


export default app



