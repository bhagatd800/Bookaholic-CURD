var mongoose = require('mongoose');

// User Schema
var StudentSchema = mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    lastName: {
        type: String
    },
    studentId: {
        type:String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    }
});

var studentData = module.exports = mongoose.model('studentData', StudentSchema);

module.exports.addData = function (newData, callback) {
    console.log(newData);
    
    studentData.update({ "studentId":newData.studentId},{$set:newData},{ upsert: true },callback);
}

module.exports.getStudentData = function (data, callback) {
    console.log(data);
    
    studentData.find({"studentId":data},callback);
}

module.exports.deleteStudentData = function (data, callback) {
    console.log(data);
    
    studentData.remove({"studentId":data},callback);
}
