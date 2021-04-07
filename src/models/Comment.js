const CommentException = require('../exceptions/CommentException');
const Model = require('./Model');
const Post = require('./Post');
const User = require('./User');

class Comment extends Model {


    constructor(id, post_id, user_id, reply_id, commentRepliedTo, content, user, post, createdAt, editedAt, deletedAt) {

        super(id);
        this.post_id=post_id;
        this.user_id=user_id;
        this.reply_id=reply_id;
        this.post=post;

        this.commentRepliedTo=commentRepliedTo;

        if(reply_id==undefined){
            this.reply_id=null;
        }
        else{
            this.reply_id=reply_id;
        }

        this.content=content;
        
       if (user==undefined){
            this.user=null;
        }
        else {
            this.user=user;
        }

        

        if(editedAt==undefined){
            this.editedAt=null;
        }
        else{
            this.editedAt=editedAt;
        }

        this.deletedAt=deletedAt;
        this.createdAt= new Date();
      
       
     }


     static async create(user_id, post_id, content)
     {
        let user=await User.findById(user_id);
        let post=await Post.findById(post_id);
        let commentRepliedTo;        
        
    

       if(content==""){
           throw new CommentException(`Cannot create Comment: Missing content.`);
       }

       if(user==null){
           throw new CommentException(`Cannot create Comment: User does not exist with ID ${user_id}.`)
       }

       if(post==null){
           throw new CommentException(`Cannot create Comment: Post does not exist with ID ${post_id}.`)
       }

        const connection = await Model.connect();
		let results;

		try {
 
			const sql=`INSERT INTO comment (user_id, post_id, content) VALUES (?, ?, ?)`;
            [results]= await connection.execute(sql, [user_id, post_id, content]);	
			}
			catch(error){
				console.log(error);
			}
			finally{
				await connection.end();
			}

		

        if (results.insertId>1){
            commentRepliedTo=await this.findById(results.insertId-1);
        }
        else{
            commentRepliedTo=null;
        }

        return new Comment(results.insertId, post_id, user_id, this.reply_id, commentRepliedTo, content, user, post, null, null, null);



     }

     static async findById(id)
{
    const connection = await Model.connect();  
	let results;

		try {
 
			const sql=`SELECT * FROM comment WHERE id=?`;
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
        let post=await Post.findById(results[0].post_id);

		//this.edited=true;
		return new Comment(results[0].id, results[0].post_id, results[0].user_id, results[0].reply_id, results[0].commentRepliedTo, results[0].content, user, 
            post, results[0].created_at, results[0].edited_at, results[0].deleted_at)
		
}


static async findAll(){
		
    const connection = await Model.connect();

    const sql=`SELECT * FROM \`comment\``;

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
        categories.push(new Comment(results[i].id, results[i].post_id, results[i].user_id, results[i].reply_id, results[i].commentRepliedTo, results[i].content, results[i].user, results[i].post, results[i].created_at, results[i].edited_at, results[i].deleted_at));
    }

    

    return categories;



}

async save(){


    if(this.content==""){
        throw new CommentException('Cannot update Comment: Missing content.')
    }
    

    const connection = await Model.connect();

    this.editedAt=new Date();

    let sqlUpdate=`UPDATE comment SET content=?, edited_at=? WHERE id=?`;
                                                                                                             
    try{

      connection.execute(sqlUpdate, [this.content, this.editedAt, this.id]);  
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

    let sqlUpdate=`UPDATE comment SET deleted_at=?`;

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
 
     getContent()
     {
      return this.content;
     }

     setContent(content)
     {
      this.content = content;
     }

     getUser() 
     {
        return this.user;
     }

     getPost(){
         return this.post;
     }

     getRepliedTo(){
         return this.commentRepliedTo; //???
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

module.exports = Comment;
