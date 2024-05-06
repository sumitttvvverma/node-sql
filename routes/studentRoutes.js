const express = require('express');
const { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require('../controllers/studentControllers');

//router object
const router = express.Router();

//GET ALL STUDENTS LIST || GET
router.route('/getAll').get(getStudents);

//GET STUDENT BY ID
router.route("/get/:id").get(getStudentById)

//CREATE STUDENT || POST
router.route("/create").post(createStudent)

//UPDATE STUDENT || UPDATE
router.route("/update/:id").patch(updateStudent)

//DELETE STUDENT || DELETE
router.route("/delete/:id").delete(deleteStudent)

module.exports=router;