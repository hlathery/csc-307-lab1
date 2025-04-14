import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

// Filters by their name and/or job
function findByFilter({ name, job }) {
  return users["users_list"].filter((user) => {
    // If parameter provided, and current user doesn't match; discard them
    if (name && user["name"] !== name) return false;
    if (job && user["job"] !== job) return false;
    // Otherwise include current user
    return true;
  });
}

function findUserById(id) {
  return users["users_list"].find((user) => user["id"] === id);
}

function addUser(user) {
  users["users_list"].push(user);
  return user;
}

function removeUserById(id) {
  const index = users["users_list"].findIndex((user) => user["id"] === id);
  if (index === -1) {
    return undefined;
  } else {
    return users["users_list"].splice(index, 1);
  }
}

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name || job) {
    let result = findByFilter({ name, job });
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.delete("/users/:id", (req, res) => {
  const userToRemove = req.params.id;
  let result = removeUserById(userToRemove);
  if (result === undefined) {
    res.status(404).send("Resource not found");
  } else {
    res.send({ removed: result });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
