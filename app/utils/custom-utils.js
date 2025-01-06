export const buildCheckCreditResponse = (usedBalance, assignedCredit) => {
  return {
    "saldoUtilizado": usedBalance.toString(),
    "cupoAsignado": assignedCredit.toString(),
    "success": true,
    "message": "Guardado exitosamente",
    "status": 200
  };
}