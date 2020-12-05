"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const clients = require("./handlers/clientHandlers");
const { clientIdExists } = require("./handlers/clientHandlers");

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get("/clients", (req, res) => {
    res.status(200).json({
      status: 200,
      data: clients.getAll(),
    });
  })

  .get("/clients/:id", (req, res) => {
    const id = req.params.id;
    res.status(200).json({
      status: 200,
      data: clients.getUnique(id),
    });
  })

  .post("/clients", (req, res) => {
    const { age, name, gender, company, email, phone, address } = req.body;
    if (!email) {
      res.status(400).json({
        status: "err",
        message: "email is required",
      });
    } else if (clients.clientExists(email)) {
      res.status(400).json({
        status: "error",
        message: "client already exists",
      });
    } else {
      clients.createUser({ age, name, gender, company, email, phone, address });
      res.status(200).json({
        status: "good",
      });
    }
  })

  .delete("/clients/:id", (req, res) => {
    const id = req.params.id;
    if (clientIdExists(id) >= 0) {
      clients.deleteUser(id);
      res.status(200).json({
        status: "deleted",
      });
    } else {
      res.status(400).json({
        status: "user doesnt exist ",
      });
    }
  })

  .listen(8000, () => console.log(`Listening on port 8000`));
