import express from 'express';
import controller from '../controllers/steps';

const router = express.Router();

router.post('/step', controller.Step);
router.get('/totalstep', controller.totalStep);
router.get('/filter', controller.filterSteps);
// router.get('/get/books', controller.getAllBooks);

export = router;
