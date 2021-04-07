const Controller = require('./Controller');
const User = require('../models/User');

class UserController extends Controller {

    constructor(request, response) {

        super(request);
        this.response = response;
        var didSomething = false;
        this.action;

        if (this.request.requestMethod == 'POST') {

            this.action = this.new;
            this.setAction(this.action);
            didSomething = true;

        }

        if (this.request.parameters.header == undefined || this.request.parameters.header[0] == undefined) {
            if (this.request.requestMethod == 'GET') {
                this.action = this.list;
                this.setAction(this.action);
                didSomething = true;
            }
        }
        else {

             if(this.request.requestMethod=='GET' && this.request.parameters.header[0]=='new'){
                 this.action=this.getNewForm;
                 this.setAction(this.action);
                 didSomething=true;
             }
             else{

                    if (this.request.requestMethod == 'GET') { // i think
                        this.action = this.show;
                        this.setAction(this.action);
                        didSomething = true;
                    }
                
             }

        }



        if (this.request.requestMethod == 'PUT') {
            this.action = this.edit;
            this.setAction(this.action);
            didSomething = true;
        }

        if (this.request.requestMethod == 'DELETE') {
            this.action = this.destroy;
            this.setAction(this.action);
            didSomething = true;
        }


        if (didSomething == false) {
            this.action = this.err;

        }



        //this.action=this.home()
    }


    async new() {

        try{
            this.response.payload = await User.create(this.request.parameters.body.username, this.request.parameters.body.email, this.request.parameters.body.password)//what do I fill it with
        }
        catch(err){

            await this.response.setResponse({
                statusCode:400,
                message:err.message,
                template: "ErrorView",
                title:"Error"

            })

            return this.response;

        }
        

        if (this.response.payload == null) {

            await this.response.setResponse({
                statusCode:400,

            })
            this.response.statusCode = 400;
            this.response.message = "User not created.";
            this.response.payload = {};
            this.response.setResponse(this.response);
            return this.response;

        }
        

        await this.response.setResponse({
           // redirect:`user/${this.response.payload.id}`,
           statusCode:303,
            template:"User/NewFormView",
            categoryTitle:this.response.payload.username,
            message:"User created successfully!",
            categoryID:this.response.payload.id,
            action:"getNewForm"
            
        }); 

        this.response.redirect(`user/${this.response.payload.id}`);
        this.response.payload.createdAt = null;

        return this.response;


    }

    async list() {
        this.response.payload = await User.findAll();
        this.response.setResponse(this.response);
        this.response.message = "Users retrieved successfully!";
        this.response.statusCode = 200;
        return this.response;



    }

    async show() {

        this.response.payload = await User.findById(this.request.parameters.header[0]); //the tests are treating this method like list???
        this.response.payload = this.response.payload;

        if (this.response.payload == null) {
            this.response.statusCode = 400;
            await this.response.setResponse({
                template:"User/ShowView",
                err:'Error',
                message:`Cannot retrieve User: User does not exist with ID ${this.request.parameters.header[0]}.`
            }); 
        }

        

       
        return  await this.response.setResponse({
            template:"User/ShowView",
            title:this.response.payload.username,
            username:this.response.payload.username,
            email:this.response.payload.email,
            id:this.response.payload.id,
            message:this.response.payload.email,
        }); 

    }

    async edit() {

        // this.response.payload=await User.findById(parseInt(this.request.parameters.header[0]));

        this.response.payload = await User.findById(parseInt(this.request.parameters.header[0]));

        if (this.response == null || this.request.parameters.body.username=="" || this.request.parameters.body.email=="") {
            this.response.statusCode = 400;
            await this.response.setResponse({
                template:"User/ShowView",
                err:'Error',
                message:`Cannot update User: No update parameters were provided.`,
                payload:{}
            }); 

        }
        else {

            if (this.response.payload.username != this.request.parameters.body.username) {
                this.response.payload.setUsername(this.request.parameters.body.username);
            }

            if (this.response.payload.password != this.request.parameters.body.password) {
                this.response.payload.setPassword(this.request.parameters.body.password);
            }

            if (this.response.payload.email != this.request.parameters.body.email) {
                this.response.payload.setEmail(this.request.parameters.body.email);
            }


            await this.response.payload.save();

            this.response.payload = await User.findById(parseInt(this.request.parameters.header[0]));

            await this.response.setResponse({
                // redirect:`user/${this.response.payload.id}`,
                statusCode:303,
                 template:"User/ShowView",
                 title:this.response.payload.username,
                 message:"User edited successfully!",
                 id:this.response.payload.id,
                 username:this.response.payload.username,
                 //action:"getNewForm"
                 
             }); 
     
             this.response.redirect(`user/${this.response.payload.id}`);
        }




        
        return this.response;
    }

    async destroy() {

        this.response.payload = await User.findById(parseInt(this.request.parameters.header[0]));

        if(this.response.payload==null || this.response.payload==false){
            this.response.setResponse({ statusCode: 400, message: "User not deleted.", payload: {} })
            return this.response;
        }

        await this.response.payload.remove();

        await this.response.setResponse({
            // redirect:`user/${this.response.payload.id}`,
            statusCode:303,
             template:"User/ShowView",
             title:this.response.payload.username,
             message:`User deleted on ${this.response.payload.deletedAt}`,
             id:this.response.payload.id,
             username:this.response.payload.username,
             
         }); 
 
         this.response.redirect(`user/${this.response.payload.id}`);
        return this.response;

    }

    err() {
        this.response.message = 'Invalid request method!';
        this.response.statusCode = 405;
        return this.response;
        //this.response.setResponse(this.response);
    }

    async getNewForm(){

        await this.response.setResponse({
            template:"User/NewFormView",
            message:"User created successfully!",
            h1:"Register"

        }); 
        return this.response;
    }

}

module.exports = UserController;
