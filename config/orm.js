// Requires MySQL connection.
var connection = require("../config/connection.js");

// Helper functions
function printQuestionMarks(input) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(obj) {
  var arr = [];

  for (var key in obj) {
    var value = obj[key];
    if (Object.hasOwnProperty.call(obj, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}
// Build ORM object for all our SQL statement functions.
var orm = {
  selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  createOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;
    queryString += " (" + cols.toString() + ") VALUES ("
    queryString += printQuestionMarks(vals.length) + ") ";
    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  
  updateOne: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table + " SET ";
    queryString += objToSql(objColVals) + " WHERE " + condition;
    console.log(queryString);

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
};

// Export the orm object for the model (burger.js).
module.exports = orm;
