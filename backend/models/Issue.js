var mongoose = require('mongoose');

var IssueSchema = new mongoose.Schema
({
    status: String,
    hash: String,
    noteId: String,
    note: String,
    userId: String
});

// TODO: CREATE METHOD TO REPLACE AN ISSUE'S ID WITH A CUSTOM HASH
mongoose.model('Issue', IssueSchema);