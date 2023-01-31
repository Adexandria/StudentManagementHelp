require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery',true);
const secret = process.env['MONGO_URL'];
console.log('Connecting to MongoDB...');
mongoose.connect(secret, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('Connected to MongoDB');

const Schema = mongoose.Schema;
const StudentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
});

const Student = mongoose.model("JoyStudents",StudentSchema);
console.log("Model created");
exports.Student = Student;