import express from 'express';
import * as BannerController from '../controllers/banner.controller.js';

const bannerRouter = express.Router();

bannerRouter.route('/').get(BannerController.getBanners);

export default bannerRouter;
