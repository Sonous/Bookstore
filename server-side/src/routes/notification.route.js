import express from 'express';
import * as NotificationController from '../controllers/notification.controller.js';

const notificationRouter = express.Router();

notificationRouter.route('/').get(NotificationController.getAllNotification);
// Route để lấy thông báo theo user_id
notificationRouter.route('/:userId').get(NotificationController.getNotificationsByUserId);

export default notificationRouter;
