const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

// GET Request Controllers (Read)
const getAllEmployees = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection("employees").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch {
    console.log("Error on getting all tickets", err);
  }
};

const getSingleEmployee = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("employees")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    console.log("Error on getting a single ticket", err);
  }
};

// POST Request Controllers (Create)
const createEmployees = async (req, res) => {
  try {
    const employee = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("employees")
      .insertOne(employee);

    if (response.acknowledged) {
      return res.status(201).json(response);
    } else {
      return res
        .status(500)
        .json(response.error || "Error occurred while creating the employee.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllEmployees, getSingleEmployee, createEmployees };
