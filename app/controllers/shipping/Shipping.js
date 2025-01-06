import { PaymentService } from "../../services/Payment.js";

export class ShippingController {
  static async addShippingPayment(req, res) {
    const tokenizedCards = await PaymentService.getTokenizedCards();
    res.status(200).json({
      status: 200,
      message: "Proceso completado",
      success: true,
      tarjetas: tokenizedCards
    });
  }
}