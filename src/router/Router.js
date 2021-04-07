const UserController = require('../controllers/UserController');
const CategoryController = require('../controllers/CategoryController');
const PostController = require('../controllers/PostController');
const CommentController = require('../controllers/CommentController');
const HomeController = require('../controllers/HomeController');
const ErrorController = require('../controllers/ErrorController');

class Router {

    constructor(request, response, controller){

        this.request=request;
        this.response=response;

        this.setController(request.controllerName)

        //this.controller=controller;
        
    }

    async dispatch(){

        var statusCode1;
        var message1;
        var payload1;

        try{ 
            this.response= await this.controller.doAction();
        }
        catch(error){
            this.response.message=error.message;
            this.response.statusCode=400;   

        }
 
        return this.response;

       //return this.controller.doAction();
    }

    setController(controller){

        var didSomething=false;

        if(controller==''){
            this.controller= new HomeController(this.request, this.response);
            didSomething=true;
        }
        else{
            if(controller=="user"){
                this.controller=new UserController(this.request, this.response); 
               didSomething=true; //new PokemonController(this.request, this.response);
            }

            if(controller=="category"){
                this.controller=new CategoryController(this.request, this.response);  
                didSomething=true;//new PokemonController(this.request, this.response);
            }

            if(controller=="post"){
                this.controller=new PostController(this.request, this.response);
                didSomething=true;  //new PokemonController(this.request, this.response);
            }

            if(controller=="comment"){
                this.controller=new CommentController(this.request, this.response);  
                didSomething=true;//new PokemonController(this.request, this.response);
            }
           

            if(didSomething==false){
                this.controller=new ErrorController(this.request, this.response)
            }
        }



      

    
}

  getController(){
      return this.controller;
  }
}

module.exports = Router;
