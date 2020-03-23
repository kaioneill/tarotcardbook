import models, { connectDb } from './models/index';
import { saveCards, deleteCards, addTarotData, updateCards } from "./models/card";
import userSchema from "./models/user";
import session from "express-session";
import passport from "./passport";
import Strategy from 'passport-local';
import bodyParser from 'body-parser';

import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

var app = express();

app.use(cookieParser("lol-it-me-ayy"));

// sessions
app.use(
  session({
    secret: "lol-it-me-ayy",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false
    }
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("trustproxy", true);

// routes
import indexRouter from './routes/index';
import cardsRouter from './routes/cards';
import usersRouter from './routes/users';
import spreadsRouter from './routes/spreads';

app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/cards", cardsRouter);
app.use("/users", usersRouter);
app.use("/spreads", spreadsRouter);
app.use(express.static("public"));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


connectDb().then(async () => {
  app.listen(process.env.PORT, () => {
    console.log(`tarot listening on port ${process.env.PORT}!`);
    // saveCards();
    // deleteCards();
    // updateCards();
    // addTarotData();
  });
}).catch((e) => {
  console.log(e)
});

export default app;