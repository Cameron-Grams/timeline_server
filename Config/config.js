exports.PORT = process.env.PORT || 3030;

exports.DATABASE_URL = process.env.DATABASE_URL || 
    global.DATABASE_URL ||
    'mongodb://localhost/timelinesDb'; 

exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
    global.TEST_DATABASE_URL ||
    'mongodb://localhost/test-timelinesDB'; 

exports.SECRET = process.env.SECRET || "thelastthingyoudeverguess"; 

exports.TEST_SECRET = process.env.TEST_SECRET || "incrediblysneakypassword";

exports.EXPIRATION = 600000000;


