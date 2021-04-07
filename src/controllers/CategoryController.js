const Controller = require('./Controller');
const Category = require('../models/Category');
const User = require('../models/User');

class CategoryController extends Controller {

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
        this.response.payload= await Category.create(this.request.parameters.body.userID, this.request.parameters.body.title, this.request.parameters.body.description, this.request.parameters.body.user)//what do I fill it with
        
        if(this.response.payload==null || this.request.parameters.body.title==''|| this.response.payload.user==null){

            this.response.statusCode=400;
            this.response.message="Category not created.";
            this.response.payload={};
            this.response.setResponse(this.response);
            return this.response;

        }

        await this.response.setResponse({
            // redirect:`user/${this.response.payload.id}`,
            statusCode:303,
             template:"/",
             categoryTitle:this.response.payload.title,
             categoryCreatedAt:this.response.payload.createdAt,
             categoryID:this.response.payload.id,
             
         }); 
 
         this.response.redirect(`/`);
 
     }
 
    async list(){
         this.response.payload=await Category.findAll();

         for (let i=0; i<this.response.payload.length; i++)
         {
            this.response.payload[i].user=await User.findById(this.response.payload[i].userID);
         }

         this.response.setResponse(this.response);
         this.response.message="Categories retrieved successfully!";
         this.response.statusCode=200;
         return this.response;
 
 
         
     }
 
    async show(){
 
         this.response.payload=await Category.findById(this.request.parameters.header[0]); //the tests are treating this method like list???
         this.response.payload=this.response.payload;

         if(this.response.payload==null){
            this.response.statusCode=400;
            this.response.message="Category not retrieved.";
            this.response.payload={};
            this.response.setResponse(this.response);
            return this.response;
         }
         this.response.payload.user= await User.findById(this.response.payload.userID);
         this.response.setResponse(this.response);
         this.response.message="Category retrieved successfully!";
         this.response.statusCode=200;
         return this.response;
 
     }
 
     async edit(){
         
        let bruh = await Category.findById(parseInt(this.request.parameters.header[0]));

        if (bruh == null || bruh==false || this.request.parameters.body.title=="" || this.request.parameters.body.description=="") {
            this.response.setResponse({ statusCode: 400, message: "Category not updated.", payload: {} })

        }
        else {

            if (bruh.title != this.request.parameters.body.title) {
                bruh.setTitle(this.request.parameters.body.title);
            }

            if (bruh.description != this.request.parameters.body.description) {
                bruh.setDescription(this.request.parameters.body.description);
            }


            if (await bruh.save()) {
                let fart = "poop";
            }
            else {
                let fart = "shart";
            }

            bruh = await Category.findById(parseInt(this.request.parameters.header[0]));
            this.response.setResponse({ statusCode: 200, message: "Category updated successfully!", payload: bruh });
        }

        return this.response;
     }
 
     async destroy(){
 
        let bruh = await Category.findById(parseInt(this.request.parameters.header[0]));

        if(bruh==null || bruh==false){
            this.response.setResponse({ statusCode: 400, message: "Category not deleted.", payload: {} })
            return this.response;
        }

        await bruh.remove();
        this.response.setResponse({ statusCode: 200, message: "Category deleted successfully!", payload: bruh });
        return this.response;

 
     }
 
     err(){
         this.response.message='Invalid request method!';
         this.response.statusCode=405;
         return this.response;
         //this.response.setResponse(this.response);
     }

}

module.exports = CategoryController;
