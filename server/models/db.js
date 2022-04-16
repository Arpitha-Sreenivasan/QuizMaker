const mongoose=require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECT_LINK,{ useNewUrlParser: true, useUnifiedTopology: true});

const db=mongoose.connection;

db.on('error', console.error.bind(console,'Connection error'));

db.once('open', function(){
    console.log('DB Connected');
});

require('./Users');
require('./CreateQuiz');
require('./AttemptQuiz');