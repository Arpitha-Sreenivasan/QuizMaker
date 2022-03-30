const {MongoClient} =require('mongodb');

let newQuiz={"id": "ghi789",
"details": {
    "title": "Quiz3",
    "Questions": [
        {
            "QueNum": 1,
            "QuestionText": "What is your name?",
            "Options": [
                "option1",
                "option2",
                "option3",
                "option4"
            ],
            "Answers": [
                "option3",
                "option2"
            ]
        },
        {
            "QueNum": 2,
            "QuestionText": "How are you?",
            "Options": [
                "option1",
                "option2",
                "option3"
            ],
            "Answers": [
                "option2"
            ]
        },
        {
            "QueNum": 3,
            "QuestionText": "What is your name?",
            "Options": [
                "option1",
                "option2",
                "option3",
                "option4",
                "option5"
            ],
            "Answers": [
                "option5",
                "option2"
            ]
        }
    ]
}}

async function main(){
    const dbpath='mongodb+srv://QuizMaker123:quizpass@quizcluster.fisgy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

    const client=new MongoClient(dbpath);
    try{
        await client.connect();
        await listDbs(client);
        //await InsertOneRecord(client,"Users",{email:"ghi@gmail.com",password:"pass1"});
        //await FindQuizByID(client,"CreateQuiz","Arpitha123");
        await AddQuizToUser(client,"CreateQuiz",newQuiz,"Arpitha123");
    }catch(e){
        console.error(e);
    }
    finally{
        await client.close();
    }
}

main().catch(console.error);

async function listDbs(client){
    const dbs=await client.db().admin().listDatabases();
    dbs.databases.forEach(db =>{
        console.log(`${db.name}`);
    })
}

async function InsertOneRecord(client,table,newRec){
    const res=await client.db("QuizMaker").collection(table).insertOne(newRec);
    console.log(res.insertedId);
}

async function InsertManyRecord(client,table,newRec){
    const res=await client.db("QuizMaker").collection(table).InsertManyRecord(newRec);
    console.log(res.insertedId);
}

async function FindQuizByID(client,table,quizId){
    const res=await client.db("QuizMaker").collection(table).findOne({ username: quizId});
    if(res){
        console.log("data:"+res.Quizzes[0].id);
    }
    else{
        console.log("No data found "+res);
    }
}

//to append quiz to creator can also be used in attempt quiz
async function AddQuizToUser(client,table,quizObj,name){
    const res=await client.db("QuizMaker").collection(table).updateOne({username: name},{ $push:{Quizzes: quizObj}});

}