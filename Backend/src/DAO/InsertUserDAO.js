const sql = require('mssql');
const db = require('../Config/Connection');

const UserDao = {
    insert: async (user) => {
        try {
            await db.connection(); // đảm bảo đã kết nối

            const request = new sql.Request();

            request.input('id_user', sql.VarChar, user._id);
            request.input('email', sql.VarChar, user._email);
            request.input('password', sql.VarChar, user._password);
            request.input('gender', sql.VarChar, user._gender);
            request.input('DOB', sql.Date, user._DOB);
            request.input('salt', sql.VarChar, user._salt);
            request.input('registerDate', sql.Date, user._registerDate);
            request.input('role', sql.VarChar, user._role);
            request.input('isVerified', sql.VarChar, user._isVerified);

            const sqlQuery = `
                INSERT INTO Users (id_user, email, password, gender, DOB, salt, registerDate, role, isVerified)
                VALUES (@id_user, @email, @password, @gender, @DOB, @salt, @registerDate, @role, @isVerified)
            `;

            await request.query(sqlQuery);
        } catch (err) {
            console.error('Lỗi khi insert user:', err);
            throw err;
        }
    }
};

module.exports = UserDao;
