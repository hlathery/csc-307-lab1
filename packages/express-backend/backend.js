import express from "express";
import cors from "cors";

import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/users", async (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  try {
    const result = await userServices.getUsers(name, job);
    res.send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured in the server.");
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await userServices.findUserById(id);
    if (result) {
      res.send({ users_list: result });
    } else {
      res.status(404).send("Resource not found.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured in the server");
  }
});

app.post("/users", async (req, res) => {
  const user = req.body;
  try {
    const savedUser = await userServices.addUser(user);
    if (savedUser) {
      res.status(201).send({ added: savedUser });
    } else {
      res.status(500).send("User could not be saved.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while saving the user.");
  }
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await userServices.removeUserById(id);
    if (!result) {
      res.status(404).send("Resource not found");
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured while deleting the user.");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
