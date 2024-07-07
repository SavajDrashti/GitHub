import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import cors from 'cors'
import exploreRoutes from './routes/explore.route.js'

dotenv.config();  //this is allow us to get api key from env file

const app = express();
app.use(cors());

app.get("/", (req,res) => {
    res.send("Server is ready");
})

app.use("/api/users" , userRoutes)
app.use("/api/explore", exploreRoutes)


app.listen(5000, () => {
    console.log("Server started on http://localhost:5000");
})