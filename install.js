const mysql = require("mysql2");

const connect = mysql.createConnection ({
    host: "localhost",
    user: "dt207g_m1",
    password: "password",
    database: "dt207g_m1"
});

//connect.query("CREATE TABLE courses(id INT(2) NOT NULL AUTO_INCREMENT, coursecode VARCHAR(8) NOT NULL, coursename VARCHAR(64) NOT NULL, syllabus VARCHAR(128) NOT NULL, progression CHAR(1) NOT NULL, time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))");

connect.execute(`INSERT INTO courses VALUES(?, ?, ?, ?, ?, ?)`, [
    null,
    'DT207G',
    'Backend-baserad webbutveckling',
    'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT207G',
    'B',
    null 
]);

connect.end();