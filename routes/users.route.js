import express from 'express' ;
import { authentication } from '../middelware/authentication.js';
import { authorization } from '../middelware/Authorization.js';
const router = express.Router();
import { register , login , getProfile , updateProfile} from '../controllers/users.controller.js'

router.post("/register" , register);
router.post("/login", login);

router.get('/profile',authentication ,getProfile )
router.patch('/profile',authentication,authorization('admin') ,updateProfile)


export default router;