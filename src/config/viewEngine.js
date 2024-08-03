import express from "express";

// arrow function
const configViewEngine = (app) => {
  // static: muốn lấy 1 cái img phải nói cho express biết cái chỉ được lấy trong public.
  app.use(express.static("./src/public"));
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
};

module.exports = configViewEngine;
