require('dotenv').config();
const { connection } = require('./src/Config/Connection');
const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const cors = require('cors')
app.use(express.json());
app.use(cors())

const registerRoute = require('./src/Routes/VerrifyRegister');
app.use('/api/register', registerRoute);

const checkUser = require('./src/DAO/checkExistDAO');
app.use('/api', checkUser);

app.get('/', (req, res) => {
    res.send('Hello HTTPS!');
});
// Đọc chứng chỉ
const options = {
    key: fs.readFileSync('cert/key.pem'),
    cert: fs.readFileSync('cert/cert.pem')
};



(async () => {
    try {
        await connection();
        console.log("connected")
        const port = process.env.port
        https.createServer(options, app).listen(port, () => {
            console.log('Server chạy HTTPS tại https://localhost:' + port);
        });
    }
    catch (err) {
        throw err;
    }
})();
