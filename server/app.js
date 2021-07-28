const express = require("express");
const db = require("./lib/db");

/*
  We create an express app calling
  the express function.
*/
const app = express();

/*
  We setup middleware to:
  - parse the body of the request to json for us
  https://expressjs.com/en/guide/using-middleware.html
*/
app.use(express.json());

/*
  Endpoint to handle GET requests to the root URI "/"
*/
app.get("/", (req, res) => {
  res.json({
    "/articles": "read and create new articles",
    "/articles/:id": "read, update and delete an individual article",
  });
});

app.get("/articles", (req, res) => {
  db.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500);
      res.send("something went wrong");
    });
});

app.post("/articles", (req, res) => {
  db.insert(req.body)
    .then((newPost) => {
      res.status(201).send(newPost);
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.get("/articles/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).end();
        return;
      }
      res.send(data);
    })
    .catch(() => {
      res.status(500).send();
    });
});

app.patch("/articles/:id", (req, res) => {
  console.log(req.body);
});

app.delete("/articles/:id", (req, res) => {
  const id = req.params.id;
  db.updateById(id)
    .then(() => res.status(204).end())
    .catch(() => {
      res.status(500).end();
    });
});

/*
  We have to start the server. We make it listen on the port 4000

*/
app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
