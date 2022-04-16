require('../models/db');
const Users = require('../models/Users');
const CreateQuiz = require("../models/CreateQuiz");
const AttemptQuiz = require("../models/AttemptQuiz");

var sess; //to store session details

/**
 * GET
 * homepage
 * 
 */
exports.homepage = async (req, res) => {
    //res.render('index', { title: "Welcome to Quiz Maker" });
    res.sendFile('./home.html',{
        root: './public'
    });

}

/**
 * GET /login
 * loginpage
 */
exports.loginpage = async (req, res) => {
    sess = req.session;
    if (sess.email) {
        res.render('landinPage', { flow1: sess.type });
    }
    else
        res.render('login', { title: "Login" });
}

/**
 * POST /login
 * validateLogin - takes input from login page and checks in db
 */
exports.validateLogin = (req, res) => {
    try {
        const email = req.body.email;
        const pass = req.body.password;
        const type = req.body.type;
        Users.findOne({ 'email': email }).then((record) => {
            if (record == null) {
                //res.render('login', { title: "Login", displayMessage: "No such user" });
                res.status(404).json({success: false, error:'No such user found'});
            }
            else {
                if (record.password == pass) {
                    sess = req.session;
                    sess.email = email;
                    sess.type = type;
                    //res.render('landinPage', { flow1: sess.type });
                    res.status(200).json({success: true, error:'Login Successfull'});
                }
                else {
                    //res.render('login', { title: "Login", displayMessage: "Invalid username or password" });
                    res.status(404).json({success: false, error:'Invalid username or password'});
                }

            }
        });

    }
    catch (error) {
        console.log(error);
    }

}

/**
 * GET /registration
 * registerpage
 */
exports.registerpage = async (req, res) => {
    res.render('register', { title: "Registration" });
}

/**
 * POST /registration
 * registerUser
 */
exports.registerUser = async (req, res) => {
    try {
        const email = req.body.email;
        const pass = req.body.password;
        
        const recordObj = { 'email': email, 'password': pass };

        Users.findOne({ 'email': email }).then((record) => {
            if (record == null) {

                Users.insertMany([recordObj]).then(() => {
                    res.status(200).json({success: true, error:'Registration Successfull'});
                }).catch(err => res.render('register', { title: "Registration", displayMessage: "Server error!" }));
            }
            else {
                res.status(404).json({success: false, error:'Email exists'});
            }
        });

    }
    catch (error) {
        console.log(error);
    }
}

/**
 * GET /landingPage
 * landinPage
 */
exports.landinPage = async (req, res) => {
    res.render('landinPage', { flow1: sess.type });
}


/**
 * GET /flow1
 * flow1
 */
exports.flow1 = async (req, res) => {
    if (sess.type == 'Create Quiz') {
        res.render('createQuiz', { title: sess.type });
    }
    else
        res.render('attemptQuiz', { title: sess.type, result: '' });
}


/**
 * GET /viewQuiz
 * viewQuiz
 */
exports.viewQuiz = async (req, res) => {
    res.render('viewQuiz', { title: 'View Quiz', type: '' });
}

/**
 * GET /searchQuizzes
 * searchQuizzes
 */
