const express = require('express');
const jwt = require('jsonwebtoken');
const qs = require('stringify');
// const userService = require('../service/userService')
const app = express();
const stringify = require('json-stringify-safe');


const userController = {
  addUser: async (req, res, next) => {
    try {
      const result = await userService.addNewUser(req)
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Internal Server ' + error);
    }
  },
  getingAllUserData: async (req, res) => {
    try {
      const result = await userService.getAllUser(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Internal Server ' + error);
    }
  },
  updateDetails: async (req, res) => {
    try {
      const mobile = req.query.phone;
      const result = await userService.updateUserDetails(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Internal Server ' + error);
    }
  },
  deleteDetails: async (req, res) => {
    try {
      const mobile = req.query.phone;
      const result = await userService.deleteUserDetails(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Internal Server ' + error);
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const mobile = req.query.phone;
      const result = await userService.userInfo(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Internal Server ' + error);
    }
  },

}

module.exports = userController;
