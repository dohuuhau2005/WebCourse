const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { connection } = require('../../Config/Connection');

router.get('/GetAllCourses', async (req, res) => {
    try {
        await connection(); // connect DB
        const result = await sql.query`SELECT * FROM Course`;

        if (result.recordset.length > 0) {
            res.status(200).json({ success: true, courses: result.recordset });
        } else {
            res.status(404).json({ success: false, message: "No courses found" });
        }
    } catch (err) {
        console.error('Error fetching courses:', err);
        res.status(500).json({ error: 'Server error' });
    }
});
router.get('/SpecificialCourses', async (req, res) => {
    const courseType = req.query.Type;
    try {
        await connection(); // connect DB
        const result = await sql.query`SELECT * FROM Course WHERE Type LIKE ${'%' + courseType + '%'}`;
        if (result.recordset.length > 0) {
            res.status(200).json({ success: true, courses: result.recordset });
        } else {
            res.status(404).json({ success: false, message: "Course not found" });
        }
    } catch (err) {
        console.error('Error fetching course by ID:', err);
        res.status(500).json({ error: 'Server error' });
    }

});

module.exports = router;