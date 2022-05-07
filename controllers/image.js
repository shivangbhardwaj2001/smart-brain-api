const Clarifai=require('clarifai');
const app = new Clarifai.App({
	apiKey:'2917e6a6e70a41ec9b9ab7e66a3c5498'
});

const handleApiCall=(req,res)=>{
	app.models.predict(
		Clarifai.FACE_DETECT_MODEL,
	   req.body.input
	   //if your write this.state.imageUrl you will get error
	).then(data=>{
		res.json(data)
	})
      .catch(err=>res.status(400).json('unable to work with api'))
}

//--------------------------------------------------------------
const handleImage = (req,res,db)=>{

      const {id} = req.body;
 
      //----------------------
  db('users').where('id','=',id)
  .increment('entries',1)
  .returning('entries')
  .then(entries=>{
  	// console.log(parseInt(entries[0].entries))
     res.json(parseInt(entries[0].entries));
  })
 .catch(err=>res.status(400).json('unable to get entries'))
  //-------------------------------------
//   let found= false;
//    database.users.forEach(user=>{
//    	  if(user.id===id){
 
//    		 found=true; 
//    		 user.entries++;
//    		 console.log(user.entries);
//    		 return res.json(parseInt(user.entries));
//    	  }
   	   
//    })
//    if (!found){res.status(400).json('not found');}


 }
 
module.exports={
   handleImage,
   handleApiCall
}
