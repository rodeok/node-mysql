import express from 'express';

import mysql from "mysql"
 const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "fav"
})

db.connect((err)=>{
if (err){
    throw err;
}
console.log("connected to mysql")
})
const app = express();


// create db
app.get("/createdb", (req, res) => {
    let sql = "CREATE DATABASE fav"
    db.query(sql, (err,result)=>{
        if(err) throw err
        console.log(result)
        res.send("Database Created")
    })
})

// create table

app.get("/createpostable", (req,res)=>{
    let sql = "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))"
    db.query(sql, (err,result)=>{
         if (err) throw err;
         console.log(result);
         res.send("Post table created")
    })
})
app.get("/addpost1", (req,res) =>{
    let post = {Title: "Post One", body: "This Is Post Number One"}
    let sql = "INSERT INTO posts SET ?"
    let query = db.query(sql,post, (err,result)=>{
          if (err) throw err
          console.log(result)
          res.send("Post One Added")
    })
})
app.get("/addpost2", (req,res) =>{
    let post = {Title: "Post Two", body: "This Is Post Number Two"}
    let sql = "INSERT INTO posts SET ?"
    let query = db.query(sql,post, (err,result)=>{
          if (err) throw err
          console.log(result)
          res.send("Post 2 Added")
    })
})
// select
app.get("/getposts", (req,res) =>{
    let sql = "SELECT * FROM posts"
    let query = db.query(sql, (err,results)=>{
          if (err) throw err
          console.log(results)
          res.send("Post Fetched")
    })
})
// select single posts
app.get("/getpost/:id", (req,res) =>{
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`
    let query = db.query(sql, (err,result)=>{
          if (err) throw err
          console.log(result)
          res.send("Post Fetched")
    })
})
// update posts
app.get("/updatepost/:id", (req,res) =>{
    let newTitle = "Updated Title"
    let sql = `UPDATE posts SET title = '${newTitle}'  WHERE id = ${req.params.id}`
    let query = db.query(sql, (err,result)=>{
          if (err) throw err
          console.log(result)
          res.send("Post Fetched")
    })
})
// delete
app.get("/deletepost/:id", (req,res) =>{
    let newTitle = "Updated Title"
    let sql = `DELETE FROM  posts  WHERE id = ${req.params.id}`
    let query = db.query(sql, (err,result)=>{
          if (err) throw err
          console.log(result)
          res.send("Post Deleted")
    })
})
app.use(express.json())
app.listen(8000, () => {
    console.log('connected..');
})