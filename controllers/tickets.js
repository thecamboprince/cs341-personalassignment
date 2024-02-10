const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

// GET Request Controllers (Read)
const getAllTickets = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection("tickets").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch {
    console.log("Error on getting all tickets", err);
  }
};

const getSingleTicket = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("tickets")
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
const createTicket = async (req, res) => {
  try {
    const ticket = {
      title: req.body.title,
      description: req.body.description,
      assignee: req.body.assignee,
      reporter: req.body.reporter,
      priority: req.body.priority,
      status: req.body.status,
      createdDate: req.body.createdDate,
      lastUpdatedDate: req.body.lastUpdatedDate,
      comments: req.body.comments,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("tickets")
      .insertOne(ticket);

    if (response.acknowledged) {
      return res.status(201).json(response);
    } else {
      return res
        .status(500)
        .json(response.error || "Error occurred while creating the ticket.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllTickets, getSingleTicket, createTicket };
