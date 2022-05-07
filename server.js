const express = require('express');
const bcrypt = require('bcrypt-nodejs');

const cors= require('cors');
const knex=require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
//knex.select is not a function ,bcoz of this error we assigned kex to postgres
const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'user',
    database : 'smartbrain'
  } 
});
//3306 

// db.select('*').from('users').then(data=>{
// 	console.log(data);
// });

const app = express();
app.use(cors());
// without writing this error coning can't read property of undefined 

app.use(express.json());
// const database={
// 	users:[
// 	{
// 		id:'123',
// 		name:'john',
// 		email:'john@gmail.com',
// 		password:'cookies',
// 		entries:0,
// 		joined:new Date()
// 	},
// 	{
// 		id:'1234',
// 		name:'sally',
// 		email:'sally@gmail.com',
// 		password:'banana',
// 		entries:0,
// 		joined:new Date()
// 	}
     
// 	],
// 	login:[
//      {
//      	id:'989',
//      	hash:'',
//      	eamil:'john@gmail.com'
//      }

// 	]
	
// }

 

app.get('/',(req,res)=>{
	// res.send('this is working');
	res.send('it is working');

})

//-----------signIn--------------------------

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

//---------------register---------------------

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})

//-------------app user profile:id--------

//we still have id here after profile as for future purpose we may make dedicated user pages for users 
app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})

//---------------image entries Updation---

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res,db)})

//------------bycrypt--------------------
// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });





app.listen(process.env.PORT||3000,()=>{
	console.log('app is running on port ${process.env.PORT}');
})




/* 

/ -->respose = this is working
/signin --> POST = success/fail


/register -->POST = user
/profile/:userId --> GET = user
/image --> PUT --> user


*/










