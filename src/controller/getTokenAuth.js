const express = require('express');
const jwt = require('jsonwebtoken');

const userService = require('../service/userService')
const app = express();

const authToken = {
    getAuthToken: async (req, res, next) => {
        const taskType = 'generating token...';
        const phoneNumber = req.headers.phonenumber;
        try {
            if (phoneNumber.toString().length !== 10) {
                throw error('Please provide a valid phoneNumber number');
            }
            const token = userService.getToken(phoneNumber);

            if (token) {
                res.status(200).json({
                    token,
                    phoneNumber: Number(phoneNumber),
                    userexists: true,
                    tokenExpiration: '24 hrs',
                });
            }
        } catch (error) {
            res.send('somethng went wrong...');
            throw error('somethng went wrong...')
        }
    },
    validateUser: async (req, res, next) => {
        const bearerHeader = req.headers['authorization'];
        if (typeof (bearerToken) != 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerAuthToken = bearer[1];
            const decodedToken = jwt.verify(bearerAuthToken, 'privateKey', { expiresIn: '1d' });
            next();
        }
    },
    register: async (req, res, next) => {
        try {
            const token = await userService.signUp(req.body);

            if (token) {
                res.status(200).json({
                    token,
                    phoneNumber: Number(req.body.phone),
                    userexists: true,
                    tokenExpiration: '24 hrs',
                });
            }
        } catch (error) {
            console.log('---------------'+error);
            res.send('somethng went wrong...');
            throw error('somethng went wrong...')
        }
    },
}

module.exports = authToken;