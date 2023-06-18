/*********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Plinky Charmaine Asis Student ID: 129640223 Date: June 18, 2023
*
********************************************************************************/ 
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path");
var collegeData = require("./modules/collegeData");



collegeData.initialize()
    .then(() => {
        app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, "/views/home.html"));
        });
        
        app.get("/students", (req, res) => {
            collegeData.getAllStudents()
                .then((students) => {
                    if (req.query.course) {
                        collegeData.getStudentsByCourse(req.query.course)
                            .then((studentsByCourse) => {
                                res.json(studentsByCourse);
                            })
                            .catch((error) => {
                                res.status(404).json({ message: "no results" });
                            });
                    } else {
                        res.json(students);
                    }
                })
                .catch((error) => {
                    res.status(404).json({ message: "no results" });
                });
        });
        
        app.get("/tas", (req, res) => {
            collegeData.getTAs()
                .then((tas) => {
                    res.json(tas);
                })
                .catch((error) => {
                    res.status(404).json({ message: "no results" });
                });
        });
        
        app.get("/courses", (req, res) => {
            collegeData.getCourses()
                .then((courses) => {
                    res.json(courses);
                })
                .catch((error) => {
                    res.status(404).json({ message: "no results" });
                });
        });
        
        app.get("/students/:num", (req, res) => {
            collegeData.getStudentByNum(req.params.num)
                .then((student) => {
                    res.json(student);
                })
                .catch((error) => {
                    res.status(404).json({ message: "no results" });
                });
        });
        
        app.get("/about", (req, res) => {
            res.sendFile(path.join(__dirname, "/views/about.html"));
        });
        
        app.get("/htmlDemo", (req, res) => {
            res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
        });
        
        app.use((req, res) => {
            res.status(404).send("Page Not Found");
        });


        app.listen(HTTP_PORT, () => {
            console.log("Server listening on port: " + HTTP_PORT);
        });
    })
    .catch((error) => {
        console.error(error);
    });
