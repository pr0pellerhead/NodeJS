var cvCreate = {
    first_name: {type: "string", empty: false},
    last_name: {type: "string", empty: false},
    birth_date: {type: "date", empty: false},
    email: {type: "email", empty: false},
    phone: {type: "string", empty: false},
    current_residence: {type: "object", props: {
        country: {type: "string", empty: false},
        city: {type: "string", empty: false},
        zip_code: {type: "number", positive: true, integer: true, empty: false}
    }},
    education: {type: "array", items: {
        type: "object",
        props: {
            school_name: {type: "string", empty: false},
            level: {type: "string", empty: false},
            degree: {type: "string", empty: false},
            start_at: {type: "date", empty: false},
            finish_at: {type: "date", empty: false}
        }
    }},
    work_experience: {type: "array", items: {
        type: "object",
        props: {
            position: {type: "string", empty: false},
            job_description: {type: "string", empty: false},
            tags: {
                type: "array",
                items: {type: "string"}
            },
            company: {type: "string", empty: false},
            start_at: {type: "date", empty: false},
            finish_at: {type: "date", empty: false}
        }
    }}
};

module.exports = {
    cvCreate
}