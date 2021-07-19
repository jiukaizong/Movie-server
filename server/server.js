var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var express = require("express");
var ObjectID = require('mongodb').ObjectID;
var app = express();
var us = {};
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(400);
    else
        next();

})

/**
 * Verify that the password is repeated
 */
app.post('/checkUsername', function (req, res) {
    var user = {
        username: req.body.username
    }
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("movie")
        dbo.collection("user").find(user).toArray(function (err, result) {
            if (err) throw err;
            if (result.length > 0) {
                console.log("User already exists");
                db.close();
                res.send({
                    status: 400,
                    check: false,
                    text: "User already exists！"
                });
            } else {
                console.log("The user does not exist.");
                db.close();
                res.send({
                    status: 200,
                    check: true,
                    text: "The user does not exist."
                });
            }
        })
    })
})
/**
 * register
 * @param username
 * @param password
 */
app.post('/register', function (req, res) {
    var user = {
        username: req.body.username,
        password: req.body.password,
        state: 0
    }
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("movie");
        dbo.collection("user").insertOne(user, function (err, result) {
            if (err) throw err;
            console.log("Register account successful");
            db.close();
            res.send({
                status: 200,
                text: "Register account successful！"
            });
        })
    })
})
/**
 * Modify user status
 * @param username
 */
app.post('/status', function (req, res) {
    var user = {
        username: req.body.username
    }
    var newUser = {
        $set: {
            "state": req.body.state
        }
    };
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("movie");
        dbo.collection("user").updateOne(user, newUser, function (err, res) {
            if (err) {
                res.send({
                    status: 400,
                    text: "updata account failed！"
                });
            } else {
                console.log("updata account successful");
                db.close();
                res.send({
                    status: 200,
                    text: "updata account successful！"
                });
            }
        });
    })
})

/**
 * login
 * @param username 
 * @param password
 */
app.post('/login', function (req, res) {
    var user = {
        username: req.body.username,
        password: req.body.password
    }
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("movie")
        dbo.collection("user").find(user).toArray(function (err, result) {
            if (err) throw err;
            if (result.length > 0) {
                console.log(user.username + "land successfully！");
                db.close();
                res.send({
                    status: 200,
                    token: true,
                    text: "land successfully！",
                    data: result[0]
                });
            } else {
                console.log(user.username + "Incorrect user name or password");
                db.close();
                res.send({
                    status: 400,
                    token: false,
                    text: "Incorrect user name or password"
                });
            }
        })
    })
})

/**
 * Paging gets the movie home page
 * @param page 
 * @param rows
 */
app.get('/movies/all', function (req, res) {
    let page = parseInt(req.query.page)
    let rows = parseInt(req.query.rows)
    // console.log(rows)
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("movie");
        var query = dbo.collection("movie").find({});

        query.skip((page - 1) * rows);
        query.limit(rows);
        query.toArray(function (err, rs) {
            if (err) throw err;
            dbo.collection("movie").find({}).project({
                _id: 1,
                Title: 1,
                Year: 1,
                Rated: 1,
                Runtime: 1,
                Poster: 1
            }).toArray(function (err, result) {
                // console.log(result.length)
                responseResult = {
                    total: result.length,
                    movieList: rs
                };
                db.close();
                res.send(responseResult);
            })
        });
    });
})

/**
 * Get movie information based on ID
 * @param movieId
 */
app.get('/movies/movie', function (req, res) {
    console.log(req.query.movieId)
    var movie = {
        _id: ObjectID(req.query.movieId)
    }
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("movie");
        dbo.collection("movie").find(movie).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            res.send({
                status: 200,
                text: "The query is successful！",
                data: result
            });
        })
    })
})
/**
 * The new movie
 * @param movie
 */
app.post('/addMovie', function (req, res) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("movie");
        var newMovie = req.body.newMovie
        dbo.collection("movie").insertOne(newMovie, function (err, res) {
            if (err) {
                res.send({
                    status: 400,
                    text: "The insert is falied！"
                });
            } else {
                console.log("The insert is successful");
                db.close();
                res.send({
                    status: 200,
                    text: "The insert is successful！"
                });
            }
        });
    });
})

/**
 * Query artist under all movie information
 * @param personId
 */
app.get('/people', function (req, res) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("movie");
        var _filter = {
            //Multi-field matching
            $or: [{
                    Writer: new RegExp(req.query.name)
                },
                {
                    Actors: new RegExp(req.query.name)
                },
                {
                    Director: new RegExp(req.query.name)
                },
            ]
        }
        // console.log(_filter)
        dbo.collection("movie").find(_filter).toArray(function (err, result) {
            if (err) {
                res.send({
                    status: 400,
                    text: "The query is failed！"
                });
            } else {
                res.send({
                    status: 200,
                    text: "The query is successful！",
                    data: result
                });
            }
            db.close();
        })

    })
})
/**
 * Search for movie information
 * @param type 1:title 2:year 3:keyword 4:minrating
 * @param title
 * @param keyword
 * @param year
 * @param minrating
 */
