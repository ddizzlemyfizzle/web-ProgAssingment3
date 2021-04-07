const Controller = require('./Controller');

class HomeController extends Controller {

    constructor(request, response){

        super(request);
        this.response=response;

        if (this.request.requestMethod=='GET'){
           this.action=this.home;
           this.setAction(this.action);
        }

        //this.action=this.home();
    }
    async home(){
        await this.response.setResponse({
            template:"HomeView",
            title:'Welcome',
            message:'Welcome to Reddit!',
        }); 
     
      return this.response;
    }

}

module.exports = HomeController;
