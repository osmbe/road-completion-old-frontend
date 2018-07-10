'use strict';
module.exports = function(app) {
  var roadCompletion = require('../controllers/controller');

  // roadCompletion Routes
  app.route('/status')
    .get(roadCompletion.list_all)
    .post(roadCompletion.create_a);


  app.route('/status/:id')
    .get(roadCompletion.read_a);
};