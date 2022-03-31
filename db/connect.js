const {MongoClient} =require('mongodb');

async function main(){
    const dbpath='mongodb+srv://QuizMaker123:quiz@quizcluster.fisgy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

    const client=new MongoClient(dbpath);
    try{
        await client.connect();
        await listDbs(client);
        await InsertOneRecord(client,"Users",{email:"deleteuser@gmail.com",password:"pass1"});
        await DeleteRecord(client,{"email":"deleteuser@gmail.com"});
        
        await FindQuizByID(client,"CreateQuiz","abc123");
        await CheckQuizIdExists(client,"abc123");
        await CheckUserExists(client,"vivek@gmail.com");
        await GetUserPassword(client,"vivek@gmail.com");
        await FindAllQuizByUser(client,"vivek@gmail.com","CreateQuiz");
        await CheckQuizAlreadyAttempted(client,"vivek@gmail.com","ghi789");
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

async function FindQuizByID(client,table,quizId){
    const res=await client.db("QuizMaker").collection(table).findOne({ "id": quizId});
    if(res){
        console.log("data:"+res);
    }
    else{
        console.log("No data found "+res);
    }
}

async function CheckQuizIdExists(client,quizId){
    const result=await client.db("QuizMaker").collection("CreateQuiz").findOne({"id":quizId});
    if(result){
        console.log("Quiz id exists");
    }
    else{
        console.log("Quiz id does not exists");
    }
}
async function CheckUserExists(client,emailId){
    const result=await client.db("QuizMaker").collection("Users").findOne({"email":emailId});
    if(result){
        console.log("Email id exists");
    }
    else{
        console.log("Email id does not exists");
    }
}

async function GetUserPassword(client,emailId){
    const result=await client.db("QuizMaker").collection("Users").findOne({"email":emailId});
    if(result){
        console.log("Password: "+result.password);
    }
    else{
        console.log("Email id does not exists");
    }
}
async function FindAllQuizByUser(client,emailId,table){
    const result=await client.db("QuizMaker").collection(table).find({"username":emailId});
    if(result){
        // result.forEach((r)=>{
        //     console.log("Quiz: "+r);
        // });
        console.log(result);
    }
    else{
        console.log("No quiz found");
    }
}
async function CheckQuizAlreadyAttempted(client,emailId,quizId){
    const result=await client.db("QuizMaker").collection("AttemptQuiz").findOne({"id":quizId,"username":emailId});
    if(result){
        console.log("Quiz already attempted");
    }
    else{
        console.log("Quiz not attempted");
    }
}
async function DeleteRecord(client,query){
    const result=await client.db("QuizMaker").collection("Users").deleteOne(query);
    console.log(result);
}