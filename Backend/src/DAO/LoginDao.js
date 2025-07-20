const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { connection } = require('../Config/Connection');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

router.post('/Login', async (req, res) => {
    const { email, password } = req.body;
    try {
        await connection(); // connect DB
        const result = await sql.query`SELECT * FROM Users WHERE email = ${email}`;

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            const salt = user.salt;
            const emailpassDB = String(user.password).trim();
            const role = user.role;
            const passWithSalt = password + salt;

            const hashedPassword = crypto.createHash('sha256').update(passWithSalt).digest('hex');
            console.log("passs" + password);
            console.log("dsadasdsadadada " + salt);



            console.log("hasssss" + hashedPassword);
            // const isMatch = await bcrypt.compare(passWithSalt, emailpassDB);


            console.log("hashedPassword:", hashedPassword, "length:", hashedPassword.length);
            console.log("fromDB:", emailpassDB, "length:", emailpassDB.length);

            for (let i = 0; i < hashedPassword.length; i++) {
                if (hashedPassword[i] !== emailpassDB[i]) {
                    console.log(`Mismatch at position ${i}: ${hashedPassword[i]} != ${emailpassDB[i]}`);
                    break;
                }
            }
            if (hashedPassword === emailpassDB) {
                console.log("khop nhaaaaaaaaaaaaaaaaaaaaa");
            }

            if (hashedPassword === emailpassDB) {
                return res.status(200).json({ success: true, message: "Đăng nhập thành công", user: { role: role } });
            } else {
                return res.status(401).json({ success: false, message: "Sai mật khẩu" });
            }


        } else {
            res.json({ exists: false });
        }
    } catch (err) {
        console.error('Lỗi kiểm tra email:', err);
        res.status(500).json({ error: 'Lỗi server' });
    }

});
module.exports = router;

