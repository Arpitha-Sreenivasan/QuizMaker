const {MongoClient} =require('mongodb');

async function main(){
    const dbpath='mongodb+srv://QuizMaker123:quizpass@quizcluster.fisgy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

    const client=new MongoClient(dbpath);
    try{
        await client.connect();
        await listDbs(client);
        await InsertOneRecord(client,"Users",{email:"ghi@gmail.com",password:"pass1"});
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