const express = require('express');
const jwt = require('jsonwebtoken');
const qs = require('stringify');
const {courseService} = require('../service')
const app = express();
const stringify = require('json-stringify-safe');


const userController = {
    addCourse: async (req, res, next) => {
    try {
      const result = await courseService.addNewCourse(req)
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Internal Server ' + error);
    }
  },
  getingCoursesData: async (req, res) => {
    try {
      const result = await courseService.getAllCourses(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Internal Server ' + error);
    }
  },
  updateCourseDetails: async (req, res) => {
    try {
      const mobile = req.query.phone;
      const result = await courseService.updateCourseInfo(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Internal Server ' + error);
    }
  },
  deleteCourseInfo: async (req, res) => {
    try {
      const mobile = req.query.phone;
      const result = await courseService.deleteCourseDetails(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Internal Server ' + error);
    }
  },
  getingCourseData: async (req, res) => {
    try {
      console.log('-------finrf me here agfter midelware')
      const mobile = req.query.courseId;
      const result = await courseService.userInfo(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Internal Server ' + error);
    }
  },
  registerCourse: async (req, res, next) => {
    try {
      const result = await courseService.takeCourse(req)
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Internal Server ' + error);
    }
  },
  getCourseStudentList: async (req, res, next) => {
    try {
      const result = await courseService.studentList(req)
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send('Internal Server ' + error);
    }
  }

}

module.exports = userController;
