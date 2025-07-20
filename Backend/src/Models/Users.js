class User {

    constructor(id, email, password, gender, DOB, salt, registerDate, role, isverified) {
        this._id = id;
        this._email = email;
        this._password = password;
        this._salt = salt;
        this._registerDate = registerDate;
        this._role = role;
        this._isVerified = isverified;
        this._gender = gender;
        this._DOB = DOB;

    }
}
module.exports = User;