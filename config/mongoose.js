var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db);

    require('../app/models/user.server.model.js');
    require('../app/models/article.server.model.js');
    return db;
}

//config를 require하고 몽구스에서 db를 연결한 객체를 리턴 시킨다.