exports.PORT = process.env.PORT || 3030;

exports.DATABASE_URL = process.env.DATABASE_URL || 
    global.DATABASE_URL ||
    'mongodb://localhost/timelinesDb'; 

exports.SECRET = process.env.SECRET || "thelastthingyoudeverguess"; 


