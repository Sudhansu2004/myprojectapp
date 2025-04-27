const mysql=require('mysql');
const express=require('express');
const path=require('path');
const app=express();
app.use(express.json());

//mysql Connection
const db=mysql.createConnection({
    host:'locahost',
    user:'root',
    password:'root',
    database:'mycollege'
});
db.connect((err)=>{
    if(err) throw err;
    console.log('Connected to MYSQL');
});
//server HTML form
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});
app.use(express.urlencoded({extended:true}));
//insert student
app.post('/students',(req,res)=>{
    const{id,name}=req.body;
    const sql='INSERT INTO student(id,name) VALUES (?,?)';
    db.query(sql,[id,name],(err,result)=>{
        if(err)
            console.error('Error Insrting data',err)
        console.log('Inserted student',id);
        res.send('student succesfully added to the database');
    });
});
//start server
app.listen(3000,()=>{
    console.log('API running at http://localhost:3000');
});