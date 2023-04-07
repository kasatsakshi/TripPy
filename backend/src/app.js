import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";


const app = express();
const corsOptions = { origin: '*', exposedHeaders: 'X-Auth-Token' };

app.use(cors(corsOptions));
app.use(cookieParser());
const port = 3001;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.listen(port, () => console.log("[backend] listening on port " + port));


export default app



