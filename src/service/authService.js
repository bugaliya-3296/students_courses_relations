const jwt = require('jsonwebtoken');
const dbDataUser = require('../model/admin');
const bcrypt = require('bcryptjs');
const course = require('../model/course');
const classRoom = require('../model/classRoom');
const student = require('../model/student')
const userNamePasswordTable = require('../model/userLogin')

const accountSid = 'AC2bb70f03c073ceb99a80635451749339';//process.env.TWILIO_ACCOUNT_SID;
const authToken = 'ba441e4c5e83a8da5eb0688bbcdaba8f'//process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const SERVICE_ID = 'VA74c775b278bfd3f6334640f0414be917';

const userService = {
    getOTP: async (mobile) => {
        try {
            let data = await client
                .verify
                .services(SERVICE_ID)
                .verifications
                .create({
                    to: `+91${mobile}`,
                    channel: 'sms'
                });
            return true;
        } catch (error) {
            console.log(error);
            throw Error(error);
        }
    },
    getToken: async (req) => {

        try {

            console.log('----------------------token generating-=================', JSON.stringify(req))
            const mobile = req.mobile;
            console.log('----------------------token generating-=================', mobile)

            let result = await userNamePasswordTable.findAll({ where: { phone: mobile } }) || false;
            console.log(req.password, '----------------------token generating-=================', result)

            if (result && result.length < 1 && !req.isOTPVarification) {
                return ('user not found');
            }

            let doMatch = true;
            let hashedPassword;
            if (!req.isOTPVarification) {
                doMatch = await bcrypt.compare(req.password, result[0].password);
                hashedPassword = result[0].password;

            } else {
                hashedPassword = await bcrypt.hashSync(req.password, 8);
            }
            if (!doMatch) {
                return "Invalid Mobile Number or Password";
            }

            const User = {
                phone: req.mobile,
                password: hashedPassword
            };
            if (req.isOTPVarification) {
                await userNamePasswordTable.create(User)
            }
            return jwt.sign({ User }, "privateKey", { expiresIn: 86400 }) // expires in 24 hours
        } catch (error) {
            console.log('123456789=========================0987654321=====', error);
            return "Something went wrong";
        }
    },
}
module.exports = userService;