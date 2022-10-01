const express = require('express');
const cors = require('cors')
const mysql = require ('mysql');
const app= express();

const selectAlltemperatures= "select id, unit_id, temperature,unix_timestamp from measurements order by unix_timestamp desc limit 5";
const averagetep ="select avg(temperature) as avg from measurements"; 
const connection=mysql.createConnection({
    host: env.SERVER_IP,
    user: env.USER,
    password: env.PASS,
    database: env.DB_NAME
});
connection.connect(err=>{
    if(err){
        throw console.log(err+" with connection");
    }
    else{
     //console.log(connection.state)
    }
    
});
app.use(cors()); 

//this function is used to list all values from db
app.get('/pushaverage',(req,res)=>{
    connection.query(averagetep,(err,results)=>{
        if (err){
        throw res.send(err);
        }
        else{
            return res.json({
                data:results
            })
        }
    });
}); 
//this function is used to list all values from db
app.get('/temperatures',(req,res)=>{
    connection.query(selectAlltemperatures,(err,results)=>{
        if (err){
        throw res.send(err);
        }
        else{
            return res.json({
                data:results
            })
        }
    });
});
//this function is used to add with parameters
app.get('/temperatures/add',(req,res)=>{
    const {unitid,temp,timestamp}=req.query;
    const instertemperature =`insert into measurements (unit_id,temperature,unix_timestamp) values('${unitid}','${temp}','${timestamp}')`;
        connection.query(instertemperature,(err,results)=>{
            if (err){
            return res.send(err);
            }
            else{
                return res.send('temperature added successfully')
            }
        });
    });
//this function is used to update with parameters    
    app.get('/temperatures/update',(req,res)=>{
        const {unitid,temp,timestamp}=req.query;
        //const instertemperature =`update measurements set unit_id='${unitid}',temperature='${temp}',unix_timestamp='${timestamp}'where unit_id='${unitid}'`;
        const instertemperature =`update measurements set temperature='${temp}'where id='${unitid}'`;
            connection.query(instertemperature,(err,results)=>{
                if (err){
                return res.send(err);
                }
                else{
                    return res.send('temperature updated successfully')
                }
            });
        });
app.listen(9000,()=>{
    console.log(`mysql temperature dbserver connected and express server listening on port 9000`)
});
