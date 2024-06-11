/* DT207G - Backend-baserad webbutveckling
 * Moment 1
 * Linn Eriksson, VT24
 */

//Variables and dependecies
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const mysql = require("mysql2");
require("dotenv").config();

//Views, public files and beeing able to use form-data.
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

//Connect to database
const connect = mysql.createConnection ({
    host: process.env.DBHOST,
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE
});

//Route index-page
app.get("/", (req, res) => {
    //Read courses from db.
    connect.query("SELECT * FROM `courses`", (error, result)=> {
        if(error){
            res.render("index", {
                title: "Startsida",
                message: "Något gick fel när kurserna skulle läsas ut."
            });
        } else {
            res.render("index", {
                title: "Startsida",
                message: "Här nedanför listas tillagda kurser, kurskoden länkar till kursplanen.",
                courses: result
            });
        }
    });
});

//Route about-page
app.get("/about", (req, res) => {
    res.render("about", {
        title: "Om mig"
    });
});

//Route addcourses-page
app.get("/addcourse", (req, res) => {
    res.render("addcourse", {
        title: "Lägg till kurs",
        response: ""
    });
});

//Make the form on addcourses work.
app.post("/addcourse", async(req, res) => {
    const course_code = req.body.course_code.toUpperCase();
    const course_name = req.body.course_name;
    const course_link = "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/" + course_code;
    const progression = req.body.progression.toUpperCase();

    //Making SQL-query to add course to database.
    await connect.promise()
        .query(`INSERT INTO courses VALUES(?, ?, ?, ?, ?, ?)`, [
            null,
            course_code,
            course_name,
            course_link,
            progression,
            null 
        ])
        
    res.redirect("/");
});

//Running server
app.listen(port, ()=> {
    console.log("Server started on port " + port);
});