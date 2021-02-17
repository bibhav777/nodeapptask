import express from 'express';
import controller from '../controllers/user';

const router = express.Router();

router.post('/signup', controller.createUser);
// router.get('/get/books', controller.getAllBooks);

export = router;
