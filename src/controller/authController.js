const express = require('express');
const jwt = require('jsonwebtoken');

const { authService } = require('../service/index')
const app = express();
const accountSid = 'AC2bb70f03c073ceb99a80635451749339';//process.env.TWILIO_ACCOUNT_SID;
const authToken = 'ba441e4c5e83a8da5eb0688bbcdaba8f'//process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const SERVICE_ID = 'VA74c775b278bfd3f6334640f0414be917';

const authTokenController = {
    register: async (req, res, next) => {
        const taskType = 'generating token...';
        const phoneNumber = req.headers.phonenumber;
        try {
            if (phoneNumber.toString().length !== 10) {
                throw error('Please provide a valid phoneNumber number');
            }
            let token = await authService.getOTP(phoneNumber);
            if (token) {
                res.status(200).json({
                    message: "Verification code is sent!",
                });
            }
        } catch (error) {
            
            res.send('somethng went wrong...');
            throw error('somethng went wrong...')
        }
    },
    logIn: async (req, res, next) => {
        const taskType = 'logIn...';
        const phoneNumber = req.headers.phonenumber;
        req = req.body;
        try {
            if (phoneNumber.toString().length !== 10) {
                throw error('Please provide a valid phoneNumber number');
            }
            
            console.log("message: User is Verified!! above verification", req);

            await client
                .verify
                .services(SERVICE_ID)
                .verificationChecks
                .create({
                    to: `+91${req.mobile}`,
                    code: `${req.otp}`
                })
                .then(async (data) => {
                    if (data.status === "approved") {
                        // objData.Isapproved = true;
                        // objData.message = "User is Verified!";
                        console.log(`{message: "User is Verified!!", ${JSON.stringify(data)}}`);
                        let token = await authService.getToken(req);
 
                        res.status(200).json({
                            message: "User is Verified!",
                            token: token,
                        });
                    }
                })
                .catch(async(error) => {
                    console.log('0000000000000000----', error)
                    let token = await authService.getToken(req);

                    res.status(200).json({
                        message: "Incorrect otp or contact number!",
                    });
                })

        } catch (error) {
            res.send('somethng went wrong...');
            throw error('somethng went wrong...')
        }
    },
    getAuthToken: async (req, res, next) => {
        const taskType = 'generating token...';
        const phoneNumber = req.body;
        try {
            console.log('----------------------FIND ME HERE===================')
            const token = await authService.getToken(phoneNumber);

            if (token) {
                res.status(200).json({
                    token,
                    phoneNumber: Number(phoneNumber),
                    userexists: true,
                    tokenExpiration: '24 hrs',
                });
            }
        } catch (error) {
            console.log('-------------------------------', error);
            res.send(error);
            // throw error('somethng went wrong...')
        }
    },
}

module.exports = authTokenController;