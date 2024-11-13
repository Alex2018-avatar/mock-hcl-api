export const generateWCSError = (errorKey, code) => {
  const commonErrorProperties = {
    "errorParameters": "error",
    "errorMessage": "error message",
  }
  return ({
    "errors": [
      {
        "errorKey": errorKey || '_GENERIC_ERROR',
        ...commonErrorProperties,
        "errorCode": code || '1001'
      }
    ]
  })
}