var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema(
    {
        content: {type: STRING,required: true},
        user:{type: Schema.Types.ObjectId}
    }
);

module.exports = mongoose.model('Message',schema);