const Student = require('../Model/student.js').Student;
const GetAllStudents = (done)=>
{
    Student.find((err,data)=>
    {
        if(err) return err;
         done(null,data);
    });
};
const CreateStudent = (newstudent,done)=>{

    Student.create(newstudent,(err,data)=>
    {
        if(err) return err;
         done(null,data);
    });
};
const GetStudentById=(id,done)=>{

    Student.findById(id,(err,data)=>
    {
        if(err) return err;
         done(null,data);
    });
};
const UpdateStudentById=(id,student,done)=>{

    Student.updateOne({ _id:id},{ $set : student},(err,data)=>{
        if(err) return err;
            done(null,data);
    });
};
const DeleteStudentById=(id,done)=>{
    Student.findByIdAndRemove(id,(err,data)=>{
        if(err) return err;
        done(null,data);
    });
};

exports.GetAllStudents = GetAllStudents;
exports.CreateStudent = CreateStudent;
exports.GetStudentById = GetStudentById;
exports.UpdateStudentById = UpdateStudentById;
exports.DeleteStudentById = DeleteStudentById;
