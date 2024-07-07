import express from 'express'
import { getUserProfileAndRepos } from '../controllers/user.controller.js'

const router = express.Router();

router.get("/profile/:username", getUserProfileAndRepos)  //fetch the user dependingupon their username
   


export default router;