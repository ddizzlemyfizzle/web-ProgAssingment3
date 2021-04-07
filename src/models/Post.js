const PostException = require('../exceptions/PostException');
const Category = require('./Category');
const Model = require('./Model');
const User = require('./User');

class Post extends Model {

    constructor(id, userID, category_id, title, type, content, user, category, createdAt, editedAt, deletedAt) {

        super(id);
        this.category_id=category_id;
        this.userID=userID;
        this.title=title;
        this.type=type;
        this.content=content;
        
        if (user==undefined){
            this.user=null;
        }
        else {
            this.user=user;
        }

        if (category==undefined){
            this.category=null;
        }
        else {
            this.category=category;
        }

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

        this.created_at= new Date();
  
     }


     static async create(userID, category_id, title, type, content)
     {
        let user=await User.findById(userID);
        let category=await Category.findById(category_id);

       if(title==""){
          throw new PostException('Cannot create Post: Missing title.');
       }

       if(type==""){
           throw new PostException('Cannot create Post: Missing type.');
       }

       if(content==""){
          throw new PostException('Cannot create Post: Missing content.')
       }

       if(user==null){
          throw new PostException(`Cannot create Post: User does not exist with ID ${userID}.`)
       }

       if(category==null){
           throw new PostException(`Cannot create Post: Category does not exist with ID ${category_id}.`)
       }

        const connection = await Model.connect();
		let results;

		try {
 
			const sql=`INSERT INTO post (user_id, category_id, title, type, content) VALUES (?, ?, ?, ?, ?)`;
            [results]= await connection.execute(sql, [userID, category_id, title, type, content]);	
			}
			catch(error){
				console.log(error);
			}
			finally{
				await connection.end();
			}

		

        return new Post(results.insertId, userID, category_id, title, type, content, user, category, null, null, null);



     }

     static async findById(id)
    {
       const connection = await Model.connect();  
		let results;
        

		try {
 
			const sql=`SELECT * FROM post WHERE id=?`;
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

        let user=await User.findById(results[0].user_id);
        let category=await Category.findById(results[0].category_id);

		//this.edited=true;
		return new Post(results[0].id, results[0].user_id, results[0].category_id, results[0].title, results[0].type, results[0].content, user, category, results[0].created_at, results[0].edited_at, results[0].deleted_at)
		
}

static async findAll(){
		
    const connection = await Model.connect();

    const sql=`SELECT * FROM \`post\``;

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
        //var pkmn=new Pokemon(results[i].id, results[i].name, results[i].type)
        categories.push(new Post(results[i].id, results[i].user_id, results[i].category_id, results[i].title, results[i].type, results[i].content, results[i].user, results[i].category, results.created_at[i], results[i].edited_at, results[i].deleted_at));
    }

    

    return categories;



}

async save(){

    if(this.content==""){
        throw new PostException('Cannot update Post: Missing content.');
    }

    if(this.type=='URL'){
        throw new PostException('Cannot update Post: Only text posts are editable.')
    }

    const connection = await Model.connect();

    let sqlUpdate=`UPDATE post SET content=?, edited_at=? WHERE id=?`;
                                                                                                             
    try{

      connection.execute(sqlUpdate, [this.content, new Date(), this.id]);  
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

    let sqlUpdate=`UPDATE post SET deleted_at=?`;

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
 
     getContent()
     {
      return this.content;
     }

     setContent(content)
     {
      this.content = content;
     }

     getType() 
     {
      return this.type;
     }

  
     getUser() 
     {
        return this.user;
     }

     setUser(user){
        this.user=user;
    }

     
     getCategory() 
     {
        return this.category;
     }

     setCategory(category){
         this.category=category
     }
 
     getCreatedAt(){
         return this.created_at;
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

module.exports = Post;
