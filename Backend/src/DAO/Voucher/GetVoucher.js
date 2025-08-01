//khi voucher đi xuống
//1 : check có tồn tại không, có được người dùng sử dụng chưa ?
//2 : check có được sử dụng trong khoảng thời gian này không ? ràng buộc troing sql
//3 : check có được sử dụng cho khóa học này không ? tạo 2 query, 1 query lấy voucher từ giảng viên , 1 query lấy voucher từ hệ thống
// nếu có trong hệ thống thì trả về còn không thì trả về của giảng  viên còn không nữa thì trả về không có voucher.

const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { connection } = require('../../Config/Connection');
router.post('/GetDiscount', async (req, res) => {
    const { voucherId, courseID } = req.body;
    console.log("body", req.body);
    try {
        await connection(); // connect DB
        const result = await sql.query`SELECT * FROM Course WHERE RTRIM(voucher_id) = ${voucherId} and RTRIM(course_id) = ${courseID}`;
        console.log(courseID);
        console.log(voucherId);
        console.log("result", result.recordset);
        if (result.recordset.length > 0) {
            const GetDiscountFromCourseInstructor = await sql.query`SELECT discount FROM Voucher WHERE RTRIM(voucher_id) = ${voucherId} `;
            console.log("GetDiscountFromCourseInstructor", GetDiscountFromCourseInstructor.recordset[0].discount);
            return res.status(200).json({ success: true, discount: GetDiscountFromCourseInstructor.recordset[0].discount });
        } else {
            const result2 = await sql.query`SELECT * FROM Voucher_Detail WHERE RTRIM(SystemVoucher_id) = ${voucherId} and RTRIM(course_id) = ${courseID}`;
            if (result2.recordset.length > 0) {
                const GetDiscountFromSystem = await sql.query`SELECT discount FROM SystemVoucher WHERE RTRIM(Systemvoucher_id) = ${voucherId} `;
                console.log("GetDiscountFromSystem", GetDiscountFromSystem.recordset[0].discount);
                return res.status(200).json({ success: true, discount: GetDiscountFromSystem.recordset[0].discount });
            } else {
                console.log("Voucher not found for this course");
                return res.status(404).json({ success: false, message: "Voucher not found for this course" });
            }

        }

        //     const result = await sql.query`SELECT discount FROM Voucher WHERE voucher_id = ${voucherId} and course_id = ${courseID}`;


    } catch (err) {
        console.error('Error fetching voucher:', err);
        res.status(500).json({ error: 'Server error' });
    }
});
module.exports = router;