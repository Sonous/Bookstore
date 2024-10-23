import express from 'express';
import { getTransportMethodByPk } from '../controllers/transportMethod.controller.js';

const transportMethodRouter = express.Router();

transportMethodRouter.get('/:id', getTransportMethodByPk);

export default transportMethodRouter;
