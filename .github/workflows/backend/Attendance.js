const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  studentId: String,
  name: String,
  date: { type: Date, default: Date.now },
  status: String
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
