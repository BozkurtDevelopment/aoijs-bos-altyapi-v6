const fs = require('fs');
const path = require('path');
function loadVariables(client) {
    const variables = {};
    const folderPath = path.join(__dirname, '..', 'variables');
    const files = fs.readdirSync(folderPath);
      
    files.forEach((file) => {
      if (file.endsWith('.js')) {
        const varName = file.slice(0, -3); 
        variables[varName] = require(path.join(folderPath, file))(client);
      }
    });

    return variables;
  }

  function loadFunctions(client) {
    const functions = {};
    const folderPath = path.join(__dirname, '..', 'functions');
    const files = fs.readdirSync(folderPath);
      
    files.forEach((file) => {
      if (file.endsWith('.js')) {
        const functionName = file.slice(0, -3); 
        functions[functionName] = require(path.join(folderPath, file))(client);
      }
    });

    return functions;
  }

  function loadStatus(client) {
    const statuses = {};
    const folderPath = path.join(__dirname, '..', 'status');
    const files = fs.readdirSync(folderPath);
      
    files.forEach((file) => {
      if (file.endsWith('.js')) {
        const status = file.slice(0, -3); 
        statuses[status] = require(path.join(folderPath, file))(client);
      }
    });

    return statuses;
  }
  module.exports = {
    loadFunctions,
    loadVariables,
    loadStatus
  }