const {
  createTable,
  fetchTableSchema,
  fetchTableData,
  insertRecord,
} = require("./db");

const createTableHandler = async (req, res) => {
  const { tableName, fieldNames, fieldTypes } = req.body;

  console.log(tableName, fieldNames, fieldTypes);

  try {
    // Pass the array of field names and field types
    await createTable(tableName, fieldNames, fieldTypes); // Call createTable function
    res.send(tableName);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating the table.");
  }
};

// Fetch data from a table

const fetchTableDataHandler = async (req, res) => {
  const { tableName } = req.query; // Use req.query to get query parameters

  try {
    const tableSchema = await fetchTableSchema(tableName);
    const tableData = await fetchTableData(tableName);

    res.json({ schema: tableSchema, data: tableData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching table data.");
  }
};

const insertRecordHandler = async (req, res) => {
  const { tableName, recordData } = req.body;

  try {
    // Pass the table name and record data for insertion
    await insertRecord(tableName, recordData);
    res.send("Record inserted successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error inserting record.");
  }
};

const fetchSchemaHandler = async (req, res) => {
  const { tableName } = req.query; // Use req.query to get query parameters

  try {
    const tableSchema = await fetchTableSchema(tableName); // Call fetchTableSchema function
    res.json(tableSchema);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching table schema.");
  }
};

module.exports = {
  createTable: createTableHandler, // Export the corrected function name
  fetchTableData: fetchTableDataHandler,
  insertRecord: insertRecordHandler,
  fetchSchema: fetchSchemaHandler,
};
