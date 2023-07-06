const Student = require('../Model/student.js').Student;
const superagent = require('superagent');
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

const SendMail = async (data) =>{
try{
    const {body} = await superagent.post('https://cyphercrescent-email-service.azurewebsites.net/api/mail')
    .send(data)
    console.log(body)
}catch(err){
    console.error(err)
}
};
exports.GetAllStudents = GetAllStudents;
exports.CreateStudent = CreateStudent;
exports.GetStudentById = GetStudentById;
exports.UpdateStudentById = UpdateStudentById;
exports.DeleteStudentById = DeleteStudentById;
exports.SendMail = SendMail;
