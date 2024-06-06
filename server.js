/* DT207G - Backend-baserad webbutveckling
 * Moment 1
 * Linn Eriksson, VT24
 */

const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
const port = process.env.port || 4000;

//Route index-page
app.get("/", (req, res) => {
    res.render("index", {
        title: "Startsida"
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
        title: "Lägg till kurs"
    });
});

app.listen(port, ()=> {
    console.log("Server started on port " + port);
});