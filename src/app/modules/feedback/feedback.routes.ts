import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FeedbackValidation } from './feedback.valodation';
import { FeedbackController } from './feedback.controller';

const router = express.Router();

router.post('/',
validateRequest(FeedbackValidation.createFeedbackZodSchema),
FeedbackController.createFeedback
);

router.get('/:id', FeedbackController.getFeedback);

router.patch('/:id', validateRequest(FeedbackValidation.updateFeedbackZodSchema), FeedbackController.updateFeedback);

router.delete('/:id', FeedbackController.deleteFeedback);

router.get('/', FeedbackController.listFeedback);

export const FeedbackRoutes = router;