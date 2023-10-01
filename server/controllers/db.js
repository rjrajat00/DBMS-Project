const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("rajat23", "root", "Icando00@#", {
  dialect: "mysql",
  host: "localhost",

  dialectOptions: {
    connectTimeout: 60000, // Adjust the timeout as needed
  },
  retry: {
    max: 5, // Number of times to retry before giving up
    timeout: 3000, // Time to wait between retries (in milliseconds)
  },
});

// Define a mapping between user-entered field types and Sequelize data types
const dataTypeMapper = (fieldType) => {
  switch (fieldType) {
    case "string":
      return DataTypes.STRING;
    case "integer":
      return DataTypes.INTEGER;
    case "float":
      return DataTypes.FLOAT;
    // Add more data type mappings as needed
    default:
      return DataTypes.STRING; // Default to string if no match
  }
};

// Define a dynamic model for the table
const createTable = async (tableName, fieldNames, fieldTypes) => {
  try {
    const fields = {};
    for (let i = 0; i < fieldNames.length; i++) {
      const fieldName = fieldNames[i];
      fields[fieldName] = {
        type: dataTypeMapper(fieldTypes[i]),
        allowNull: false,
      };
    }

    await sequelize.define(tableName, fields, {
      tableName: tableName,
      // Add other options if needed
    });
    await sequelize.sync();

    return "Table created successfully!";
  } catch (error) {
    console.error("Error creating the table:", error); // Log the error message
    throw new Error("Error creating the table.");
  }
};

const fetchTableData = async (tableName) => {
  try {
    const Model = sequelize.models[tableName];
    const tableData = await Model.findAll();

    // Map the data to an array of arrays
    const formattedData = tableData.map((row) => Object.values(row.dataValues));

    return formattedData;
  } catch (error) {
    console.error("Error fetching table data:", error);
    throw new Error("Error fetching table data.");
  }
};

const fetchTableSchema = async (tableName) => {
  try {
    if (!tableName) {
      throw new Error("Table name is not defined.");
    }

    // Use Sequelize to fetch the table schema without data
    const Model = sequelize.models[tableName];
    const tableColumns = Model.tableAttributes;

    // Extract column names
    const schema = Object.keys(tableColumns);

    // Return only the schema (field names)
    return schema;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching table schema.");
  }
};

// ... Your existing code ...

const insertRecord = async (tableName, recordData) => {
  try {
    const Model = sequelize.models[tableName];
    await Model.create(recordData); // Insert the record into the table

    return "Record inserted successfully!";
  } catch (error) {
    console.error("Error inserting record:", error);
    throw new Error("Error inserting record.");
  }
};

module.exports = {
  createTable,
  fetchTableData,
  fetchTableSchema,
  insertRecord,
};
