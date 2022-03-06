const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.item_code = require("./Item_code/item_code.model");
db.requests = require("./Requests/requests.model");
db.request_ID = require("./RequestsID/requestsID.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;