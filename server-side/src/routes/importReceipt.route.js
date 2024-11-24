import express from 'express';
import * as ImportReceiptController from '../controllers/importReceipt.controller.js';

const importReceiptRouter = express.Router();

importReceiptRouter
    .route('/')
    .post(ImportReceiptController.createImportReceipt)
    .get(ImportReceiptController.getImportReceipts);

importReceiptRouter.route('/:receiptId').patch(ImportReceiptController.updateReceipt);

export default importReceiptRouter;
