const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Attendance = require('./Attendance');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/attendance');

app.post('/attendance', async (req, res) => {
  const data = new Attendance(req.body);
  await data.save();
  res.send(data);
});

app.get('/attendance', async (req, res) => {
  const data = await Attendance.find();
  res.send(data);
});

app.get('/attendance/:studentId', async (req, res) => {
  const data = await Attendance.find({ studentId: req.params.studentId });
  res.send(data);
});

app.listen(5000, () => console.log("Server running at 5000"));
