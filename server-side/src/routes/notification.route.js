import express from 'express';
import * as NotificationController from '../controllers/notification.controller.js';

const notificationRouter = express.Router();

notificationRouter.route('/').get(NotificationController.getAllNotification);

export default notificationRouter;
