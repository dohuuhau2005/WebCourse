CREATE DATABASE WebCourse
CREATE TABLE Users
(
    id_user VARCHAR(10),

    email VARCHAR(255) UNIQUE,
    password TEXT,
    salt VARCHAR(10),
    gender VARCHAR(10),
    DOB DATE,
    registerDate DATETIME,
    role VARCHAR(20),
    isVerified VARCHAR(6)
)
select *
from Users
delete Users WHERE email= 'dhhsvip@gmail.com'