exports.searchQuizzes = async (req, res) => {
    try {
        let searchTerm = req.query.id;
        if (sess.type == 'Create Quiz') {
            CreateQuiz.findOne({ 'id': searchTerm, 'email': sess.email }).then((record) => {
                if (record != '' && record != null){
                    res.send(JSON.stringify(record));
                }  
                else
                res.status(404).json({success: false, error:'No such quiz found'});
            }).catch((err) => console.log(err));
        }
        else {
            AttemptQuiz.find({ 'id': searchTerm, 'email': sess.email }).then(async (record) => {
                if (record != '' && record != null){
                    const ansKey=await CreateQuiz.findOne({'id':searchTerm});
                    let quizCreator=ansKey.email;
                    let quizTitle=ansKey.details.title;

                    let quesObjArr=[];
                    let q=ansKey.details.questions;
                    let i=0;
                    ansKey.details.questions.forEach((q)=>{
                        let qNum=q.quesNumber;
                        let qText=q.questionText;
                        let options=q.options;
                        let correctAns=q.answers;
                        let optionsSelected=record[0].details[i].answers;
                        i++;
                        let qObj={
                            'questionNumber':qNum,
                            'questionText':qText,
                            'options':options,
                            'correctAns':correctAns,
                            'optionsSelected':optionsSelected
                        }
                        quesObjArr.push(qObj);
                    });
                    let obj={
                        'id':searchTerm,
                        'creatorEmail': quizCreator,
                        'quizTitle':quizTitle,
                        'marks':record[0].marks,
                        'quesCount':i,
                        'details':quesObjArr
                    }
                    res.send(JSON.stringify(obj));
                }
                    
                else
                res.status(404).json({success: false, error:'No such quiz found'});
            }).catch((err) => console.log(err));

        }
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

/**
 * GET /searchQuizById
 * searchQuizById
 * used in attemptQuiz
 */
exports.searchQuizById = async (req, res) => {
    try {
        let searchTerm = req.query.id;
        CreateQuiz.findOne({ 'id': searchTerm }).then((record) => {
            if (record != '' && record != null) {
                AttemptQuiz.find({ 'id': searchTerm, 'email': sess.email }).then((rec) => {
                    if (rec != '' && rec != null) {
                        //res.render('attemptQuiz', { title: 'Attempt Quiz', 'result': record, 'flag': 'attempted' });
                        res.status(400).json({success:false,error:"Quiz already attempted"});
                    }
                    else {
                        //res.render('attemptQuiz', { title: 'Attempt Quiz', 'result': record, 'flag': 'notattempted' });
                        res.send(JSON.stringify(record));
                    }
                });
            }
            else {
                //res.render('attemptQuiz', { title: 'Attempt Quiz', 'result': 'no' });
                res.status(404).json({success:false,error:"Quiz not found!"});
            }
        }).catch((err) => console.log(err));
    }
    catch (error) {
        console.log(error);
    }
}

/**
* GET /attemptQuiz
* attemptQuiz
*/
exports.attemptQuiz = async (req, res) => {
    try {
        let quizId = req.query.id;
        CreateQuiz.find({ 'id': quizId }).then((record) => {
            res.render('submitQuiz', { title: quizId, 'result': record });
        });

    }
    catch (error) {
        console.log(error);
    }
}

/**
* POST /submitQuiz
* submitQuiz
*/
exports.submitQuiz = async (req, res) => {
    try {

        const qid = req.body.qid;
        let qd = await CreateQuiz.findOne({ 'id': qid });
        let anskey = qd.details.questions;

        const b = req.body;
        const qCount = parseInt(b.quesCount);
        let detailsArr = [];
        let marks = 0;
        for (let i = 1; i <= qCount; i++) {
            let obj;
            if (typeof b[i + ''] != 'undefined') {
                if (typeof b[i + ''] == 'string') {
                    let arr = [];
                    arr.push(b[i + '']);
                    b[i + ''] = arr;
                }
                obj = {
                    'quesNumber': i,
                    'answers': b[i + '']
                }
            }
            else {
                obj = {
                    'quesNumber': i,
                    'answers': ['NA']
                }
            }
            let correct = JSON.stringify(b[i + '']) === JSON.stringify(anskey[i - 1].answers);
            if (correct)
                marks++;
            detailsArr.push(obj);
        }

        const recordToInsert = {
            'id': qid,
            'email': sess.email,
            'marks': marks,
            'details': detailsArr
        }
        AttemptQuiz.insertMany(recordToInsert).then(() => {
            console.log("Record inserted");
            //res.render('resultPage', { totalmarks: marks })
            res.send("<link rel='stylesheet' href='./css/styles.css'/><link rel='preconnect' href='https://fonts.googleapis.com'><link rel='preconnect' href='https://fonts.gstatic.com' crossorigin><link href='https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800&display=swap' rel='stylesheet'><script src='./js/createQuiz.js'></script><div><p>Quiz submitted!</p><p>Marks obtained= "+marks+"</p></div><button onclick='redirect()'>Back to home</button>");

        });


    }
    catch (error) {
        console.log(error);
    }
}

/**
 * GET /resultPage
 * resultPage
 * 
 */
exports.resultPage = async (req, res) => {
    res.render('resultPage', { totalmarks: req.marks });
}


/**
 * POST /createQuiz
 * createQuiz
 */
exports.createQuiz = async (req, res) => {
    try {
        let createData = req.body;
        const quizTitle = createData.quizTitle;
        const quesCount = parseInt(createData.questionCount);
        let questionsArr = [];
        for (let i = 1; i <= quesCount; i++) {
            let opArr = [], ansArr = [];
            if (typeof createData['textOpt-' + i] == 'string') {
                opArr.push(createData['textOpt-' + i]);
            }
            else
                opArr = createData['textOpt-' + i];

            if (typeof createData['checkbox-' + i] == 'string') {
                ansArr.push(createData['checkbox-' + i]);
            }
            else
                ansArr = createData['checkbox-' + i];

            let obj = {
                'quesNumber': i,
                'questionText': createData['ques-' + i],
                'options': opArr,
                'answers': ansArr
            };
            questionsArr.push(obj);
        }

        const details = {
            "title": quizTitle,
            "questions": questionsArr
        }
        let quizId = await generateQuizId();
        const record = {
            'id': quizId,
            'email': sess.email,
            'details': details
        }
        CreateQuiz.insertMany(record).then(() => {
            res.send("<link rel='stylesheet' href='./css/styles.css'/><link rel='preconnect' href='https://fonts.googleapis.com'><link rel='preconnect' href='https://fonts.gstatic.com' crossorigin><link href='https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800&display=swap' rel='stylesheet'><script src='./js/createQuiz.js'></script><div><p>Quiz created with ID : "+quizId+"</p><p>With id people will be able to attempt quiz</p></div><button onclick='redirect()'>Back to home</button>");
        });

    }
    catch (error) {
        console.log(error);
    }
}

/**
 * Api to create unique quiz id
 * @returns quiz id
 */
async function generateQuizId() {
    let id = Math.random().toString(36).slice(2);
    console.log("id=" + id);
    flag = true;
    while (flag) {
        let record = await CreateQuiz.findOne({ 'id': id });
        if (record == null || record == '') {
            flag = false;
            return id;
        }
        else {
            id = Math.random().toString(36).slice(2);
        }
    }

}

/**
 * get /logout
 * logout
 * 
 */
 exports.logout = async (req, res) => {
    req.session.destroy();
    res.status(200).json({success:true});
}

