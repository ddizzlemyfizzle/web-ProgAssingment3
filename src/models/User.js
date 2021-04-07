const UserException = require('../exceptions/UserException');
const Model = require('./Model');

class User extends Model {

    constructor(id, username, email, password, createdAt, editedAt, deletedAt, avatar) {

	   super(id);
	   this.username=username;
	   this.email=email;
       this.password=password;
	 
      this.avatar=avatar;
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
       ; 
	}

	

    static async create( userName, email, password) 
    {

		if(userName==""){
			throw new UserException("Cannot create User: Missing username.")
		}

		if(email==""){
			throw new UserException("Cannot create User: Missing email.")
		}

		if(password==""){
			throw new UserException("Cannot create User: Missing password.")
		}

        const connection = await Model.connect();
		let results;
	
        const dupCheckNameSQL=`SELECT username FROM user WHERE username= ?`;
		const dupCheckEmailSQL=`SELECT email FROM user WHERE email= ?`;


		let dupCheckName= await connection.execute(dupCheckNameSQL, [userName]);

		let dupCheckEmail= await connection.execute(dupCheckEmailSQL, [email]);

		if (dupCheckName[0].length!=0 ){
			await connection.end();
			throw new UserException("Cannot create User: Duplicate username.")
		}

		if(dupCheckEmail[0].length!=0){
			await connection.end();
           throw new UserException("Cannot create User: Duplicate email.")
		}



		try {
 
			const sql=`INSERT INTO user (username, email, password) VALUES (?, ?, ?)`;
            [results]= await connection.execute(sql, [userName, email, password]);

		


			}
			catch(error){
				console.log(error);
			}
			finally{
				await connection.end();
			}

		

        return new User(results.insertId, userName, email, password, null, null, null);



    }


	static async findById(id)
	{
		const connection = await Model.connect();  
		let results;

		if(id==undefined){
			id=1;
		}

		try {
 
			const sql=`SELECT * FROM user WHERE id=?`;
            [results]= await connection.execute(sql, [id]);

		
		}
		catch(error){
			console.log(error);

		}
		finally{
			connection.end();
		}

		if (results.length==0 || results[0].username==""|| results[0].email==""){
			return null;
		}

		//this.edited=true;
		return new User(results[0].id, results[0].username, results[0].email, results[0].password, results[0].created_at, results[0].edited_at, results[0].deleted_at, results[0].avatar)
		

	}


	static async findByEmail(email)
	{
		const connection = await Model.connect();  
		let results;

		try {
 
			const sql=`SELECT * FROM user WHERE email=?`;
            [results]= await connection.execute(sql, [email]);

		
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

		return new User(results[0].id, results[0].username, results[0].email, results[0].password, results[0].created_at, results[0].edited_at, results[0].deleted_at)
		

	}


	static async findByUsername(username){

		const connection = await Model.connect();  
		let results;

		try {
 
			const sql=`SELECT * FROM user WHERE username=?`;
            [results]= await connection.execute(sql, [username]);

		
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

		return new User(results[0].id, results[0].username, results[0].email, results[0].password, results[0].created_at, results[0].edited_at, results[0].deleted_at)
	}

	static async findAll(){
		
		const connection = await Model.connect();
	
		const sql=`SELECT * FROM \`user\``;
	
		var users=[];
		
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
			users.push(new User(results[i].id, results[i].username, results[i].email, results[i].password, results[i].edited_at, results[i].deleted_at));
		}
	
		
	
		return users;
	
	
	
	}


	 async save(){
        


		if(this.username==""){
			throw new UserException("Cannot update User: Missing username.")
		}

		if(this.email==""){
			throw new UserException("Cannot update User: Missing email.")
		}
		
		const connection = await Model.connect();
		
	    this.editedAt=new Date();
		//this.edited=true;

	
		//let sqlUpdate=`UPDATE user SET username=?, password=?, email=?, edited_at=? WHERE id=?`;
		let sqlUpdate2=`UPDATE user SET username=?, password=?, email=?, edited_at=?, avatar=? WHERE id=?`;
		
		let sqlUpdate=`UPDATE user SET username=?, password=?, email=?, edited_at=? WHERE id=?`;

                                                                                                                  
		try{

			if(this.avatar!=undefined){
				connection.execute(sqlUpdate2, [this.username, this.password, this.email, this.editedAt, this.avatar, this.id]);

			}
			else{
				connection.execute(sqlUpdate, [this.username, this.password, this.email, this.editedAt, this.id]);
				
			}
			//connection.query(sqlUpdate2);
			
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

	async remove() 
	{

		const connection = await Model.connect();

		this.deletedAt=new Date();

		let sqlUpdate=`UPDATE user SET deleted_at=?`;

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

	 async click () {

		var username=document.getElementsByName("username")[0];
		var email=document.getElementsByName("email")[0];
		var password=document.getElementsByName("password")[0];

		 await create(username, email, password );

		 document.getElementById("title").innerText=document.getElementById("Name").value;
		
	}

    


    getId() {

		
	  return this.id;
	}

	setId(id) {
		this.id = id;
	}

	getUsername(){
		return this.username;
	}

	setUsername(userName){
		 this.username=userName;
	}

	setPassword(password){
		this.password=password;
   }

	getEmail() {
		return this.email;
	}

	setEmail(email) {
		this.email=email;
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

	getAvatar(){
		return this.avatar;
	}

	setAvatar(avatar){

		this.avatar=avatar;

	}

	getId() 
    {
     return this.id;
    }
  
    setId(id)
    {
     this.id = id;
    }

}

module.exports = User;
