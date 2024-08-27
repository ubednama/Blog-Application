import express from 'express';
import v1Routes from './post.routes.js'

const router = express.Router();

router.use("/v1/post", v1Routes);

export default router;