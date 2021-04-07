class Controller {

    constructor(request, response){

        this.request=request;
        this.response=response;
        this.action;
        this.setAction();
        
        
        //=this.request.getRequestMethod;
    }

    setAction(action){
         this.action=action;

         /*        let receivedAction =this.request.getRequestMethod();
        switch(receivedAction)
        {
            case 'home':
                this.action = this.home;
                break;
             case 'error':
                this.action = this.error;
                break;
             case 'POST':
                 this.action = this.new;
                 break;
             case 'GET':
                 if(this.request.parameters==undefined)
                 {
                     this.action=this.list;
                 }
                 else
                 {
                     if(this.request.parameters.header[0]=='new')
                     {
                         this.action=this.getNewForm;
                         break;
                     }
                     if(parseInt(this.request.parameters.header[0])>0)
                     {
                         this.action = this.show;
                         break;
                     }
                     else
                     {
                         this.action = this.list;
                         break;
                     }
 
                 }
                 break;
             case 'PUT':
             {
                 this.action = this.edit;
                 break;
             }
             case 'DELETE':
             {
              this.action = this.destroy;
              break;
             }
             default:
                 this.action = this.error
                 this.response.statusCode=405
                 this.response.message ='Invalid request method!'
                 break;
 
        }

    }*/

    }

    getAction(){
         return this.action;
    }

    async doAction(){

        var response;
       response=  await this.action();
       return response;

    }

    async error(){

        await this.response.setResponse({
            template:"ErrorView",
            title:'Invalid Request path!',
            message:'Error',
        });

        this.response.statusCode=404;
        return this.response;
    }

}

module.exports = Controller;
