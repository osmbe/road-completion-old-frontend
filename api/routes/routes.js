'use strict';
module.exports = function(app) {
  var roadCompletion = require('../controllers/controller');

  // roadCompletion Routes
  app.route('/tasks')
    .get(roadCompletion.list_all_tasks)
    .post(roadCompletion.create_a_task);


  app.route('/tasks/:taskId')
    .get(roadCompletion.read_a_task)
    .put(roadCompletion.update_a_task)
    .delete(roadCompletion.delete_a_task);
};
