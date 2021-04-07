const Controller = require('./Controller');
const Post = require('../models/Post');
const Category = require('../models/Category');
const User = require('../models/User');

class PostController extends Controller {

    constructor(request, response){

        super(request);
        this.response=response;
        var didSomething=false;
        this.action;

        if (this.request.requestMethod=='POST'){
           this.action=this.new;
           this.setAction(this.action);
           didSomething=true;
        }

    if(this.request.parameters.header==undefined || this.request.parameters.header[0]==undefined) 
   {
        if (this.request.requestMethod=='GET'){
            this.action=this.list;
            this.setAction(this.action);
            didSomething=true;
         }
   }
   else{
    if (this.request.requestMethod=='GET'){ // i think
        this.action=this.show;
        this.setAction(this.action);
        didSomething=true;
    }
   }

   

        if (this.request.requestMethod=='PUT'){
            this.action=this.edit;
            this.setAction(this.action);
            didSomething=true;
        }

        if (this.request.requestMethod=='DELETE'){
            this.action=this.destroy;
            this.setAction(this.action);
            didSomething=true;
         }


        if(didSomething==false){
           this.action=this.err;

        }



        //this.action=this.home()
    }


    async new(){
        this.response.payload=await Post.create(this.request.parameters.body.userID, this.request.parameters.body.categoryID, this.request.parameters.body.title,this.request.parameters.body.type, this.request.parameters.body.content, this.request.parameters.body.user, this.request.parameters.body.category )//what do I fill it with
        
        if(this.response.payload==null || this.request.parameters.body.title==''||this.request.parameters.body.content==''|| this.response.payload.type=='' || this.response.payload.user==null || this.response.payload.category==null){

            this.response.statusCode=400;
            this.response.message="Post not created.";
            this.response.payload={};
            this.response.setResponse(this.response);
            return this.response;

        }

         this.response.setResponse(this.response)
         this.response.message="Post created successfully!";
         this.response.payload.createdAt=null;
         return this.response;
 
 
     }
 
    async list(){
         this.response.payload=await Post.findAll();

         for (let i=0; i<this.response.payload.length; i++)
         {
            this.response.payload[i].user=await User.findById(this.response.payload[i].userID);
            this.response.payload[i].category=await Category.findById(this.response.payload[i].categoryID);
         }

         this.response.setResponse(this.response);
         this.response.message="Posts retrieved successfully!";
         this.response.statusCode=200;
         return this.response;
 
 
         
     }
 
    async show(){
 
         this.response.payload=await Post.findById(this.request.parameters.header[0]); //the tests are treating this method like list???
         this.response.payload=this.response.payload;

         if(this.response.payload==null){
            this.response.statusCode=400;
            this.response.message="Post not retrieved.";
            this.response.payload={};
            this.response.setResponse(this.response);
            return this.response;
         }
         this.response.payload.user= await User.findById(this.response.payload.userID);
         this.response.payload.category=await Category.findById(this.response.payload.category_id)
         this.response.setResponse(this.response);
         this.response.message="Post retrieved successfully!";
         this.response.statusCode=200;
         return this.response;
 
     }
 
     async edit(){
         
        let bruh = await Post.findById(parseInt(this.request.parameters.header[0]));

        if (bruh == null || bruh==false || this.request.parameters.body.content=="" || bruh.type=="URL") {
            this.response.setResponse({ statusCode: 400, message: "Post not updated.", payload: {} })

        }
        else {

            if (bruh.content != this.request.parameters.body.content) {
                bruh.setContent(this.request.parameters.body.content);
            }

            await bruh.save();

        
            bruh = await Post.findById(parseInt(this.request.parameters.header[0]));
            this.response.setResponse({ statusCode: 200, message: "Post updated successfully!", payload: bruh });
        }

        return this.response;
     }
 
     async destroy(){
 
        let bruh = await Post.findById(parseInt(this.request.parameters.header[0]));

        if(bruh==null || bruh==false){
            this.response.setResponse({ statusCode: 400, message: "Post not deleted.", payload: {} })
            return this.response;
        }

        await bruh.remove();
        this.response.setResponse({ statusCode: 200, message: "Post deleted successfully!", payload: bruh });
        return this.response;
 
     }
 
     err(){
         this.response.message='Invalid request method!';
         this.response.statusCode=405;
         return this.response;
         //this.response.setResponse(this.response);
     }

     //this.response.payload= await Post.create(this.request.parameters.body.userID, this.request.parameters.body.categoryID, this.request.parameters.body.title,this.request.parameters.body.type, this.request.parameters.body.content, this.request.parameters.body.user, this.request.parameters.body.category )//what do I fill it with

}

module.exports = PostController;
