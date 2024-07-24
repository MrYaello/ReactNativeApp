import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mysql from 'mysql';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import credentialsSMTP from './credentialsSMTP.js';
import credentialsSQL from './credentialsSQL.js';
import e from 'express';

//SQL Connection.
const pool = mysql.createPool(credentialsSQL);

//SMTP Connection. Email Service.
const readFile = promisify(fs.readFile);
const sender = nodemailer.createTransport(credentialsSMTP);

const sendMail = async (code, email) => {
  const html = await readFile('./email.html', 'utf8');
  const template = handlebars.compile(html);
  const data = {
    code: code,
    email: email,
  };
  const parsedHtml = template(data);
  const mail = {
    from: '"YLCode Admin 👻" <admin@ylcode.online>',
    to: email,
    subject: 'Verification code',
    html: parsedHtml
  };
  sender.sendMail(mail, (error, info) => {
    if (error) console.log(error);
    console.log(info);
  });
}

const web = express();
const webServer = http.Server(web);
web.enable('trust proxy');
web.use((req,res,next) => {
    if(req.secure) {
        next();
    } else {
        res.redirect('https://ylcode.online' + req.url);
    }
});
web.use('/cv/yael', express.static('cv/yael'));
web.get('/cv/yael', (req, res) => {
  if (req.originalUrl.split("?")[1] == "es") res.sendFile(path.join('/home/ubuntu/Sockets/socketsServer/cv/yael/es.html'));
  else res.sendFile(path.join('/home/ubuntu/Sockets/socketsServer/cv/yael/en.html'));
});
const httpPORT = 80;

const app = express();
const server = http.Server(app);
const io = new Server(server, {
  maxHttpBufferSize: 1e7
});
const appPORT = 4000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
  res.send("¡Hello world!");
});

export const queryExecute = (sql, params, env, callback) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return;
    }
    connection.query(sql, params, (err, result, field) => {
      callback(env, result, err, field);
      connection.release();
    });
  });
}

io.on("connection", (socket) => {
  const emitResultSocket = (env, result, err, field) => {
    if (err) console.log(err);
    socket.emit(env, result);
  }

  let user_id;
  console.log(`[+]: ${socket.id} user connected.`);
  let queryUpdateUsers = "SELECT c.id AS 'index', c.name, c.avatar, m.content AS 'state' FROM chatgroup c LEFT JOIN (SELECT * FROM message m1 WHERE (m1.recipient_id, m1.postDate) IN (SELECT recipient_id, MAX(postDate) FROM message GROUP BY recipient_id)) m ON c.id = m.recipient_id"; 
  queryExecute(queryUpdateUsers, [], "requestUsers", emitResultSocket);

  socket.on("requestUsers", (online, id) => {
    let query = "SELECT c.id AS 'index', c.name, c.avatar, m.content AS 'state' FROM chatgroup c LEFT JOIN (SELECT * FROM message m1 WHERE (m1.recipient_id, m1.postDate) IN (SELECT recipient_id, MAX(postDate) FROM message GROUP BY recipient_id)) m ON c.id = m.recipient_id WHERE c.id != ?";
    queryExecute(query, [id], "requestUsers", emitResultSocket);
  });

  socket.on("validateUsername", (auth) => {
    let query = "SELECT id, salt FROM user WHERE username=? OR email=? OR phonenumber=?"; 
    queryExecute(query, [auth, auth, auth], "validateUsername", emitResultSocket);
  });

  socket.on("login", (username, password) => {
    let query = "SELECT username, id AS \"index\" FROM user WHERE username=? AND password=? OR email=? AND password=? OR phonenumber=? AND password=?";
    queryExecute(query, [username, password, username, password, username, password], "login", emitResultSocket);
  });

  socket.on("register", (username, salt, password, email, phonenumber) => {
    let queryRegister = "INSERT INTO user (username, salt, password, email, phonenumber) VALUES (?,?,?,?,?)";
    queryExecute(queryRegister, [username, salt, password, email, phonenumber], "register", emitResultSocket);
  });

  socket.on("getAvatarSource", (username) => {
    let query = "SELECT avatar FROM chatgroup WHERE name=?";
    queryExecute(query, [username], "getAvatarSource", emitResultSocket);
  });

  socket.on("sendVerificationEmail", (email) => {
    let deletePrevious = "DELETE FROM verification WHERE email=?";
    queryExecute(deletePrevious, [email], "sendVerificationEmail", emitResultSocket);

    let code = Math.floor(Math.random() * (9999)).toString().padStart(4, "0");
    let query = "INSERT INTO verification (email, code) VALUES (?, ?)"
    queryExecute(query, [email, code], "sendVerificationEmail", emitResultSocket);
    sendMail(code, email);
  });

  socket.on("verifyEmailCode", (email) => {
    let query = "SELECT code FROM verification WHERE DATE_SUB(CURDATE(), INTERVAL 30 MINUTE) <= created AND email=?";
    queryExecute(query, [email], "verifyEmailCode", emitResultSocket);
  });

  socket.on("identify", (id) => {
    user_id = id;
  }); 

  socket.on("disconnect", () => {
    console.log(`[-]: ${socket.id} user disconnected.`)
    socket.disconnect();
  });
  /*
  socket.on("sendMessage", (sender_id, recipient_id, content) => {
    let query = "INSERT INTO message VALUES (DEFAULT, ?, ?, DEFAULT, ?)";
    connection.query(query, [sender_id, recipient_id, content], (err, result) => {
      if (err) console.log(err);
      socket.emit("sendMessage", result);
    });
  });

  socket.on("deployMessages", (group_id) => {
    let query = "SELECT * FROM message WHERE recipient_id = ?";
    connection.query(query, [group_id], (err, result) => {
      if (err) console.log(err);
      socket.emit("deployMessages", result);
    })
  });
  */
});

server.listen(appPORT, () => {
  console.log(`[Server] Listening on http://app.ylcode.online:${appPORT}`);
});

webServer.listen(httpPORT, () => {
  console.log(`[HTTP] Listening on https://ylcode.online:${httpPORT}`);
});
