const Controller = require('./Controller');

class ErrorController extends Controller {

    constructor(request, response){


        super(request, response);

        this.action=this.error;

        /*super(request);
        this.response=response;

        this.action=this.error;

        this.response.setResponse(this.response) 
        this.response.message='Invalid request path!';
        this.response.statusCode=404;*/
    }

}

module.exports = ErrorController;
