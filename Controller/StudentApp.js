//Import modules
const GetAllStudents = require('../Repository/StudentRepository').GetAllStudents;
const CreateStudent = require('../Repository/StudentRepository').CreateStudent;
const GetStudentById = require('../Repository/StudentRepository').GetStudentById;
const UpdateStudentById = require('../Repository/StudentRepository').UpdateStudentById;
const DeleteStudentById = require('../Repository/StudentRepository').DeleteStudentById;
const SendMail = require('../Repository/StudentRepository').SendMail;

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

/**
 * @swagger
 * components:
 *  schemas:
 *    Parent:
 *      type: object
 *      required:
 *        - name
 *        - phonenumber
 *        - address
 *      properties:
 *        id:
 *          type: integer
 *          description: The Auto-generated id of a parent
 *        name:
 *          type: string
 *          description: name of the parent
 *        phonenumber:
 *          type: string
 *          description: phonenumber of the parent
 *        address: 
 *          type: string
 *          description: address of the parent   
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a student
 *         name:
 *           type: string
 *           description: name of the student
 *         password:
 *           type: string
 *           description: password of the student
 *         email:
 *           type: string
 *           description: email of the student
 *         
 *       example:
 *         name : Adeola
 *         password: Wuraola
 *         email : Aderibigbe@gmail.com
 *
 *
 */

/**
 * @swagger
 * tags:
 *  name: Students
 *  description: University Students
 */

/**
 * @swagger
 * /api/students:
 *  get:
 *     summary: Returns all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: the list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */   
router.get('/api/students', (req, res) => {
    GetAllStudents((err,data)=>{
        if(err)
        {
            res.status(500).send(err);
        }
        res.json(data);
    })
});

/**
 * @swagger
 * /api/students/{id}:
 *  get:
 *     summary: Returns a student by id
 *     tags: [Students]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of student
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: the student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       404:
 *         description: student not found
 *       500:
 *         description: Some server error
 */   
router.get('/api/students/:id', (req, res) => {
    var id = req.params.id;
    GetStudentById(id,(err,data)=>{
        if(err) 
        {
            res.status(500).send(err);
        }
        if(!data) res.status(404).send('Not found');
        res.json(data);
    });
});


/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Created successfully
 *       500:
 *         description: Some server error
 */

router.post('/api/students',(req,res)=>{
    var student = req.body;
    CreateStudent(student,(err)=>{
        if(err)  
        {
            res.status(500).send(err);
        }
        res.send("Created successfully");
    });
});

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update an existing student
 *     tags: [Students]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of student
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Updated successfully
 *       500:
 *         description: Some server error
 */

router.put('/api/students/:id',(req,res)=>{
    var id = req.params.id;
    var student = req.body;
    UpdateStudentById(id,student,(err)=>{
        if(err) 
        {
            res.status(500).send(err);
        }
        res.send("Updated successfully");
    });
});

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete an existing student
 *     tags: [Students]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of student
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       500:
 *         description: Some server error
 */
router.delete('/api/students/:id',(req,res)=>{
    var id = req.params.id;
    DeleteStudentById(id,(err)=>{
        if(err) 
        {
            res.status(500).send(err);
        }
        res.send("Deleted successfully");
    });
});

router.post("/api/mail",(req,res)=>{
    var data =  req.body;
    SendMail(data,(err)=>{
        if(err){
            res.status(500).send(err);
        }
        res.send("Mail sent");
    })
})
exports.router = router;