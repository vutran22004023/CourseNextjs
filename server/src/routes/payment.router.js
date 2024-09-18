import express from 'express';
import paymentController from '../controllers/payment.controller.js';
import { AuthMiddleware, passportMiddleware } from '../middlewares/index.js';
const router = express.Router();

//begin api thanh toán PayOS
router.post('/create-payment-link', AuthMiddleware.authUser, paymentController.createLinkPayOs);
router.post('/receive-hook', AuthMiddleware.authUser, paymentController.receiveHookPayOs);
router.get('/get-payment-infomations/:idorder', AuthMiddleware.authUser, paymentController.getPaymentInfomationsPayOs);
router.post('/cancel-payment-link/:idorder', AuthMiddleware.authUser, paymentController.canceledPaymentLinkPayOs);
router.post('/confirm-webhook-payos', AuthMiddleware.authUser, paymentController.confirmWebhookPayOs);
// end api thanhf toán PayOS

//begin api thanh toán ZaloPay
router.post('/payment-zalopay', AuthMiddleware.authUser, paymentController.createPaymentZaloPay);
router.post('/callback-zalo', AuthMiddleware.authUser, paymentController.callbackZaloPay);
router.post('/order-status-zalopay/:apptransid', AuthMiddleware.authUser, paymentController.orderStatusZaloPay);
router.post('/transaction-refund', AuthMiddleware.authUser, paymentController.transactionRefund);
router.post('/transaction-refund-status', AuthMiddleware.authUser, paymentController.transactionRefundStatus);
//end api thanh toán ZaloPay

router.get('/information-course', AuthMiddleware.authAdmin, paymentController.getInformationCourse);
router.post('/post-information-course', AuthMiddleware.authUser, paymentController.postInformationCourse);
router.put('/update-information-course/:id', AuthMiddleware.authUser, paymentController.updateInformationCourse);
router.delete('/delete-information-course/:id', AuthMiddleware.authUser, paymentController.deleteInformationCourse);
router.get('/check-paid-course/:courseId', passportMiddleware, paymentController.checkPaidCourse);
export default router;
