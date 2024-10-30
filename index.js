import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt, { hash } from "bcrypt";
import env from "dotenv";


const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

db.connect();

app.get("/", (req,res) => {
    res.render("home.ejs")
});

app.get("/login", (req,res) => {
    res.render("login.ejs")
});

app.get("/register", (req,res) => {
    res.render("register.ejs")
});

app.get("/site", (req,res) => {
    res.render("home.ejs")
});

app.post("/register", async(req,res) => {
    const email = req.body.username;
    const password = req.body.password;
    
    try {
        const checkResult = await db.query("SELECT * FROM users1 WHERE email = $1",[email]);
        if (checkResult.rows.length > 0) {
            res.send("Already exists");
        } else {
            bcrypt.hash(password,saltRounds,async (err,hash) =>{
                if (err) {
                    console.log(err)
                } else {
                  await db.query("INSERT INTO users1(email,password) VALUES ($1,$2)",[email,hash]);
                    res.render("site.ejs");
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
});

app.post("/login", async(req,res) => {
    const email = req.body.username;
    const password = req.body.password;
    try {
        const checkResult = await db.query("SELECT * FROM users1 WHERE email = $1",[email]);
        if (checkResult.rows.length === 0) {
            console.log("Go register");
        } else {
            const user = checkResult.rows[0];
            const userPassword = user.password;
            bcrypt.compare(password,userPassword, (err,result) => {
                if (err) {
                    console.log(err);
                } else {
                    if (result) {
                        res.render("site.ejs");
                    } else {
                        res.redirect("/login");
                    }
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})