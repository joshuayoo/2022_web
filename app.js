const express = require("express");
const app = express();
const mysql = require("mysql2");
const dbconfig = require("./config/dbconfig.json");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const url = require("url");
var search_data = [];
const port = 5950;

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
  var data = [];
  if (req.session.user) {
    const keys = Object.keys(req.session.user);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key == "Action" && req.session.user[key] == 1)
        req.session.user[key] = 28;
      else if (key == "Adventure" && req.session.user[key] == 1)
        req.session.user[key] = 12;
      else if (key == "Animation" && req.session.user[key] == 1)
        req.session.user[key] = 16;
      else if (key == "Comedy" && req.session.user[key] == 1)
        req.session.user[key] = 35;
      else if (key == "Crime" && req.session.user[key] == 1)
        req.session.user[key] = 80;
      else if (key == "Documentary" && req.session.user[key] == 1)
        req.session.user[key] = 99;
      else if (key == "Drama" && req.session.user[key] == 1)
        req.session.user[key] = 18;
      else if (key == "Family" && req.session.user[key] == 1)
        req.session.user[key] = 10751;
      else if (key == "Fantasy" && req.session.user[key] == 1)
        req.session.user[key] = 14;
      else if (key == "History" && req.session.user[key] == 1)
        req.session.user[key] = 36;
      else if (key == "Horror" && req.session.user[key] == 1)
        req.session.user[key] = 27;
      else if (key == "Music" && req.session.user[key] == 1)
        req.session.user[key] = 10402;
      else if (key == "Mystery" && req.session.user[key] == 1)
        req.session.user[key] = 9648;
      else if (key == "Romance" && req.session.user[key] == 1)
        req.session.user[key] = 10749;
      else if (key == "Science Fiction" && req.session.user[key] == 1)
        req.session.user[key] = 878;
      else if (key == "TV Movie" && req.session.user[key] == 1)
        req.session.user[key] = 10770;
      else if (key == "Thriller" && req.session.user[key] == 1)
        req.session.user[key] = 53;
      else if (key == "War" && req.session.user[key] == 1)
        req.session.user[key] = 10752;
      else if (key == "Western" && req.session.user[key] == 1)
        req.session.user[key] = 37;
    }

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (req.session.user[key] != 0) {
        const json = await (
          await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=88387aa2b0ade4e2eb90132f7740ef17&language=ko&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${req.session.user[key]}&with_watch_monetization_types=flatrate`
          )
        ).json();
        data = data.concat(json.results);
      }
    }
    res.render("index", {
      path: "home",
      session: req.session.user,
      result: data,
    });
  } else {
    for (var i = 0; i < 4; i++) {
      const json = await (
        await fetch(
          `http://api.themoviedb.org/3/movie/popular?api_key=88387aa2b0ade4e2eb90132f7740ef17&language=ko&page=${i}`
        )
      ).json();
      data = data.concat(json.results);
    }
    res.render("index", {
      path: "home",
      session: null,
      result: data,
    });
  }
});

app.get("/board", (req, res) => {
  if (req.session.user) {
    connection.query("select * from notice_board", (err, result) => {
      if (err) {
        res.send('<script>alert("에러!"); location.href="/"</script>');
      }
      res.render("index", {
        path: "board",
        session: req.session,
        result: result,
      });
    });
  } else {
    res.send(
      '<script>alert("로그인을 해주세요!"); location.href="/login"</script>'
    );
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

app.get("/search_movie", async (req, res) => {
  if (req.session.user) {
    res.render("index", {
      path: "search_movie",
      session: req.session.user,
      result: search_data,
    });
  } else {
    res.render("index", {
      path: "search_movie",
      session: null,
      result: search_data,
    });
  }
});

app.get("/mypage", async (req, res) => {
  if (req.session.user) {
    res.render("index", {
      path: "mypage",
      session: req.session.user,
    });
  } else {
    res.send(
      '<script>alert("로그인을 해주세요!"); location.href="/login"</script>'
    );
  }
});

app.get("/modify", async (req, res) => {
  if (req.session.user) {
    res.render("index", {
      path: "modify",
      session: req.session.user,
    });
  } else {
    res.send(
      '<script>alert("로그인을 해주세요!"); location.href="/login"</script>'
    );
  }
});

app.get("/logout", async (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.get("/:path", async (req, res) => {
  var _url = req.url;
  var pathname = url.parse(_url, true).pathname;
  pathname = pathname.replace("/", "");

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

app.post("/search_movie", async (req, res) => {
  const query = req.body.query;
  if (!query) {
    return res.send(
      '<script>alert("값을 입력해주세요!"); location.href="/search_movie"</script>'
    );
  }

  search_data = [];
  const json = await (
    await fetch(
      `http://api.themoviedb.org/3/search/movie?query=${query}&api_key=88387aa2b0ade4e2eb90132f7740ef17&language=ko`
    )
  ).json();
  search_data = search_data.concat(json.results);
  res.redirect("/search_movie");
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
          res.send('<script>location.href="/";</script>');
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
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science_Fiction",
    "TV_Movie",
    "Thriller",
    "War",
    "Western",
  ];

  connection.query("select * from user where id=?", [id], (err, result) => {
    if (check == undefined) {
      res.send(
        '<script>alert("장르 최소 하나만 골라주세요."); location.href="/register";</script>'
      );
    } else if (result.length == 0) {
      var checkBool = [];
      for (i = 0; i < genre.length; i++) {
        if (check.includes(genre[i])) checkBool[i] = 1;
        else checkBool[i] = 0;
      }
      connection.query(
        "INSERT INTO `user` (`id`,`passward`, `phone`, `email`, `Action`, `Adventure`, `Animation`, `Comedy`, `Crime`, `Documentary`, `Drama`, `Family`, `Fantasy`, `History`, `Horror`, `Music`, `Mystery`, `Romance`, `Science_Fiction`, `TV_Movie`, `Thriller`, `War`, `Western`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
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
          checkBool[13],
          checkBool[14],
          checkBool[15],
          checkBool[16],
          checkBool[17],
          checkBool[18],
        ]
      );
      res.redirect("/login");
    } else {
      console.log("회원가입 실패-이미 존재하는 아이디입니다.");
      res.send(
        '<script>alert("회원가입 실패 : 이미 존재하는 아이디입니다."); location.href="/register";</script>'
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

app.post("/modify", async (req, res) => {
  const id = req.session.user.id;
  const ps = req.body.password;
  const phone = req.body.phone;
  const email = req.body.email;
  connection.query(
    "update user set phone = ?, email = ? where passward = ? and id = ?",
    [phone, email, ps, id],
    (err, result) => {
      if (err) {
        res.send('<script>alert("에러!"); location.href="/mypage"</script>');
      }
      if (result.changedRows == 1) {
        req.session.user.phone = phone;
        req.session.user.email = email;
        res.send('<script>alert("수정 완료!"); location.href="/"</script>');
      } else {
        res.send(
          '<script>alert("비밀번호가 틀렸습니다!"); location.href="/mypage"</script>'
        );
      }
    }
  );
});

app.listen(port, () => {
  console.log("Server is running");
});
