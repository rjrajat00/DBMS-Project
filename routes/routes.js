const express = require("express");
const router = express.Router();

const controller = require("../server/controllers/dbms");

router.post("/createTable", controller.createTable);

router.get("/fetchData", controller.fetchTableData);

router.post("/fetchSchema", controller.insertRecord);

router.get("/fetchSchema", controller.insertRecord);

module.exports = router;
