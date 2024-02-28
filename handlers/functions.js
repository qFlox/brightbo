const moment = require("moment");

module.exports = {
    execute: async (client) => {
        client.log = function (message) {
            console.log(`${message}`);
          };
    }
}
