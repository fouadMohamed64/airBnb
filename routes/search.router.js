import express from 'express'
import { handleAsyncError } from '../utils/handleAsyncError.js';
import { search } from '../controllers/listing.controller.js';


let router = express.Router();

router.get('/',handleAsyncError(search))// handle advanced search results


export default router;
