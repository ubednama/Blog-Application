import express from 'express';
import v1Posts from './post.routes.js'
import v1Auth from './user.routes.js'

const router = express.Router();

router.use("/v1/posts", v1Posts);
router.use("/v1/user", v1Auth);

export default router;