const express = require("express");
const bodyParser = require("body-parser");

const db = require("./data/hubs-model");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/hubs", async (req, res) => {
  try {
    const hubs = await db.find();
    res.status(200).json(hubs);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/hubs", async (req, res) => {
  const hub = req.body;
  try {
    const newHub = db.add(hub);
    res.send(201).json(newHub);
  } catch (err) {
    res.send(500).json(err);
  }
});

app.delete("/hubs/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).end();
  }
  try {
    const removedHub = await db.remove(id);
    res.status(204).json(removedHub);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put("/hubs/:id", async (req, res) => {
  const { id } = req.params;
  const updatedHubInfo = req.body;

  if (!id || !updatedHubInfo) {
    res.status(404).end();
  }
  try {
    const updatededHub = await db.update(id, updatedHubInfo);
    res.status(200).json(updatededHub);
  } catch (err) {
    res.status(500).json(err);
  }
});

const port = 5000;

app.listen(port, () =>
  console.log(`\n*** Server running on port ${port} ***\n`)
);
