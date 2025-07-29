const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { connection } = require('../../Config/Connection');
const crypto = require('crypto');
router.get('/GetUserByID/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        await connection(); // connect DB
        const result = await sql.query`SELECT * FROM Users WHERE id_user = ${userId}`;

        if (result.recordset.length > 0) {
            res.status(200).json({ success: true, user: result.recordset[0] });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (err) {
        console.error('Error fetching user by ID:', err);
        res.status(500).json({ error: 'Server error' });
    }
});
router.post('/ChangeProfile', async (req, res) => {
    const email = req.body.email;
    const userId = req.body.id;
    const password = req.body.password;
    const gender = req.body.gender;
    const DOB = req.body.DOB;
    const salt = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
    const passWithSalt = password + salt;

    // 1. Hash mật khẩu
    // const hashedPassword = await bcrypt.hash(passWithSalt, 10);
    const hashedPassword = crypto.createHash('sha256').update(passWithSalt).digest('hex');
    try {

        await connection(); // connect DB
        const field = []
        const values = [];
        if (email) {
            field.push('email = @email');
            values.push({ name: 'email', type: sql.VarChar, value: email });
        }
        //   id_user VARCHAR(10),
        //         email VARCHAR(255) UNIQUE,
        // password TEXT,
        // salt VARCHAR(10),
        // gender VARCHAR(10),
        // DOB DATE,
        if (password) {
            field.push('password = @password');
            values.push({ name: 'password', type: sql.Text, value: hashedPassword });
            field.push('salt = @salt');
            values.push({ name: 'salt', type: sql.VarChar, value: salt });
        }
        if (gender) {
            field.push('gender = @gender');
            values.push({ name: 'gender', type: sql.VarChar, value: gender });
        }
        if (DOB) {
            field.push('DOB = @DOB');
            values.push({ name: 'DOB', type: sql.Date, value: DOB });
        }
        if (field.length === 0) {
            return res.status(400).json({ success: false, message: "No fields to update" });
        }
        const query = `UPDATE Users SET ${field.join(', ')} WHERE id_user = @id_user`;
        const request = new sql.Request();
        request.input('id_user', sql.VarChar, userId);

        values.forEach(({ name, type, value }) => {
            request.input(name, type, value);
        });
        const result = await request.query(query);
        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ success: true, message: "User profile updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "User not found or no changes made" });
        }

    }
    catch (err) {
        console.error('Error updating user profile:', err);
        res.status(500).json({ error: 'Server error', success: false });
    }

});
module.exports = router;