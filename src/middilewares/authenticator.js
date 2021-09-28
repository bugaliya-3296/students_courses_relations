const jwt = require('jsonwebtoken');
const user = require('../model/admin');


module.exports = async (req, res, next) => {
  const taskType = 'Authenticate User';

  const authHeader = req.get('Authorization');


  if (!authHeader) {
    return res.status(401).json({ message: 'User not Authorized. Auth token required.' });
  }

  const token = (authHeader.indexOf('Bearer') > -1) ? authHeader.split(' ')[1] : authHeader;

  if (!token || token === '') {
    return res.status(401).json({ message: 'User not Authorized. Auth token required.' });
  }

  try {
    // decode token to get user details from auth token
    const decodedToken = await jwt.verify(token, 'privateKey', {expiresIn: '1d'});
    console.log('-------------',decodedToken)
    return next();
    // return res.status(401).json({ message: 'User not Authorized.' });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'User not Authorized.' });
  }
};
