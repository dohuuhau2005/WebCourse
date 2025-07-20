const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { connection } = require('../Config/Connection');

router.get('/check-email', async (req, res) => {
    const { email } = req.query;

    try {
        await connection(); // connect DB
        const result = await sql.query`SELECT * FROM Users WHERE email = ${email}`;

        if (result.recordset.length > 0) {
            res.json({ exists: true, message: "Email đã tồn tại." });
        } else {
            res.json({ exists: false });
        }
    } catch (err) {
        console.error('Lỗi kiểm tra email:', err);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

module.exports = router;
