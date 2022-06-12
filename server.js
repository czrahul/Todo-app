const express = require("express")
const app = express()
const http = require('http');
const server = http.createServer(app);
const port = 4000
const cors = require("cors")

const sqlite3 = require("sqlite3").verbose();
let sql;

//connect to DB 
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) return console.error(err.message);
});

// Create table
// sql = 'CREATE TABLE todo(id INTEGER PRIMARY KEY, title, description, status)';
// db.run(sql);

//Drop table
// db.run("DROP TABLE todo")

// Insert data into table
// sql = 'INSERT INTO todo(title, description, status) VALUES(?,?,?)';
// db.run(sql, ["Charge", "Charge your phone", "done"], (err) => {
//         if (err) return console.error(err.message);
//     }
// );


//Update data
// sql = "DELETE FROM todo WHERE id = ?";
// db.run(sql, [ 7], (err) => {
//     if (err) return console.error(err);
// });


//Query the data

// sql = "SELECT * FROM todo";
// db.all(sql, [], (err, rows) => {
// if(err) return console.error(err.message);
// rows.forEach((row) => {
//     console.log(row);
// });
// });

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

var p_task = [];
var ip_task = [];
var done_task = [];

let temp = "";
var s_p_data = [];
var s_ip_data = [];
var s_done_data = [];
app.get("/todo", cors(), async (req, res) => {
    if(temp) 
        res.send(JSON.stringify(s_p_data))
    else{
        p_task = [];
        sql = "SELECT * FROM todo WHERE status = ?";
        db.all(sql, ["pending"], (err, rows) => {
            if(err) return console.error(err.message);
            rows.forEach((row) => {
                p_task.push(row);
            });
            res.send(JSON.stringify(p_task))
        });
    }
});

app.get("/inprogress", cors(), async (req, res) => {
    if(temp) 
         res.send(JSON.stringify(s_ip_data))
    else{
        ip_task = [];
        sql = "SELECT * FROM todo WHERE status = ?";
        db.all(sql, ["inprogress"], (err, rows) => {
            if(err) return console.error(err.message);
            rows.forEach((row) => {
                ip_task.push(row);
            });
            res.send(JSON.stringify(ip_task))
        });
    }
 });

 app.get("/done", cors(), async (req, res) => {
    if(temp) 
         res.send(JSON.stringify(s_done_data))
    else{
        done_task = [];
        sql = "SELECT * FROM todo WHERE status = ?";
        db.all(sql, ["done"], (err, rows) => {
            if(err) return console.error(err.message);
            rows.forEach((row) => {
                done_task.push(row);
            });
            res.send(JSON.stringify(done_task))
        });
    }
 });

app.post("/search", async (req, res) => {
	let{skey} = req.body;
    temp = skey;
    s_p_data = [];
    sql = 'SELECT * FROM todo WHERE title = ? AND status = ?';
    db.all(sql, [skey, 'pending'], (err, rows) => {
        if (err) return console.error(err.message);
        rows.forEach((row) => {
            s_p_data.push(row);
        });
    })

    s_ip_data = [];
    sql = 'SELECT * FROM todo WHERE title = ? AND status = ?';
    db.all(sql, [skey, 'inprogress'], (err, rows) => {
        if (err) return console.error(err.message);
        rows.forEach((row) => {
            s_ip_data.push(row);
        });
    })

    s_done_data = [];
    sql = 'SELECT * FROM todo WHERE title = ? AND status = ?';
    db.all(sql, [skey, 'done'], (err, rows) => {
        if (err) return console.error(err.message);
        rows.forEach((row) => {
            s_done_data.push(row);
        });
    })
});

app.post("/post_task", async (req, res) => {
	let { t, desc } = req.body;
    sql = 'INSERT INTO todo(title, description, status) VALUES(?,?,?)';
    db.run(sql, [t, desc, "pending"], (err) => {
        if (err) return console.error(err.message);
    });
})

app.post("/delete", async (req, res) => {
	let {taskId} = req.body;
    sql = 'DELETE FROM todo WHERE id = ?';
    db.run(sql, [taskId], (err) => {
        if (err) return console.error(err.message);
    });
})

app.post("/archive", async (req, res) => {
	let {taskId} = req.body;
    sql = 'UPDATE todo SET status = ? WHERE id = ?';
    db.run(sql, ["archived", taskId], (err) => {
        if (err) return console.error(err.message);
    });
})

app.post("/move", async (req, res) => {
	let {taskId, e} = req.body;
    sql = 'UPDATE todo SET status = ? WHERE id = ?';
    db.run(sql, [e, taskId], (err) => {
        if (err) return console.error(err.message);
    });
})

server.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})