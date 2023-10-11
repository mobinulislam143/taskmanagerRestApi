const TaskModel = require("../models/TasksModel");

exports.createTask = async (req, res) => {
  try {
    let reqBody = req.body;
    reqBody.email = req.headers["email"];
    let result = await TaskModel.create(reqBody);
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    res.status(500).json({ status: "fail", data: err.toString() });
  }
};
exports.readTask = async (req, res) => {
  try {
    let email = req.headers["email"];
    let result = await TaskModel.find({ email: email });
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    res.status(404).json({ status: "fail", data: err.toString() });
  }
};
exports.updateTaskStatus = async (req, res) => {
  try {
    let id = req.params.id
    let status = req.params.status
    let Query = {_id: id}
    let reqBody = {status: status}
    let result = await TaskModel.updateOne(Query, reqBody)
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    res.status(404).json({ status: "fail", data: err.toString() });
  }
};
exports.listTaskByStatus = async (req, res) => {
  try {
    let status = req.params.status
    let email = req.headers['email']
    let result = await TaskModel.find({email:email, status: status})  
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    res.status(404).json({ status: "fail", data: err.toString() });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    let id = req.params.id

    let result = await TaskModel.deleteOne({_id:id})
    
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    res.status(404).json({ status: "fail", data: err.toString() });
  }
};
