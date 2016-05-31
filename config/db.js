var configValues = require('./config');

module.exports = {
    getDbConnectionString: function(){
        return 'mongodb://'+ configValues.uname +':'
            + configValues.pwd +'@ds042898.mlab.com:42898/willstictactoe';
    }
}

