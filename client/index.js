document.addEventListener("DOMContentLoaded", async () => {
  const submitButton = document.getElementById("submitButton");
  const resultDiv = document.getElementById("result");
  const fieldInputs = document.getElementById("fieldInputs");
  const addFieldLink = document.getElementById("addFieldLink");
  const form = document.querySelector("form");

  const addRecord = document.getElementById("addRecords");

  const addTableButton = document.getElementById("addTable");

  const dialog = document.getElementById("dialog");

  addTableButton.addEventListener("click", () => {
    dialog.style.display = "block";
  });

  let fieldIndex = 1;

  addFieldLink.addEventListener("click", () => {
    const newField = document.createElement("div");

    newField.innerHTML = `
          <label for="fieldName${fieldIndex}">Field name:</label>
          <input type="text" id="fieldName${fieldIndex}" name="fieldName[]" required>
          <label for="fieldType${fieldIndex}">Field type:</label>
          <input type="text" id="fieldType${fieldIndex}" name="fieldType[]" required><br><br>
        `;

    fieldInputs.appendChild(newField);
    fieldIndex++;
  });

  /*  submitButton.addEventListener("click", async () => {
    const tableName = document.getElementById("tableName").value;
    const fieldNames = [];
    const fieldTypes = [];

    // Loop through the dynamically created field inputs
    for (let i = 1; i < fieldIndex; i++) {
      const fieldName = document.getElementById(`fieldName${i}`).value;
      const fieldType = document.getElementById(`fieldType${i}`).value;
      fieldNames.push(fieldName);
      fieldTypes.push(fieldType);
    }

    const formData = {
      tableName: tableName,
      fieldNames: fieldNames,
      fieldTypes: fieldTypes,
    };

    try {
      const response = await axios.post("/api/createTable", formData);
      const createdTableName = response.data; // Get the table name from the response

      console.log("created table name is===>", createdTableName);
      // Fetch table data for the newly created table and pass resultDiv
      await fetchTableData(createdTableName, resultDiv);

      // Clear the form and reset the table name input
      form.reset();
      document.getElementById("tableName").value = "";
    } catch (error) {
      console.error(error);
      resultDiv.innerHTML = "<p>Failed to create Table</p>";
    }

    dialog.style.display = "none";
  });

  const fetchTableData = async (tableName, resultDiv) => {
    try {
      if (!tableName) {
        console.error("Table name is not defined.");
        resultDiv.innerHTML = "<p>Table name is not defined.</p>";
        return;
      }

      // Fetch the schema (field names)
      const schemaResponse = await axios.get(
        `/api/fetchSchema?tableName=${tableName}`
      );
      const fieldNames = schemaResponse.data;

      // Fetch the table data
      const fetchDataResponse = await axios.get(
        `/api/fetchData?tableName=${tableName}`
      );
      const tableData = fetchDataResponse.data;

      if (!tableData || tableData.length === 0) {
        console.error("No data received");
        resultDiv.innerHTML = "<p>No data received.</p>";
        return;
      }

      // Create an HTML table to display the data
      const table = document.createElement("table");

      // Create table headers with field names
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");

      for (const fieldName of fieldNames) {
        const th = document.createElement("th");
        th.textContent = fieldName;
        headerRow.appendChild(th);
      }

      thead.appendChild(headerRow);
      table.appendChild(thead);

      // Create table rows and cells with data
      const tbody = document.createElement("tbody");

      for (const rowData of tableData) {
        const row = document.createElement("tr");

        for (const cellData of rowData) {
          const cell = document.createElement("td");
          cell.textContent = cellData;
          row.appendChild(cell);
        }

        tbody.appendChild(row);
      }

      table.appendChild(tbody);
      resultDiv.innerHTML = ""; // Clear previous data
      resultDiv.appendChild(table);
    } catch (error) {
      console.error(error);
      resultDiv.innerHTML = "<p>Failed to fetch table data.</p>";
    }
  };
  */
  // index.js

  // ... your existing code ...

  submitButton.addEventListener("click", async () => {
    const tableName = document.getElementById("tableName").value;
    const fieldNames = [];
    const fieldTypes = [];

    // Loop through the dynamically created field inputs
    for (let i = 1; i < fieldIndex; i++) {
      const fieldName = document.getElementById(`fieldName${i}`).value;
      const fieldType = document.getElementById(`fieldType${i}`).value;
      fieldNames.push(fieldName);
      fieldTypes.push(fieldType);
    }

    const formData = {
      tableName: tableName,
      fieldNames: fieldNames,
      fieldTypes: fieldTypes,
    };

    try {
      const response = await axios.post("/api/createTable", formData);
      const createdTableName = response.data; // Get the table name from the response

      // Fetch schema and data for the newly created table
      const fetchDataResponse = await axios.get(
        `/api/fetchData?tableName=${createdTableName}`
      );
      const { schema, data } = fetchDataResponse.data;

      // Clear the form and reset the table name input
      form.reset();
      document.getElementById("tableName").value = "";

      // Display the schema and data in an HTML table
      displayTable(schema, data);
    } catch (error) {
      console.error(error);
      resultDiv.innerHTML = "<p>Failed to create Table</p>";
    }

    dialog.style.display = "none";
  });

  // Function to display schema and data in an HTML table
  function displayTable(schema, data) {
    const table = document.createElement("table");

    table.style.borderCollapse = "collapse";
    table.style.width = "50%";
    table.style.border = "2px solid #333";

    // Create table headers
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    for (const fieldName of schema) {
      const th = document.createElement("th");
      th.textContent = fieldName;
      th.style.border = "1px solid #333"; // Cell border color
      th.style.backgroundColor = "#f2f2f2"; // Header background color
      th.style.padding = "8px";
      th.style.textAlign = "left";

      headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table rows and cells
    const tbody = document.createElement("tbody");

    for (const rowData of data) {
      const row = document.createElement("tr");

      for (const cellData of rowData) {
        const cell = document.createElement("td");
        cell.textContent = cellData;

        cell.style.border = "1px solid #333"; // Cell border color
        cell.style.padding = "8px";
        cell.style.textAlign = "left";
        row.appendChild(cell);
      }

      tbody.appendChild(row);
    }

    table.appendChild(tbody);
    resultDiv.innerHTML = ""; // Clear previous data
    resultDiv.appendChild(table);

    resultDiv.style.marginTop = "30px";

    //Displaying Aad Record button after data is fetched from the database
    addRecord.style.display = "block";

    addRecord.style.marginLeft = "80px";
    addRecord.style.marginTop = "30px";
  }

  // ... the rest of your code ...
});
