



const handleProfileGet = (req,res,db)=>{
   const {id} = req.params;//params are  Id
  // let found= false;
  db.select('*').from('users').where({id:id})
  .then(user=>{
  	// console.log(user)
  	if(user.length){
  			res.json(user[0])// doing this as [] empty array is true in JS
  		}else{
  			res.status(400).json('not Found')
  		}
  
  })
  .catch(err=>res.status(400).json('error getting user: '+err))
   // database.users.forEach(user=>{
   // 	  if(user.id===id){
   // 	  	//return will come here or we will not able to access second person data from id
   // 		 //cannot set header after sending to clints
   // 		 found=true;
   // 		 return res.json(user);
   // 	  }
   	   
   // })
   // if (!found){res.status(400).json('not found');}

}

module.exports={
	handleProfileGet
}





