function is_obj(value) {
    return typeof value === 'object' && value !== null;
}

// trim body data for useless spaces
function trim(body) {
        Object.keys(body).forEach(key => {
            if(key !== 'password') {
                if(is_obj(body[key])) {
                    body[key] = trim(body[key]);
                } else {
                    if( typeof body[key] === 'string') {
                        body[key] = body[key].trim();
                        const temp = body[key];
                        if(temp.endsWith(',')) {
                            body[key] = temp.slice(0, -1);
                        }
                    }
                    if(key == 'email') {
                        body[key] = body[key].toLowerCase();
                    }
                    if(key == 'username') {
                        body[key] = body[key].toLowerCase();
                    }
                }
            }
        })
    return body;
}

// manipulate query data for boolean values(can be either boolean or string in request)
function trim_query(query) {
    Object.keys(query).forEach(key => {
        if(query[key] == 'true') {
            query[key] = true;
        } else if(query[key] == 'false') {
            query[key] = false;
        }
    })
    return query;
}

//trim params for useless spaces
function trim_params(params) {
    Object.keys(params).forEach(key => {
        params[key] = params[key].trim();
    })
    return params;
}

//function to handle body, query, params
module.exports.transform = (req, res, next) => {
    let { body, params, query} = req;
    if(is_obj(body) && Object.keys(body).length > 0) {
        body = trim(body);
    }
    if(is_obj(params) && Object.keys(params).length > 0) {
        params = trim_params(params);
    }
    if(is_obj(query) && Object.keys(query).length > 0) {
        query = trim_query(query);
    }
    next();
}
