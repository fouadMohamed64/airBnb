import express from 'express';
import { getProfile, login, register, updateProfile } from '../controllers/users.controller.js';
import { authentication } from '../middleware/Authentication.js';
import { authorization } from '../middleware/Authorization.js';
import { handleAsyncError } from '../utils/handleAsyncError.js';
const router = express.Router();
router.post("/register" ,handleAsyncError(register) );
router.post("/login", handleAsyncError(login));

router.get('/profile',authentication ,handleAsyncError(getProfile ))
router.patch('/profile',authentication,authorization('admin') ,handleAsyncError(updateProfile))


export default router;