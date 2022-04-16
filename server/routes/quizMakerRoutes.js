const express = require('express');
const router=express.Router();
const homePageController=require('../controllers/homePageController');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/',homePageController.homepage);

router.get('/login',homePageController.loginpage);
router.post('/login',homePageController.validateLogin);

router.get('/register',homePageController.registerpage);
router.post('/register',homePageController.registerUser);

router.get('/landinPage',homePageController.landinPage);

router.get('/flow1',homePageController.flow1);
router.get('/viewquiz',homePageController.viewQuiz);

router.get('/searchQuizzes',homePageController.searchQuizzes);

router.get('/searchQuizById',homePageController.searchQuizById);

router.get('/attemptQuiz',homePageController.attemptQuiz);
router.post('/submitQuiz',homePageController.submitQuiz);
router.get('/resultPage',homePageController.resultPage);

router.post('/createQuiz',homePageController.createQuiz);

router.get('/logout',homePageController.logout);

module.exports=router;