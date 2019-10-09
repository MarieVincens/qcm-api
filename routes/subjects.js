var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

/* GET /subjects/ La liste des sujets. */
/*router.get('/', function(req, res) {
    const { db } = req.app.locals;
    db.collection('subjects').aggregate([
        {
            '$unwind': {
                'path': '$questions'
            }
            }, {
            '$match': {
                'questions.isValid': true
            }
            }, {
            '$group': {
                '_id': {
                'id': '$_id', 
                'title': '$title'
                }, 
                'nbquestions': {
                '$sum': 1
                }
            }
            }
        ]).toArray((err, subjects) => res.json(subjects));
    });*/

    router.get('/', function(req, res) {
        const { db } = req.app.locals;
        db.collection('subjects').find().toArray((err, subjects) => res.json(subjects));
    });

/* GET /subjects/:id. La liste des question par sujet */
router.get('/:id', (req, res) => {
    const { db } = req.app.locals;
    const { id } = req.params;
    db.collection('subjects').findOne({ _id: new ObjectID(id) }, (err, subject) => res.json(subject));
});

/* PUT /subjects/:id. ajouter une question au sujet */
router.put('/:id', (req, res) => {
    const { db } = req.app.locals;
    const { id } = req.params;
    db.collection('subjects').updateOne({ _id: new ObjectID(id) }, { $push: {questions: req.body} }, (err, question) => res.json(questions));
});

module.exports = router;