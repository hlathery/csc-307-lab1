import mongoose from "mongoose";
import userModel from "./user.js";
import dotenv from 'dotenv'
dotenv.config()

mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to mongo"))
  .catch((error) => console.log(error));

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (!name && job) {
    promise = findUserByJob(job);
  } else if (name && job) {
    promise = findUserByNameAndJob(name, job);
  }
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function findUserById(id) {
  return userModel.findById(id);
}

function findUserByNameAndJob(name, job) {
  return userModel.find({ name: name, job: job});
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function removeUserById(id) {
  const removed = userModel.findByIdAndDelete(id);
  return removed;
}

export default {
  getUsers,
  findUserByName,
  findUserByJob,
  findUserById,
  findUserByNameAndJob,
  addUser,
  removeUserById,
}
