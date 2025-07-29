//khi voucher đi xuống
//1 : check có tồn tại không, có được người dùng sử dụng chưa ?
//2 : check có được sử dụng trong khoảng thời gian này không ? ràng buộc troing sql
//3 : check có được sử dụng cho khóa học này không ? tạo 2 query, 1 query lấy voucher từ giảng viên , 1 query lấy voucher từ hệ thống
// nếu có trong hệ thống thì trả về còn không thì trả về của giảng  viên còn không nữa thì trả về không có voucher.

const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { connection } = require('../../Config/Connection');
router.get('/GetVoucher', async (req, res) => {
    const voucherId = req.query.id;
    try {
        await connection(); // connect DB
        const result = await sql.query`SELECT * FROM Voucher WHERE voucher_id = ${voucherId}`;

        if (result.recordset.length > 0) {
            res.status(200).json({ success: true, voucher: result.recordset[0] });
        } else {
            res.status(404).json({ success: false, message: "Voucher not found" });
        }
    } catch (err) {
        console.error('Error fetching voucher:', err);
        res.status(500).json({ error: 'Server error' });
    }
});