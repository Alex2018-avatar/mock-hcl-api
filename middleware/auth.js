
export const identifyUserType = (req, res, next) => {
  if (req.cookies['WC_AUTHENTICATION_1002']) {
    req.userType = 'authenticated';
    req.logged = true;
    req.userId = '1002'; // Podrías extraer el ID del token si es necesario
  } else if (req.cookies['WC_AUTHENTICATION_38']) {
    req.userType = 'guest';
    req.userId = '38';
    req.logged = false;
  } else {
    req.userType = 'unknown';
    req.logged = false;
  }
  next();
};
export const requireAuthenticated = (req, res, next) => {
  if (req.userType !== 'authenticated') {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
};