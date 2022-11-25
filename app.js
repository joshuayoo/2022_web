const express = require("express");
const app = express();
const mysql = require("mysql2");
const dbconfig = require("./config/dbconfig.json");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const url = require("url");

const connection = mysql.createConnection({
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
  database: dbconfig.database,
});
connection.connect();

app.set("view engine", "ejs");
app.set("views", "./views/ejs");
app.use(express.static("./views"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "user",
    secret: "ambc@!vsmkv#!&*!#EDNAnsv#!$()_*#@",
    resave: false,
    saveUninitialized: false,
    cookie: {
      express: 60 * 60 * 24,
    },
  })
);

app.get("/", async (req, res) => {
  if (req.session.user) {
    res.render("index", {
      path: "/",
      session: req.session.user,
    });
  } else {
    res.render("index", {
      path: "/",
      session: null,
    });
  }
});

app.get("/board", (req, res) => {
  if (req.session.user) {
    connection.query("select * from notice_board", (err, result) => {
      if (err) {
        res.send('<script>alert("에러!"); location.href="/board"</script>');
      }
      res.render("index", {
        path: "board",
        session: req.session,
        result: result,
      });
    });
  } else {
    res.send('<script>alert("로그인을 해주세요!"); location.href="/"</script>');
  }
});

app.get("/board/:id", (req, res) => {
  if (req.session.user) {
    const { id } = req.params;
    connection.query(
      "select * from notice_board where id=?",
      [id],
      (err, result) => {
        if (err) {
          res.send('<script>alert("에러!"); location.href="/board"</script>');
        }
        if (req.session.user) {
          res.render("index", {
            path: "content",
            session: req.session,
            result: result[0],
          });
        }
      }
    );
  } else {
    res.send('<script>alert("로그인을 해주세요!"); location.href="/"</script>');
  }
});

app.get("/logout", async (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.get("/:path", async (req, res) => {
  var _url = req.url;
  var pathname = url.parse(_url, true).pathname;

  if (req.session.user) {
    res.render("index", {
      path: pathname,
      session: req.session.user,
    });
  } else {
    res.render("index", {
      path: pathname,
      session: null,
    });
  }
});

app.post("/login", async (req, res) => {
  const id = req.body.id;
  const ps = req.body.password;

  if (id && ps) {
    connection.query(
      "Select * from user where id=? and passward=?",
      [id, ps],
      (err, result) => {
        if (result.length > 0) {
          req.session.user = result[0]; // 세션에 추가
          res.send('<script>alert("로그인 성공!");location.href="/";</script>');
        } else {
          res.send(
            '<script>alert("로그인 실패!");location.href="/login";</script>'
          );
        }
      }
    );
  } else {
    res.send(
      '<script>alert("id password값을 확인해주세요!");location.href="/login";</script>'
    );
  }
});

app.post("/register", async (req, res) => {
  const id = req.body.id;
  const ps = req.body.password;
  const phone = req.body.phone;
  const email = req.body.email;
  const check = req.body.check;
  const genre = [
    "action",
    "crime",
    "SF",
    "comedy",
    "romance",
    "thriller",
    "horror",
    "war",
    "sports",
    "fantasy",
    "music",
    "musical",
    "melodramatic",
  ];

  // console.log(id, ps, phone, email, check);
  connection.query("select * from user where id=?", [id], (err, result) => {
    // console.log(result);
    if (result.length == 0) {
      var checkBool = [];
      for (i = 0; i < genre.length; i++) {
        if (check.includes(genre[i])) checkBool[i] = 1;
        else checkBool[i] = 0;
      }
      // console.log("회원가입 성공", checkBool);
      connection.query(
        "insert into user (id, passward, phone, email, action, crime, SF, comedy, romance, thriller, horror, war, sports, fantasy, music, musical, melodramatic) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          id,
          ps,
          phone,
          email,
          checkBool[0],
          checkBool[1],
          checkBool[2],
          checkBool[3],
          checkBool[4],
          checkBool[5],
          checkBool[6],
          checkBool[7],
          checkBool[8],
          checkBool[9],
          checkBool[10],
          checkBool[11],
          checkBool[12],
        ]
      );
      res.redirect("/");
    } else {
      //이미 아이디가 있는 경우
      console.log("회원가입 실패-이미 존재하는 아이디입니다.");
      res.send(
        '<script>alert("회원가입 실패 : 이미 존재하는 아이디입니다."); location.href="/register";</scalert>'
      );
    }
  });
});

app.post("/board", async (req, res) => {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  const title = req.body.title;
  const content = req.body.content;
  const link = req.body.link;

  connection.query(
    "insert into notice_board (author, title, content, date, link) values (?, ?, ?, ?, ?)",
    [req.session.user.id, title, content, year + "-" + month + "-" + date, link]
  );

  res.redirect("/board");
});

app.listen(5950, () => {
  console.log("Server is running");
});
