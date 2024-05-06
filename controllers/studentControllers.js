const db = require('../config/db');

//GET ALL STUDENTS LIST
getStudents=async(req,res)=>{      //http://localhost:4500/api/v1/student/getAll
    try {
        const data = await db.query("SELECT * FROM students");

        if(!data){
            return res.status(404).json({message:"No records Found"})
        }
        res.status(200).json({
            success:true,
            message:"ALL students Records",
            totalStudents:data[0].length,
            data:data[0]})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error occurs inALL students Records",
            error})
    }
}

//GET STUDENT BY ID 
const getStudentById=async(req,res)=>{      //http://localhost:4500/api/v1/student/get/1
    try {
        const studentId = req.params.id
        if(!studentId){
            return res.status(404).json({
                success:false,
                message:"invalid student Id",
            })
        }
        const data = await db.query("SELECT * FROM students WHERE id=?",[studentId]);

        if(!data){
            return res.status(404).json({
                success:false,
                message:"NO student by id API",
            })
        }
        res.status(200).json({
            success:true,
            studentDetails:data[0]
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in Get student by id API",
            error
        })
    }
}

//CREATE STUDENTS
const createStudent = async(req,res)=>{
    try {
        const {name,roll_no,fees,Class,medium}=req.body;
        if(!name|| !roll_no|| !fees || !Class || !medium){
            return res.status(500).json({
                success:false,
                message:"Please Provide all details",
            })   
        }
        const data=await db.query("INSERT INTO students (name,roll_no,fees,Class,medium) VALUES ( ?, ?, ?, ?, ?)",[name,roll_no,fees,Class,medium])
        if(!data){
            return res.status(404).json({
                success:false,
                message:"Error Insert query NO student create",
            })
        }
        res.status(200).json({
            success:true,
            message:"New Student Created",
            studentDetails:data[0]
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in Create student API",
            error
        }) 
    }
}

//UPDATE STUDENT
const updateStudent=async(req,res)=>{
    try {
        const studentId = req.params.id;
        if(!studentId){
            return res.status(404).json({
                success:false,
                message:"invalid student Id",
            })
        }
        const {name,roll_no,fees,Class,medium}=req.body;
        const data = await db.query("UPDATE students SET name=?, roll_no=?, fees=?, Class=?, medium=? WHERE id=?",[name,roll_no,fees,Class,medium,studentId])
        if(!data){
            return res.status(404).json({
                success:false,
                message:"Error In update student",
            })
        }
        res.status(200).json({
            success:true,
            message:" Student Details updated ",
            studentDetails:data[0]
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in Update student API",
            error
        })  
    }
}

//DELETE STUDENT 
const deleteStudent = async(req,res)=>{
    try {
        const studentId = req.params.id;
        if(!studentId){
            return res.status(404).json({
                success:false,
                message:"invalid student Id",
            })
        }
        const data = await db.query("DELETE FROM students WHERE id=?",[studentId])
        res.status(200).json({
            success:true,
            message:" Student Deleted Successfully",
            studentDetails:data[0]
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in delete student API",
            error
        })  
    }
}


module.exports={ getStudents ,getStudentById , createStudent ,updateStudent,deleteStudent}