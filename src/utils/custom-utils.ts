export const buildCheckCreditResponse = (usedBalance, assignedCredit) => {
  // return {
  //   "assignedQuota": usedBalance.toString(),
  //   "availableQuota": '0',//assignedCredit.toString(),
  //   "success": true,
  //   "message": "Guardado exitosamente",
  //   "status": 200,
  //   "totalDebt": "2500.0",
  // };
  return {
    "availableQuota": "3599000.0",
    "assignedQuota": "4599000.0",
    "success": true,
    "totalDebt": "1000000.0",
    "message": "Execution successfully",
    "status": 200
  }


}