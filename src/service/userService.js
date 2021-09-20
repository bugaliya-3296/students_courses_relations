const jwt = require('jsonwebtoken');
const userData = require('../model/admin');


const userService = {
    getToken: (req) => {

        const user = {
            // id: req.id,
            phone: req,
            // mailId: req.mailId,
        }
        return jwt.sign(user, 'privateKey', { expiresIn: '1d' });
    },
    addNewUser: async (req) => {
        try {
            const phone = req.body.phone;
            const authHeader = req.get('Authorization');
            const token = (authHeader.indexOf('Bearer') > -1) ? authHeader.split(' ')[1] : authHeader;

            const decodedToken = jwt.verify(token, 'privateKey', { expiresIn: '1d' });

            const mobileNumber = decodedToken.phone;

            const userInfoDB = await userData.find({ phone: mobileNumber }).lean();
            if (userInfoDB != null && userInfoDB != '' && !userInfoDB[0].isUserTypeAdmin) {
                return 'You does not have right access to add, update, Delete & get all user list.';
            }
            const data = await userData.find({ phone: phone }).lean();

            if (data.length > 0) {
                return ('User is already exit');
            }

            let userDetails = new userData();
            userDetails.userName = req.body.userName;
            userDetails.email = req.body.email;
            userDetails.phone = req.body.phone;
            userDetails.isUserTypeAdmin = req.body.isUserTypeAdmin;

            await userData.insertMany(userDetails).then(docs => Promise.resolve(docs));
            return userDetails;
        } catch (error) {
            throw Error(error);
        }
    },
    getAllUser: async (req) => {
        try {
            const authHeader = req.get('Authorization');
            const token = (authHeader.indexOf('Bearer') > -1) ? authHeader.split(' ')[1] : authHeader;

            const decodedToken = jwt.verify(token, 'privateKey', { expiresIn: '1d' });

            const mobileNumber = decodedToken.phone;
            const userInfoDB = await userData.find({ phone: mobileNumber }).lean();

            if (!userInfoDB[0].isUserTypeAdmin) {
                return 'You does not have right access to add, update, Delete & get all user list.';
            }
            const data = await userData.find({}).lean();
            return data;
        } catch (error) {
            throw Error(error);
        }
    },
    updateUserDetails: async (req) => {
        try {
            const authHeader = req.get('Authorization');
            const token = (authHeader.indexOf('Bearer') > -1) ? authHeader.split(' ')[1] : authHeader;

            const decodedToken = jwt.verify(token, 'privateKey', { expiresIn: '1d' });

            let mobileNumber = decodedToken.phone;
            const userInfoDB = await userData.find({ phone: mobileNumber }).lean();
            mobileNumber = req.query.phone;
            if (!userInfoDB[0].isUserTypeAdmin) {
                return 'You does not have right access to add, update, Delete & get all user list.';
            }
            const data = await userData.find({ phone: mobileNumber }).lean();

            if (data.length < 1) {
                return ('User does not exist');
            }

            let objUpdate = {};
            objUpdate.userName = req.body.userName;
            objUpdate.email = req.body.email;
            objUpdate.phone = req.body.phone;
            objUpdate.isUserTypeAdmin = req.body.isUserTypeAdmin;
            await userData.updateOne({ phone: mobileNumber }, { $set: objUpdate }).then(item => console.log('success')).catch(error => console.log('db error'));

            return objUpdate;
        } catch { error } {
            throw Error(error);
        }
    },
    userInfo: async (req) => {
        try {
            const mobileNumber = req.query.phone;

            const data = await userData.find({ phone: mobileNumber }).lean();

            if (data.length < 1) {
                return ('User does not exist');
            }
            return data;
        } catch (error) {
            throw Error(error);
        }
    },
}
module.exports = userService;