var mongoose = require("mongoose");

var CVS = mongoose.model(
    'cvs', 
    new mongoose.Schema({
        "first_name": String,
        "last_name": String,
        "birth_date": String,
        "email": String,
        "phone": String,
        "current_residence": {
            "country": String,
            "city": String,
            "zip_code": Number
        },
        "education": [
            {
                "school_name": String,
                "level": String,
                "degree": String,
                "start_at": Date,
                "finish_at": Date
            }
        ],
        "work_experience": [
            {
                "position": String,
                "job_description": String,
                "tags": [String],
                "company": String,
                "start_at": Date,
                "finish_at": Date
            }
        ]
   })
);