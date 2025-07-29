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




-- ========================================
-- BẢNG Users
-- ========================================
-- CREATE TABLE Users (
--     user_id VARCHAR(20) PRIMARY KEY,
--     password VARCHAR(20) NOT NULL,
--     salt VARCHAR(12) NOT NULL,
--     email VARCHAR(100) NOT NULL UNIQUE CHECK (email LIKE '%@gmail.com'),
--     registrationDate DATE NOT NULL DEFAULT GETDATE(),
--     role VARCHAR(13) NOT NULL CHECK (role IN ('staff', 'student', 'instructor')),
--     isverified BIT NOT NULL DEFAULT 0
-- );

-- ========================================
-- BẢNG instructor
-- ========================================
CREATE TABLE instructor
(
    instructor_id VARCHAR(20) PRIMARY KEY,
    QuantityCourse INT NOT NULL DEFAULT 0,
    FOREIGN KEY (instructor_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- ========================================
-- BẢNG staff
-- ========================================
CREATE TABLE staff
(
    staff_id VARCHAR(20) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL,
    position VARCHAR(13) NOT NULL,
    FOREIGN KEY (staff_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- ========================================
-- BẢNG student
-- ========================================
CREATE TABLE student
(
    student_id VARCHAR(20) PRIMARY KEY,
    FOREIGN KEY (student_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- ========================================
-- BẢNG Course
-- ========================================
CREATE TABLE Course
(
    course_id VARCHAR(20) PRIMARY KEY,
    instructor_id VARCHAR(20),
    imageURL VARCHAR(MAX),
    title NVARCHAR(256),
    description NVARCHAR(256),
    OldPrice DECIMAL(10,3),
    NewPrice DECIMAL(10,3),
    createdDate DATE DEFAULT GETDATE(),
    Type VARCHAR(20),
    QualitiesLectures INT DEFAULT 0,
    -- FOREIGN KEY (instructor_id) REFERENCES instructor(instructor_id) ON DELETE SET NULL
);

INSERT INTO Course
    (course_id, instructor_id, imageURL,title, description, OldPrice, NewPrice, createdDate, Type, QualitiesLectures)
VALUES
    ('CS101', 'GV001', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191786/reactjsPerple_kclagh.png', N'Lập trình Java', N'Khóa học Java cơ bản', 2000000, 1800000, GETDATE(), 'CNTT', 10),
    ('CS102', 'GV001', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191785/ReactSystem_ghelnt.png' , N'Cơ sở dữ liệu', N'Học SQL từ cơ bản đến nâng cao', 1500000, 1350000, GETDATE(), 'CNTT', 8),
    ('CS103', 'GV001', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191785/ReactSystem_ghelnt.png', N'Lập trình Java', N'Khóa học Java cơ bản', 2000000, 1800000, GETDATE(), 'CNTT', 10),
    ('CS104', 'GV001', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191785/ReactSystem_ghelnt.png' , N'Cơ sở dữ liệu', N'Học SQL từ cơ bản đến nâng cao', 1500000, 1350000, GETDATE(), 'CNTT', 8),
    ('CS105', 'GV001', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191785/ReactWhite_q5vbuh.jpg', N'Lập trình Java', N'Khóa học Java cơ bản', 2000000, 1800000, GETDATE(), 'CNTT', 10),
    ('CS106', 'GV001', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191785/ReactBlue_wzbehi.png' , N'Cơ sở dữ liệu', N'Học SQL từ cơ bản đến nâng cao', 1500000, 1350000, GETDATE(), 'CNTT', 8),
    ('CS107', 'GV001', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191785/reactlaptop_uuo3tw.jpg', N'Lập trình Java', N'Khóa học Java cơ bản', 2000000, 1800000, GETDATE(), 'CNTT', 10),
    ('CS1022', 'GV001', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191784/React_qoh5pc.png' , N'Cơ sở dữ liệu', N'Học SQL từ cơ bản đến nâng cao', 1500000, 1350000, GETDATE(), 'CNTT', 8),
    ('CS1023', 'GV001', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191784/pngreact_iku0nn.png', N'Lập trình Java', N'Khóa học Java cơ bản', 2000000, 1800000, GETDATE(), 'CNTT', 10),
    ('CS1024', 'GV001', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191785/ReactWhite_q5vbuh.jpg' , N'Cơ sở dữ liệu', N'Học SQL từ cơ bản đến nâng cao', 1500000, 1350000, GETDATE(), 'CNTT', 8),
    ('CS1025', 'GV001', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191785/ReactSystem_ghelnt.png', N'Python Cơ Bản', N'Khóa học lập trình Python từ cơ bản đến nâng cao', 1800000, 1620000, GETDATE(), 'CNTT', 12),
    -- 2
    ('CS108', 'GV002', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191785/reactlaptop_uuo3tw.jpg', N'Thiết kế Web', N'Học HTML, CSS, JavaScript để thiết kế web chuyên nghiệp', 1700000, 1530000, GETDATE(), 'CNTT', 15),
    -- 3
    ('CS109', 'GV001', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191784/React_qoh5pc.png', N'Lập trình C++', N'Học ngôn ngữ lập trình C++ từ cơ bản đến OOP', 1600000, 1440000, GETDATE(), 'CNTT', 11),
    -- 4
    ('CS110', 'GV003', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191784/pngreact_iku0nn.png', N'Node.js và Express', N'Thiết kế backend với Node.js và ExpressJS', 1900000, 1710000, GETDATE(), 'CNTT', 14),
    -- 5
    ('CS111', 'GV002', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753183067/cld-sample-4.jpg', N'Phát triển ứng dụng Android', N'Lập trình Android bằng Java và Kotlin', 2000000, 1800000, GETDATE(), 'CNTT', 9),
    -- 6
    ('CS112', 'GV001', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191785/ReactBlue_wzbehi.png', N'Lập trình ReactJS', N'Xây dựng giao diện web hiện đại với ReactJS', 1700000, 1530000, GETDATE(), 'CNTT', 13),
    -- 7
    ('CS113', 'GV003', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191785/ReactWhite_q5vbuh.jpg', N'Lập trình Web Fullstack', N'Fullstack với MERN Stack: MongoDB, Express, React, Node', 2200000, 1980000, GETDATE(), 'CNTT', 10),
    -- 8
    ('CS114', 'GV002', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191785/ReactSystem_ghelnt.png', N'Cấu trúc dữ liệu & Giải thuật', N'Nắm vững cấu trúc dữ liệu và thuật toán lập trình', 1800000, 1620000, GETDATE(), 'CNTT', 12),
    -- 9
    ('CS115', 'GV001', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191784/React_qoh5pc.png', N'Java nâng cao', N'Lập trình hướng đối tượng, đa luồng, JDBC trong Java', 2000000, 1800000, GETDATE(), 'CNTT', 16),
    -- 10
    ('CS116', 'GV002', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191785/reactlaptop_uuo3tw.jpg', N'Firebase toàn tập', N'Tích hợp Firebase Authentication, Database, Storage', 1600000, 1440000, GETDATE(), 'CNTT', 8),
    -- 11
    ('CS117', 'GV003', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753183067/cld-sample-4.jpg', N'Thiết kế UI/UX', N'Cơ bản về UI/UX, công cụ Figma, thiết kế trải nghiệm người dùng', 1500000, 1350000, GETDATE(), 'Design', 7),
    -- 12
    ('CS118', 'GV001', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191785/ReactWhite_q5vbuh.jpg', N'Lập trình Spring Boot', N'Tạo backend API mạnh mẽ với Spring Boot', 1900000, 1710000, GETDATE(), 'CNTT', 11),
    -- 13
    ('CS119', 'GV003', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191785/ReactSystem_ghelnt.png', N'Lập trình Game Unity', N'Khóa học lập trình game 2D & 3D với Unity', 2100000, 1890000, GETDATE(), 'GameDev', 10),
    -- 14
    ('CS120', 'GV002', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753191784/pngreact_iku0nn.png', N'Thiết kế API RESTful', N'Học thiết kế API RESTful chuẩn và bảo mật', 1600000, 1440000, GETDATE(), 'CNTT', 13),
    -- 15
    ('CS121', 'GV001', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753183067/cld-sample-4.jpg', N'Lập trình Kotlin', N'Ngôn ngữ Kotlin cho Android và backend', 1800000, 1620000, GETDATE(), 'CNTT', 9);
INSERT INTO Course
    (course_id, instructor_id, imageURL,title, description, OldPrice, NewPrice, createdDate, Type, QualitiesLectures)
VALUES
    ('CS123', 'GV001', 'https://res.cloudinary.com/dxa5bvsdq/image/upload/v1753183067/cld-sample-4.jpg', N'<h1> test </h1>', N'Ngôn ngữ Kotlin cho Android và backend', 1800000, 1620000, GETDATE
(), 'CNTT', 9);

SELECT *
FROM Course
WHERE Type like N'CNTT';
SELECT *
FROM Course
WHERE course_id = 'cs118'











-- ========================================
-- BẢNG Voucher
-- ========================================
CREATE TABLE Voucher
(
    voucher_id VARCHAR(10) PRIMARY KEY,
    instructor_id VARCHAR(20) NOT NULL,
    course_id VARCHAR(20) NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    discount INT NOT NULL CHECK (discount >= 0 AND discount <= 100),
    expiryDate DATE NOT NULL,
    startDate DATE NOT NULL,
    description NVARCHAR(MAX) NULL,
    FOREIGN KEY (instructor_id) REFERENCES instructor(instructor_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE
);

-- ========================================
-- BẢNG SystemVoucher
-- ========================================
CREATE TABLE SystemVoucher
(
    Systemvoucher_id VARCHAR(10) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    discount INT NOT NULL CHECK (discount >= 0 AND discount <= 100),
    expiryDate DATE NOT NULL,
    startDate DATE NOT NULL
);

-- ========================================
-- BẢNG Voucher_Detail
-- ========================================
CREATE TABLE Voucher_Detail
(
    id_Voucher_detail VARCHAR(20) PRIMARY KEY,
    SystemVoucher_id VARCHAR(10) NOT NULL,
    course_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (SystemVoucher_id) REFERENCES SystemVoucher(Systemvoucher_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE
);

-- ========================================
-- BẢNG Enrollments
-- ========================================
CREATE TABLE Enrollments
(
    enrollment_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    course_id VARCHAR(20) NOT NULL,
    enrollmentDate DATE NOT NULL DEFAULT GETDATE(),
    voucher_id VARCHAR(10),
    pricePaid DECIMAL(10,3) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE,
    FOREIGN KEY (voucher_id) REFERENCES Voucher(voucher_id) ON DELETE SET NULL
);

-- ========================================
-- BẢNG Payments
-- ========================================
CREATE TABLE Payments
(
    id_Payment VARCHAR(20) PRIMARY KEY,
    enrollment_id INT NOT NULL,
    course_id VARCHAR(20) NOT NULL,
    Type NVARCHAR(20) NOT NULL,
    Price DECIMAL(10,3) NOT NULL,
    PaymentDate DATE NOT NULL DEFAULT GETDATE(),
    status VARCHAR(20),
    FOREIGN KEY (enrollment_id) REFERENCES Enrollments(enrollment_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE
);

-- ========================================
-- BẢNG Reports
-- ========================================
CREATE TABLE Reports
(
    report_id VARCHAR(10) PRIMARY KEY,
    course_id VARCHAR(20) NOT NULL,
    staff_id VARCHAR(20) NOT NULL,
    Descriptions NVARCHAR(200),
    FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE,
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id) ON DELETE CASCADE
);

-- ========================================
-- BẢNG Comment
-- ========================================
CREATE TABLE Comment
(
    comment_id VARCHAR(10) PRIMARY KEY,
    commentText NVARCHAR(200) NOT NULL,
    datePosted DATE NOT NULL DEFAULT GETDATE(),
    user_id VARCHAR(20) NOT NULL,
    course_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE
);

-- ========================================
-- BẢNG TextContent
-- ========================================
CREATE TABLE TextContent
(
    content_id VARCHAR(10) PRIMARY KEY,
    text NVARCHAR(200)
);

-- ========================================
-- BẢNG Lecture
-- ========================================
CREATE TABLE Lecture
(
    lecture_id INT IDENTITY(1,1) PRIMARY KEY,
    title VARCHAR(50),
    description VARCHAR(256),
    course_id VARCHAR(20) NOT NULL,
    content_id VARCHAR(10) NOT NULL,
    Status VARCHAR(8),
    FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE,
    FOREIGN KEY (content_id) REFERENCES TextContent(content_id) ON DELETE CASCADE
);

-- ========================================
-- BẢNG QuizContent
-- ========================================
CREATE TABLE QuizContent
(
    content_id VARCHAR(10) PRIMARY KEY,
    linkQuizz VARCHAR(MAX)
);

-- ========================================
-- BẢNG VideoContent
-- ========================================
CREATE TABLE VideoContent
(
    content_id VARCHAR(10) PRIMARY KEY,
    videoURL VARCHAR(MAX)
);

-- ========================================
-- INDEX bổ trợ
-- ========================================
CREATE INDEX IDX_Course_Instructor ON Course(instructor_id);
CREATE INDEX IDX_Enrollments_Student ON Enrollments(student_id);
CREATE INDEX IDX_Enrollments_Course ON Enrollments(course_id);
CREATE INDEX IDX_Voucher_Course ON Voucher(course_id);

-- ========================================
-- USERS
-- ========================================
INSERT INTO Users
    (user_id, password, salt, email, registrationDate, role, isverified)
VALUES
    ('GV001', 'pass123', 'salt1', 'gv001@gmail.com', GETDATE(), 'instructor', 1),
    ('ST001', 'pass234', 'salt2', 'st001@gmail.com', GETDATE(), 'staff', 1),
    ('HV001', 'pass345', 'salt3', 'hv001@gmail.com', GETDATE(), 'student', 1);

-- ========================================
-- INSTRUCTOR / STAFF / STUDENT
-- ========================================
INSERT INTO instructor
    (instructor_id, QuantityCourse)
VALUES
    ('GV001', 2);
INSERT INTO staff
    (staff_id, Name, position)
VALUES
    ('ST001', N'Nguyễn Văn A', 'Manager');
INSERT INTO student
    (student_id)
VALUES
    ('HV001');

-- ========================================
-- COURSE
-- ========================================
INSERT INTO Course
    (course_id, instructor_id, title, description, OldPrice, NewPrice, createdDate, Type, QualitiesLectures)
VALUES
    ('CS101', 'GV001', N'Lập trình Java', N'Khóa học Java cơ bản', 2000000, 1800000, GETDATE(), 'CNTT', 10),
    ('CS102', 'GV001', N'Cơ sở dữ liệu', N'Học SQL từ cơ bản đến nâng cao', 1500000, 1350000, GETDATE(), 'CNTT', 8);

-- ========================================
-- VOUCHER + SYSTEMVOUCHER + VOUCHER_DETAIL
-- ========================================
INSERT INTO Voucher
    (voucher_id, instructor_id, course_id, Name, discount, expiryDate, startDate, description)
VALUES
    ('VC001', 'GV001', 'CS101', N'Giảm 20% Java', 20, '2025-12-31', '2025-07-01', N'Dùng cho Java');

INSERT INTO SystemVoucher
    (Systemvoucher_id, Name, discount, expiryDate, startDate)
VALUES
    ('SV001', N'Giảm 30% toàn bộ', 30, '2025-12-31', '2025-07-01');

INSERT INTO Voucher_Detail
    (id_Voucher_detail, SystemVoucher_id, course_id)
VALUES
    ('VD001', 'SV001', 'CS101');

-- ========================================
-- ENROLLMENTS + PAYMENTS
-- ========================================
INSERT INTO Enrollments
    (student_id, course_id, enrollmentDate, voucher_id, pricePaid)
VALUES
    ('HV001', 'CS101', GETDATE(), 'VC001', 1600000);

INSERT INTO Payments
    (id_Payment, enrollment_id, course_id, Type, Price, PaymentDate, status)
VALUES
    ('PMT001', 1, 'CS101', N'Thanh toán online', 1600000, GETDATE(), 'Completed');

-- ========================================
-- REPORTS + COMMENT
-- ========================================
INSERT INTO Reports
    (report_id, course_id, staff_id, Descriptions)
VALUES
    ('RP001', 'CS101', 'ST001', N'Nội dung bài học bị lỗi link video.');

INSERT INTO Comment
    (comment_id, commentText, datePosted, user_id, course_id)
VALUES
    ('CMT001', N'Khóa học rất bổ ích', GETDATE(), 'HV001', 'CS101');

-- ========================================
-- CONTENT: TEXT, LECTURE, QUIZ, VIDEO
-- ========================================
INSERT INTO TextContent
    (content_id, text)
VALUES
    ('TC001', N'Nội dung bài giảng phần 1');

INSERT INTO Lecture
    (title, description, course_id, content_id, Status)
VALUES
    ('Giới thiệu Java', 'Bài học mở đầu', 'CS101', 'TC001', 'Active');

INSERT INTO QuizContent
    (content_id, linkQuizz)
VALUES
    ('TC001', 'https://quizlink.com/java-intro');

INSERT INTO VideoContent
    (content_id, videoURL)
VALUES
    ('TC001', 'https://videolink.com/java-intro.mp4');
