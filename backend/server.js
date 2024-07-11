import express from 'express'
import dotenv from 'dotenv'
import './passport/github.auth.js'
import passport from 'passport'
import session from 'express-session'
import path from 'path'
import userRoutes from './routes/user.route.js'
import cors from 'cors'
import exploreRoutes from './routes/explore.route.js'
import connectMongoDb from './db/connectMongoDB.js'
import authRoutes from './routes/authRoute.js'




dotenv.config();  //this is allow us to get api key from env file

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

console.log("__dirname", __dirname);

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// app.get("/", (req,res) => {
//     res.send("Server is ready");
// })

app.use("/api/auth", authRoutes);
app.use("/api/users" , userRoutes)
app.use("/api/explore", exploreRoutes)

app.use(express.static(path.join(__dirname, "./frontend/dist")));

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
    connectMongoDb();
})