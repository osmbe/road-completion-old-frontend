'use strict';

exports.list_all_tasks = function(req, res) {
    res.json({
        "call": "list_all_tasks"
    });
};

exports.create_a_task = function(req, res) {
    res.json({
        "call": "create_a_task"
    });
};

exports.read_a_task = function(req, res) {
    res.json({
        "call": "read_a_task"
    });
};

exports.update_a_task = function(req, res) {
    res.json({
        "call": "update_a_task"
    });
};  
  
exports.delete_a_task = function(req, res) {
    res.json({
        "call": "delete_a_task"
    });
};