import express from 'express';
import * as CategoryController from '../controllers/category.controller.js';

const categoryRouter = express.Router();

categoryRouter.route('/').get(CategoryController.getAllCategories);

export default categoryRouter;