app.post('/search', function (req, res) {
    let type = parseInt(req.body.type)
    let page = parseInt(req.body.page)
    let rows = parseInt(req.body.rows)
    var key;
    switch (type) {
        case 1:
            key = {
                Title: new RegExp(req.body.keyword, "i")
            };
            break;
        case 2:
            key = {
                Year: req.body.keyword
            };
            break;
        case 3:
            key = {
                Genre: new RegExp(req.body.keyword, "i")
            };
            break;
    }
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("movie");
        if (type == 1 || type == 2 || type == 3) {
            var query = dbo.collection("movie").find(key);
            query.skip((page - 1) * rows);
            query.limit(rows);
            query.toArray(function (err, rs) {
                if (err) throw err;
                dbo.collection("movie").find(key).project({
                    _id: 1,
                    Title: 1,
                    Year: 1,
                    Rated: 1,
                    Runtime: 1,
                    Poster: 1
                }).toArray(function (err, result) {
                    // console.log(result.length)
                    responseResult = {
                        total: result.length,
                        movieList: rs
                    };
                    db.close();
                    res.send(responseResult);
                })
            });
        } else {
            dbo.collection("movie_evaluation").aggregate([{
                    "$group": {
                        _id: "$by_Title",
                        avgRating: {
                            "$avg": "$rate"
                        },
                        total: {
                            $sum: 1
                        }
                    }
                },
                {
                    "$match": {
                        avgRating: {
                            "$gte": req.body.keyword
                        }
                    }
                },
                {
                    '$skip': (page - 1) * rows
                },
                {
                    '$limit': rows
                }
            ]).toArray(function (err, result) {
                if (err) {
                    res.send({
                        status: 400,
                        text: "The query is failed！"
                    });
                } else {
                    res.send({
                        status: 200,
                        text: "The query is successful！",
                        data: result
                    });
                }
            })
        }
    });
})

app.post('/searchPerson', function (req, res) {
    let page = parseInt(req.body.page)
    let rows = parseInt(req.body.rows)
    var key;
    key = {
        name: new RegExp(req.body.keyword, "i")
    };
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("movie");
        var query = dbo.collection("other_user").find(key);
        query.skip((page - 1) * rows);
        query.limit(rows);
        query.toArray(function (err, rs) {
            if (err) throw err;
            dbo.collection("other_user").find(key).toArray(function (err, result) {
                // console.log(result.length)
                responseResult = {
                    total: result.length,
                    personList: rs
                };
                db.close();
                res.send(responseResult);
            })
        });

    });
})

/**
 * Add a review to the film
 * @param movieId
 * @param personId
 * @param title
 * @param description
 * @param rate
 */
app.post('/add/movieEvaluation', function (req, res) {
    var evaluation = {
        movieId: req.body.movieId,
        name: req.body.name,
        title: req.body.title,
        description: req.body.description,
        rate: req.body.rate
    }
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("movie");
        dbo.collection("movie_evaluation").insertOne(evaluation, function (err, result) {
            if (err) {
                res.send({
                    status: 200,
                    text: "add movie evaluation falied！"
                });
            } else {
                console.log("电影增加评论成功");
                db.close();
                res.send({
                    status: 200,
                    text: "add movie evaluationsuccessful！"
                });
            }
        })
    })
})
/**
 * Check all reviews of the movie
 * @param movieId
 */
app.post('/movie/evaluation', function (req, res) {
    var evaluation = {
        movieId: req.body.movieId
    }
    console.log(req.body.movieId)
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("movie");
        dbo.collection("movie_evaluation").find(evaluation).toArray(function (err, result) {
            if (err) throw err;
            console.log("电影查询成功");
            db.close();
            res.send({
                status: 200,
                text: "The query is successful！",
                data: result
            });
        })
    })
})

/**
 * Query the list of all users of interest under that user
 * @param personId
 */
app.get('/people/watch', function (req, res) {
    var person = {
        username: req.query.username
    }
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("movie");
        dbo.collection("user_watch").find(person).toArray(function (err, result) { // 返回集合中所有数据
            if (err) throw err;
            db.close();
            res.send({
                status: 200,
                text: "The query is successful！",
                data: result
            });
        });
    });
})

/**
 *Query all trace lists for the user
 * @param personId
 */
app.get('/people/track', function (req, res) {
    var person = {
        username: req.query.username
    }
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("movie");
        dbo.collection("user_track").find(person).toArray(function (err, result) { // 返回集合中所有数据
            if (err) throw err;
            db.close();
            res.send({
                status: 200,
                text: "The query is successful！",
                data: result
            });
        });
    });
})


var server = app.listen(3000, '127.0.0.1', function () {
    var host = server.address().address
    var port = server.address().port
    console.log(host, port)
})