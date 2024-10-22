import express from 'express';
import * as AdminController from '../controllers/admin.controller.js';

const adminRouter = express.Router();

adminRouter.route('/').get(AdminController.getAdminByToken);

export default adminRouter;
