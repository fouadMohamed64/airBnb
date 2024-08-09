import express from 'express'
import { handleAsyncError } from '../utils/handleAsyncError.js';
import { search } from '../controllers/search.controller.js';


let router = express.Router();

router.get('/search',handleAsyncError(search))


export default router;
