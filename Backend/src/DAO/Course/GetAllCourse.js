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
router.get('/GetCourseById/:id', async (req, res) => {
    const courseId = req.params.id;
    try {
        await connection(); // connect DB
        const result = await sql.query`SELECT * FROM Course WHERE course_id = ${courseId}`;
        if (result.recordset.length > 0) {
            res.status(200).json({ success: true, course: result.recordset[0] });
        } else {
            res.status(404).json({ success: false, message: "Course not found" });
        }
    } catch (err) {
        console.error('Error fetching course by ID:', err);
        res.status(500).json({ error: 'Server error' });
    }
});
router.post('/GetCoursesByIds', async (req, res) => {
    const courseIds = req.body.ids;
    console.log("ids : ", req.body);
    if (courseIds.length === 0) {
        return res.status(400).json({ success: false, message: "No course IDs provided" });
    }

    try {
        await connection(); // connect DB
        const placeholders = courseIds.map((_, i) => `@id${i}`).join(', ');
        const inputParams = courseIds.reduce((acc, id, i) => {
            acc[`id${i}`] = id;
            return acc;
        }, {});

        const request = new sql.Request();
        Object.entries(inputParams).forEach(([key, value]) => {
            request.input(key, sql.VarChar, value);
        });

        const query = `SELECT * FROM Course WHERE course_id IN (${placeholders})`;
        const result = await request.query(query);


        if (result.recordset.length > 0) {
            res.status(200).json({ success: true, courses: result.recordset });
        } else {
            res.status(404).json({ success: false, message: "No courses found for the provided IDs" });
        }
    } catch (err) {
        console.error('Error fetching courses by IDs:', err);
        res.status(500).json({ error: 'Server error' });
    }





});




router.get('/GetAllBuyedCourses/:id', async (req, res) => {
    const UserId = req.params.id;

    try {
        await connection(); // connect mỗi lần
        const request = new sql.Request();
        request.input('UserId', sql.VarChar, UserId);

        const result = await request.query('SELECT * FROM Enrollments WHERE student_id = @UserId');

        if (result.recordset.length === 0) {
            return res.status(404).json({ success: false, message: "No enrollments found" });
        }

        const courseIds = result.recordset.map(e => e.course_id);

        // Chuẩn bị input động cho truy vấn
        const request2 = new sql.Request();
        courseIds.forEach((id, index) => {
            request2.input(`id${index}`, sql.VarChar, id);
        });

        const placeholders = courseIds.map((_, index) => `@id${index}`).join(',');

        const query = `SELECT * FROM Course WHERE course_id IN (${placeholders})`;
        const resultCourses = await request2.query(query);

        res.status(200).json({
            success: true,
            courses: resultCourses.recordset
        });

    } catch (err) {
        console.error('Error fetching enrolled courses:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;