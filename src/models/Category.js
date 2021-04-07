const CategoryException = require('../exceptions/CategoryException');
const Model = require('./Model');
const User = require('./User');

class Category extends Model {


    constructor(id, userID, title, description, user, createdAt, editedAt, deletedAt,) {

        super(id);
        this.userID=userID;
        this.title=title;
        this.description=description;
        
        if (user==undefined){
            this.user=null;
        }
        else {
            this.user=user;
        }

        this.createdAt= new Date();
       
        if(editedAt==undefined){
            this.editedAt=null;
        }
        else{
         this.editedAt=editedAt;
        }
 
        if(deletedAt==undefined){
         this.deletedAt=null;
        }
      else{
       this.deletedAt=deletedAt;
       }
       
       
     }

     static async create(userID, title, description)
     {
        let user=await User.findById(userID);

       if(title==""){
           throw new CategoryException("Cannot create Category: Missing title.")
       }

       if(user==null){
           throw new CategoryException(`Cannot create Category: User does not exist with ID ${userID}.`)
       }

        const connection = await Model.connect();
		let results;
	
        const dupCheckNameSQL=`SELECT title FROM category WHERE title= ?`;


		let dupCheckName= await connection.execute(dupCheckNameSQL, [title]);

		if (dupCheckName[0].length!=0){
            await connection.end();

			 throw new CategoryException('Cannot create Category: Duplicate title.');
		}

		try {
 
			const sql=`INSERT INTO category (user_id, title, description) VALUES (?, ?, ?)`;
            [results]= await connection.execute(sql, [userID, title, description]);	
			}
			catch(error){
				console.log(error);
			}
			finally{
				await connection.end();
			}

		

        return new Category(results.insertId, userID, title, description, user, null, null, null);



     }


static async findById(id)
{
    const connection = await Model.connect();  
		let results;

		try {
 
			const sql=`SELECT * FROM category WHERE id=?`;
            [results]= await connection.execute(sql, [id]);

		
		}
		catch(error){
			console.log(error);

		}
		finally{
			connection.end();
		}

		if (results.length==0){
            
			return null;
		}

		//this.edited=true;
		return new Category(results[0].id, results[0].userID, results[0].title, results[0].description, results[0].user, results.created_at, results[0].edited_at, results[0].deleted_at)
		
}

static async findByTitle(title)
{
    const connection = await Model.connect();  
		let results;

		try {
 
			const sql=`SELECT * FROM category WHERE title=?`;
            [results]= await connection.execute(sql, [title]);

		
		}
		catch(error){
			console.log(error);

		}
		finally{
			connection.end();
		}

		if (results.length==0){
			return null;
		}

		//this.edited=true;
		return new Category(results[0].id, results[0].userID, results[0].title, results[0].description, results[0].user, results[0].edited_at, results[0].deleted_at)
		
}

static async findAll(){
		
    const connection = await Model.connect();

    const sql=`SELECT * FROM \`category\``;

    var categories=[];
    
    let results;

    try{
        [results] = await connection.query(sql);
    }
    catch(error){
        console.log(error);
        return null;
    }
    finally{
        await connection.end();
    }

    if(results.length==0){
        return [];
    }


    for (let i=0; i<results.length; i++){
       results[i].user= await User.findById(results[i].user_id);
        categories.push(new Category(results[i].id, results[i].user_id, results[i].title, results[i].description, results[i].user, results[i].edited_at, results[i].deleted_at));
    }

    

    return categories;



}


async save(){

    if(this.title==""){
       throw new CategoryException('Cannot update Category: Missing title.');
    }

    const connection = await Model.connect();
    

    let sqlUpdate=`UPDATE category SET title=?, description=?, edited_at=? WHERE id=?`;
                                                                                                             
    try{

      connection.execute(sqlUpdate, [this.title, this.description, new Date(), this.id]);  //null to fix dumb issue
    }
    catch(error){
        console.log(error);
        return false;
    }
    finally{
        await connection.end();
    }

    return true;

}

async remove(){

    const connection = await Model.connect();

    this.deletedAt=new Date();

    let sqlUpdate=`UPDATE category SET deleted_at=?`;

    try
    {
   
      connection.execute(sqlUpdate, [this.deletedAt]);					
    }
    catch(error){
        console.log(error);
        return false;
    }
    finally{
        await connection.end();
    }

    //let sqlUpdate=`UPDATE category SET title="deleted"`;
    
   /* try{

        connection.query(sqlUpdate);
    }
    catch(error){
        console.log(error);
        return false;
    }
    finally{
        await connection.end();
    }*/

   return true;

}






    getId() 
    {
     return this.id;
    }
  
    setId(id)
    {
     this.id = id;
    }

    getTitle() 
    {
     return this.title;
    }
  
    setTitle(title)
    {
     this.title = title;
    }

    getDescription() 
    {
     return this.description;
    }
  
    setDescription(description)
    {
     this.description = description;
    }

    //idk
    getUser() 
    {
       return this.user;
    }

    getCreatedAt(){
        return this.createdAt;
    }

    getEditedAt(){
        if (this.editedAt==undefined){
			return null;
		}
		return this.editedAt
    }
   
    getDeletedAt(){
        if (this.deletedAt==undefined){
			return null;
		}

		return this.deletedAt;
    }

    
    
      
}



module.exports = Category;
