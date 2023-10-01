const express = require("express");

const cors = require("cors");

const app = express();

const bodyParser = require("body-parser");
const router = require("./routes/routes");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("client"));

app.use("/api", router);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const port = process.env.PORT || 3500;

app.listen(port, () => {
  console.log(`Server is running at Port ${port}`);
});
