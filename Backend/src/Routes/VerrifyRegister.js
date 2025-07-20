const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const transporter = require('../Utils/Mailer');
const bcrypt = require('bcrypt');
require('dotenv').config();
const User = require('../Models/Users');
const UserDao = require('../DAO/InsertUserDAO');
const crypto = require('crypto');

router.post('/', async (req, res) => {
    const { email, password, gender, DOB, role } = req.body;

    const salt = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
    const passWithSalt = password + salt;

    // 1. Hash mật khẩu
    // const hashedPassword = await bcrypt.hash(passWithSalt, 10);
    const hashedPassword = crypto.createHash('sha256').update(passWithSalt).digest('hex');
    console.log("regis " + hashedPassword)
    // //test luu
    // await verifyUserEmail(email, { gender, DOB, salt, role, password });


    // 3. Tạo token xác minh
    const token = jwt.sign({ email, gender, DOB, salt, role, password: hashedPassword }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // 4. Gửi mail xác minh
    const portReact = process.env.port_React;
    const verifyUrl = `http://localhost:${portReact}/verify?token=${token}`;
    await transporter.sendMail({
        to: email,
        subject: 'Xác minh email',
        html: `<p>Nhấn vào đây để xác minh: <a href="${verifyUrl}">Verify Email</a></p>`
    });

    res.json({ message: 'Vui lòng kiểm tra email để xác minh.' });
});
router.get('/verify-email', async (req, res) => {
    const { token } = req.query;
    try {
        // const decoded = jwt.verify(token,process.env.JWT_SECRET ); 
        //      const email = decoded.email;
        const { email, gender, DOB, salt, role, password } = jwt.verify(token, process.env.JWT_SECRET);


        // Cập nhật user là đã xác minh
        await verifyUserEmail(email, { gender, DOB, salt, role, password }); // custom function update isVerified=true

        res.json({ success: true, message: 'Xác minh thành công.' });
    } catch (err) {
        res.status(400).json({ success: false, message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }
});
const verifyUserEmail = async (email, userData) => {
    let id = "none"
    if (userData.role === "Student") {
        id = "ST" + Math.floor(Math.random() * 0xFFFFFFFF).toString(16).padStart(8, '0');
    }
    if (userData.role === "Instructor") {
        id = "IN" + Math.floor(Math.random() * 0xFFFFFFFF).toString(16).padStart(8, '0');
    }


    const today = new Date().toISOString().split('T')[0];  // YYYY-MM-DD


    const newUser = new User(id, email,
        userData.password,
        userData.gender,
        userData.DOB,
        userData.salt,
        today,
        userData.role,

        "true");

    await UserDao.insert(newUser);




}
module.exports = router;