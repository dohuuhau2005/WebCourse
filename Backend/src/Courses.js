// Backend/src/Routes/Courses.js
const express = require('express');
const router = express.Router();
let courses = []; // hoặc dùng DB

router.post('/api/courses', (req, res) => {
  const { name, desc, date } = req.body;
  const newCourse = { name, desc, date };
  courses.push(newCourse);
  res.json({ success: true, course: newCourse });
});

module.exports = router;