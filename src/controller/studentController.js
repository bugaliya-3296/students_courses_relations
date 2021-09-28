const express = require('express');
const jwt = require('jsonwebtoken');
const qs = require('stringify');
const {studentService} = require('../service')
const app = express();
const stringify = require('json-stringify-safe');


const userController = {
    addstudent: async (req, res, next) => {
    try {
      const result = await studentService.addNewStudent(req)
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Internal Server ' + error);
    }
  },
  getingStudentsData: async (req, res) => {
    try {
      const result = await studentService.getAllStudents(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Internal Server ' + error);
    }
  },
  updateStudentDetails: async (req, res) => {
    try {
      const mobile = req.query.phone;
      const result = await studentService.updateStudentInfo(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Internal Server ' + error);
    }
  },
  deleteStudentInfo: async (req, res) => {
    try {
      const mobile = req.query.phone;
      const result = await studentService.deleteStudentDetails(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Internal Server ' + error);
    }
  },
  getingStudentData: async (req, res) => {
    try {
      const mobile = req.query.mobile;
      const result = await studentService.userInfo(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Internal Server ' + error);
    }
  },
  getStudents: async (req, res, next) => {
    try {
      const result = await studentService.getingStudents(req)
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Internal Server ' + error);
    }
  },
  getStudentsCourseList: async (req, res) => {
    try {
      const result = await studentService.courseList(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Internal Server ' + error);
    }
  },

}

module.exports = userController;
