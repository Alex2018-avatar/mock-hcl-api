
export class ShippingController {

  static async saveB2BShippingInfo(req, res) {
    const { storeId } = req.params;
    res.status(200).json({ "code": "SUCCESS" });
    // ERROR RESPONSES
    // res.status(400).json({
    //   "code": "SERVICE_EXCEPTION",
    //   "message": "<p class='bold'>Inténtalo más tarde</p><p>Algo salió mal al procesar tu solicitud.</p>"
    // });
  }
}